import * as THREE from 'three';
import { LineBufferGeometry } from '../geometry/LineBufferGeometry';

export default class Line {
  public scene: THREE.Scene;
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    const points: THREE.Vector2[] = [
      new THREE.Vector2(1, 2),
      new THREE.Vector2(13, 14),
      new THREE.Vector2(25, 16),
      new THREE.Vector2(36, 50),
      new THREE.Vector2(48, 4),
      new THREE.Vector2(55, -9),
    ];
    const lineGeometry = new LineBufferGeometry();
    const geo = lineGeometry.setPoints(points, 2);
    const material = new THREE.MeshBasicMaterial({
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geo, material);
    this.scene.add(mesh);
  }
}
