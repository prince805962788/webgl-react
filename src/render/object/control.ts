import * as THREE from 'three';
import ExtendOrbit from '../extend/extendOrbit';
export default class Control {
  public control: ExtendOrbit;
  private raycaster: THREE.Raycaster;
  public scene: THREE.Scene;
  public container: HTMLElement;
  private model: 'free' | 'zoom' | undefined;
  constructor(scene: THREE.Scene, object: THREE.PerspectiveCamera, domElement: HTMLElement) {
    this.raycaster = new THREE.Raycaster();
    this.scene = scene;
    this.container = domElement;
    this.control = new ExtendOrbit(object, domElement);
    this.control.target.set(0, 0, 0);
    this.control.minDistance = 2;
    this.control.maxDistance = 3840;
    this.control.maxPolarAngle = (Math.PI * 2) / 3;
    this.model = 'free';
    this.switchControl(true);
    this.updateModel(this.model);
    this.updateTarget({
      x: object.position.x,
      y: object.position.y,
      z: 0,
    });
    window.addEventListener('dblclick', (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element.tagName === 'CANVAS' && this.model === 'free') {
        this.updateControlCenter(event);
      }
    });
  }
  switchControl(e: boolean) {
    this.control.enabled = e;
    this.control.update();
  }
  updateTarget({ x, y, z }: THREE.Vector3 | { x: number; y: number; z: number }) {
    this.control.target.set(x, y, z);
    this.control.update();
  }
  updateModel(model: 'free' | 'zoom') {
    switch (model) {
      case 'free':
        Reflect.set(this.control, 'mouseButtons', {
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE,
        });
        break;
      case 'zoom':
        Reflect.set(this.control, 'mouseButtons', {
          MIDDLE: THREE.MOUSE.DOLLY,
        });
        break;
    }
    this.model = model;
    this.control.update();
  }
  count(event: MouseEvent) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.offsetX / this.container.clientWidth) * 2 - 1;
    mouse.y = -(event.offsetY / this.container.clientHeight) * 2 + 1;
    this.raycaster.setFromCamera(mouse, this.control.object);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    return intersects;
  }
  updateControlCenter(event: MouseEvent) {
    const intersects = this.count(event);
    if (!intersects || !intersects[0]) {
      return;
    }
    const { x, y, z } = intersects[0].point;
    const theta = this.control.getAzimuthalAngle();
    const phi = this.control.getPolarAngle();

    this.control.object.position.z = 60;
    this.control.object.updateProjectionMatrix();

    this.control.target.set(x, y, z);
    this.control.update(theta, phi);
  }
}
