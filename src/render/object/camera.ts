import * as THREE from 'three';
interface PerspectiveCameraConfig {
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
}
export default class Camera {
  public camera: THREE.PerspectiveCamera;
  public scene: THREE.Scene;
  constructor(scene: THREE.Scene) {
    const canvas = document.getElementById('3d-container');
    const clientWidth = canvas ? canvas.clientWidth : document.documentElement.clientWidth;
    const clientHeight = canvas ? canvas.clientHeight : document.documentElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(60, clientWidth / clientHeight, 1, 20000);
    this.veer(new THREE.Vector3(0, 0, 1));
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);
    this.scene = scene;
    this.scene.add(this.camera);
    return this;
  }
  updateConfig({ fov, aspect, near, far }: PerspectiveCameraConfig) {
    fov !== undefined && (this.camera.fov = fov);
    aspect !== undefined && (this.camera.aspect = aspect);
    near !== undefined && (this.camera.near = near);
    far !== undefined && (this.camera.far = far);
    this.camera.updateProjectionMatrix();
  }
  updatePosition({ x, y, z }: THREE.Vector3 | { x?: number; y?: number; z?: number }) {
    x !== undefined && (this.camera.position.x = x);
    y !== undefined && (this.camera.position.y = y);
    z !== undefined && (this.camera.position.z = z);
  }
  lookAt(vector: THREE.Vector3) {
    this.camera.lookAt(vector);
  }
  veer(vector: THREE.Vector3) {
    this.camera.up = vector;
  }
  getPosition() {
    return this.camera.position;
  }
  getPositionX() {
    return this.camera.position.x;
  }
  getPositionY() {
    return this.camera.position.y;
  }
  getPositionZ() {
    return this.camera.position.z;
  }
}
