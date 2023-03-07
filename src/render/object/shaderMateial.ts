import * as THREE from 'three';
import fragShaderBook_1_Source from '@/shader/shaderBook_1.frag';
import vertShaderBook_1_Source from '@/shader/shaderBook_1.vert';
export default class ShaderMaterial {
  public scene: THREE.Scene;
  public uniforms: any;
  constructor(scene: THREE.Scene, uniforms: any) {
    this.scene = scene;
    this.uniforms = uniforms;
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertShaderBook_1_Source,
      fragmentShader: fragShaderBook_1_Source,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 2);
    this.scene.add(mesh);
  }
}
