import fragShaderBook_1_Source from '@/shader/shaderBook_1.frag';
import vertShaderBook_1_Source from '@/shader/shaderBook_1.vert';
import * as THREE from 'three';
class RenderThree {
  public container: HTMLElement | undefined;
  public camera: THREE.Camera;
  public scene: THREE.Scene;
  public renderer: THREE.WebGLRenderer;
  public clock: THREE.Clock;
  public uniforms: any;
  public isDrawing: boolean;
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 是否执行抗锯齿
      alpha: true, // canvas是否包含alpha (透明度)
    });
    const canvas = document.getElementById('3d-container');
    const clientWidth = canvas ? canvas.clientWidth : document.documentElement.clientWidth;
    const clientHeight = canvas ? canvas.clientHeight : document.documentElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(60, clientWidth / clientHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 200);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x141414);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);
    this.clock = new THREE.Clock();
    this.uniforms = {
      u_time: { type: 'f', value: 1.0 },
      u_resolution: { type: 'v2', value: new THREE.Vector2() },
    };
    this.isDrawing = false;
  }
  init(container: HTMLElement) {
    if (this.isDrawing || container.childNodes.length > 0) {
      this.animate();
      return;
    }
    this.isDrawing = true;
    this.container = container;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    const geometry = new THREE.PlaneGeometry(100, 100);

    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertShaderBook_1_Source,
      fragmentShader: fragShaderBook_1_Source,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 2);
    this.scene.add(mesh);

    this.onWindowResize();
    window.addEventListener('resize', () => this.onWindowResize(), false);
    this.animate();
  }

  onWindowResize() {
    const canvas = this.container;
    const clientWidth = canvas ? canvas.clientWidth : document.documentElement.clientWidth;
    const clientHeight = canvas ? canvas.clientHeight : document.documentElement.clientHeight;
    console.log(clientWidth, clientHeight);
    this.renderer.setSize(clientWidth, clientHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  render() {
    this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }
}
const renderProgrem = new RenderThree();
export default renderProgrem;
