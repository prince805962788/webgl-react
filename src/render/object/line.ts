import * as THREE from 'three';
import { Vector2 } from 'three';
import LineBufferGeometry from '../geometry/LineBufferGeometry';

export default class Line {
  public scene: THREE.Scene;
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    const points: THREE.Vector2[] = [
      new Vector2(-7, 0),
      new Vector2(-1, 0),
      new Vector2(-4, 4),
      new Vector2(3, 4),
      new Vector2(3, -4),
      new Vector2(4, -4),
      new Vector2(4, 0),
      new Vector2(7, 4),
    ];
    const line = new LineBufferGeometry(points, 0.2);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(line.vertices, 3));
    geometry.setIndex(line.indexes);
    const mesh = new THREE.Mesh(geometry);
    this.scene.add(mesh);
  }
}
