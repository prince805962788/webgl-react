import * as THREE from 'three';

interface pointsProps {
  x: number;
  y: number;
  z?: number;
}
export class LineBufferGeometry extends THREE.BufferGeometry {
  constructor() {
    super();
  }
  setPoints(points: THREE.Vector2[] | pointsProps[], lineWidth: number) {
    if (points.length < 2) {
      return this;
    }
    const halfWidth = lineWidth / 2;

    const pre = new THREE.Vector2();
    const preSub_1 = new THREE.Vector2();
    const preSub_2 = new THREE.Vector2();
    const cur = new THREE.Vector2();
    const curSub_1 = new THREE.Vector2();
    const curSub_2 = new THREE.Vector2();

    const preDirection = new THREE.Vector2();
    const preVertical_1 = new THREE.Vector2();
    const preVertical_2 = new THREE.Vector2();
    const curDirection = new THREE.Vector2();
    const curVertical_1 = new THREE.Vector2();
    const curVertical_2 = new THREE.Vector2();

    const subPoints_1: THREE.Vector2[] = [];
    const subPoints_2: THREE.Vector2[] = [];
    let i = 1;
    while (i < points.length) {
      pre.set(points[i - 1].x, points[i - 1].y);
      preSub_1.copy(pre);
      preSub_2.copy(pre);
      cur.set(points[i].x, points[i].y);
      curSub_1.copy(cur);
      curSub_2.copy(cur);

      curDirection.subVectors(cur, pre);
      curDirection.normalize();
      curVertical_1.set(-curDirection.y, curDirection.x).multiplyScalar(halfWidth);
      curVertical_2.set(curDirection.y, -curDirection.x).multiplyScalar(halfWidth);

      preSub_1.add(curVertical_1);
      preSub_2.add(curVertical_2);
      curSub_1.add(curVertical_1);
      curSub_2.add(curVertical_2);

      if (i === 1) {
        subPoints_1.push(preSub_1.clone());
        subPoints_2.push(preSub_2.clone());
      } else {
        if (preDirection.equals(curDirection)) {
          subPoints_1.push(preSub_1.clone());
          subPoints_2.push(preSub_2.clone());
        } else if (preDirection.dot(curDirection) < 0) {
          const temp_1 = new THREE.Vector2();
          const temp_2 = new THREE.Vector2();
          temp_1.addVectors(preVertical_1, curVertical_1).add(pre);
          temp_2.addVectors(preVertical_2, curVertical_2).add(pre);
          subPoints_1.push(temp_1);
          subPoints_2.push(temp_2);
        } else if (preDirection.dot(curDirection) > 0) {
          console.log(2);
          const temp_1 = new THREE.Vector2();
          const temp_2 = new THREE.Vector2();
          temp_1.addVectors(preVertical_1, curVertical_1).multiplyScalar(0.5).add(pre);
          temp_2.addVectors(preVertical_2, curVertical_2).multiplyScalar(0.5).add(pre);
          subPoints_1.push(temp_1);
          subPoints_2.push(temp_2);
        }
      }
      if (i === points.length - 1) {
        subPoints_1.push(curSub_1.clone());
        subPoints_2.push(curSub_2.clone());
      }
      // subPoints_1.push(preSub_1.clone(), curSub_1.clone());
      // subPoints_2.push(preSub_2.clone(), curSub_2.clone());

      preVertical_1.copy(curVertical_1);
      preVertical_2.copy(curVertical_2);
      preDirection.copy(curDirection);
      i++;
    }
    console.log(subPoints_1, subPoints_2);
    const shape = new THREE.Shape([...subPoints_1, ...subPoints_2.reverse()]);
    const geo = new THREE.ShapeGeometry(shape);
    return geo;
  }
}
