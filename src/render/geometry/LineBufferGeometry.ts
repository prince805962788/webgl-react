import * as THREE from 'three';
/*
属性：
  points:线条节点,二维，[Vector2,Vector2,……]
  lineWidth：线宽
  vertices：顶点集合
  normals：法线集合
  indexes：顶点索引集合
  uv：uv坐标集合
*/
export default class LineBufferGeometry extends THREE.BufferGeometry {
  public points: THREE.Vector2[];
  public lineWidth: number;
  public normals?: number[];
  public uv?: number[];
  constructor(points: THREE.Vector2[] = [], lineWidth = 1) {
    super();
    this.points = points;
    this.lineWidth = lineWidth;
    this.init();
  }
  init() {
    const { points } = this;
    const len = points.length;
    if (len < 2) {
      return;
    }
    // 挤压线条，获取顶点
    const extrudePoints = this.extrude();
    // 顶点集合
    const vertices = [];
    // 顶点索引
    const indexes = [];
    // 以线段挤压出的四边形为单位，构建顶点集合、顶点索引
    const len1 = points.length - 1;
    for (let i = 0; i < len1; i++) {
      //四边形的4个顶点
      const pi = i * 2;
      const [A1, A2, B1, B2] = [
        extrudePoints[pi],
        extrudePoints[pi + 1],
        extrudePoints[pi + 2],
        extrudePoints[pi + 3],
      ];
      vertices.push(A1.x, A1.y, 0, A2.x, A2.y, 0, B1.x, B1.y, 0, B2.x, B2.y, 0);
      // 顶点索引
      const A1i = i * 4;
      const A2i = A1i + 1;
      const B1i = A1i + 2;
      const B2i = A1i + 3;
      indexes.push(A1i, A2i, B1i, B1i, A2i, B2i);
    }
    this.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    this.setIndex(indexes);
  }
  // 挤压线条
  extrude() {
    const { points } = this;
    //线宽的一半
    const halfWidth = this.lineWidth / 2;
    //顶点集合，垂直拉伸起始点置入其中
    const extrudePoints = [...this.verticalPoint(points[0], points[1], halfWidth)];
    // 挤压线条内部点，置入extrudePoints
    const len1 = points.length - 1;
    const len2 = len1 - 1;
    // 每次取3个点计算两向量之间的拐点和响应挤压点
    for (let i = 0; i < len2; i++) {
      // 三个点,两条线
      const A = points[i];
      const B = points[i + 1];
      const C = points[i + 2];
      // 两条线是否相交
      if (this.intersect(A, B, C)) {
        extrudePoints.push(...this.interPoint(A, B, C, halfWidth));
      } else {
        extrudePoints.push(...this.verticalPoint(B, C, halfWidth));
      }
    }
    // 挤压最后一个点
    extrudePoints.push(...this.verticalPoint(points[len2], points[len1], halfWidth, points[len1]));
    return extrudePoints;
  }
  // 判断两条直线是否相交
  intersect(A: THREE.Vector2, B: THREE.Vector2, C: THREE.Vector2) {
    const angAB = B.clone().sub(A).angle();
    const angBC = C.clone().sub(B).angle();
    return !!((angAB - angBC) % Math.PI);
  }
  //垂直分量的两点
  verticalPoint(A: THREE.Vector2, B: THREE.Vector2, halfWidth: number, MiD = A) {
    const { x, y } = B.clone().sub(A);
    return [
      new THREE.Vector2(-y, x).setLength(halfWidth).add(MiD),
      new THREE.Vector2(y, -x).setLength(halfWidth).add(MiD),
    ];
  }
  // 计算挤压的拐点
  interPoint(A: THREE.Vector2, B: THREE.Vector2, C: THREE.Vector2, halfWidth: number) {
    const AB = B.clone().sub(A).normalize();
    const CB = B.clone().sub(C).normalize();
    const normalBB2 = AB.clone().add(CB).normalize();
    // BA垂直分量
    const BG = new THREE.Vector2(AB.y, -AB.x).setLength(halfWidth);
    const BGLen = BG.length();
    const cos = BG.clone().dot(normalBB2) / BGLen;
    const BB2 = normalBB2.setLength(BGLen / cos);
    const BB1 = BB2.clone().negate();
    return [BB1.add(B), BB2.add(B)];
  }
}
