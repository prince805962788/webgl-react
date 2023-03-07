import * as THREE from 'three';
import ShaderMaterial from './object/shaderMateial';
import PerspectiveCamera from './object/camera';
import Control from './object/control';
import Line from './object/line';
class RenderThree {
  public container: HTMLElement | undefined;
  public perspectiveCamera: PerspectiveCamera;
  public scene: THREE.Scene;
  public renderer: THREE.WebGLRenderer;
  public orbitControls: Control;
  public clock: THREE.Clock;
  public uniforms: any;
  public isDrawing: boolean;
  public shaderMaterial?: ShaderMaterial;
  public line?: Line;
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 是否执行抗锯齿
      alpha: true, // canvas是否包含alpha (透明度)
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // 初始化场景
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x141414);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    // 初始化透视相机
    this.perspectiveCamera = new PerspectiveCamera(this.scene);
    // 辅助坐标
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
    // 初始化控制器
    this.orbitControls = new Control(
      this.scene,
      this.perspectiveCamera.camera,
      this.renderer.domElement,
    );
    // 初始化时钟
    this.clock = new THREE.Clock();
    this.uniforms = {
      u_time: { type: 'f', value: 1.0 },
      u_resolution: { type: 'v2', value: new THREE.Vector2() },
    };
    this.isDrawing = false;
    this.line = new Line(this.scene);
    // this.shaderMaterial = new ShaderMaterial(this.scene, this.uniforms);
  }
  init(container: HTMLElement) {
    if (this.isDrawing || container.childNodes.length > 0) {
      this.animate();
      return;
    }
    this.isDrawing = true;
    this.container = container;
    this.container.appendChild(this.renderer.domElement);
    this.onWindowResize();
    window.addEventListener('resize', () => this.onWindowResize(), false);
    this.animate();
  }

  onWindowResize() {
    const canvas = this.container;
    const clientWidth = canvas ? canvas.clientWidth : document.documentElement.clientWidth;
    const clientHeight = canvas ? canvas.clientHeight : document.documentElement.clientHeight;
    this.renderer.setSize(clientWidth, clientHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  render() {
    this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.perspectiveCamera.camera);
  }
}
const renderProgrem = new RenderThree();
export default renderProgrem;
