import fragShaderSource from '@/shader/shader.frag';
import vertShaderSource from '@/shader/shader.vert';
import fragShaderBook_1_Source from '@/shader/shaderBook_1.frag';
import vertShaderBook_1_Source from '@/shader/shaderBook_1.vert';
import { getClickPosition, initShaders } from './gl_helper';
export function webglRender(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl') as WebGLRenderingContext;
  const program = initShaders(gl, vertShaderSource, fragShaderSource);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
  const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  gl.vertexAttrib1f(a_PointSize, 100.0);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
  const points: [number, number, number, any][] = [];
  canvas.addEventListener('click', (e) => {
    console.log(e.clientX, e.clientY);
    const [x, y] = getClickPosition(canvas, e);
    const color = new Float32Array([Math.random(), Math.random(), Math.random(), Math.random()]);
    points.push([x, y, Math.random() * 50, color]);
    console.log(x, y);
    gl.clear(gl.COLOR_BUFFER_BIT);
    for (let [px, py, pz, pc] of points) {
      gl.vertexAttrib2f(a_Position, px, py);
      gl.vertexAttrib1f(a_PointSize, pz);
      gl.uniform4fv(u_FragColor, pc);
      // gl.uniform4f(u_FragColor, Math.random(), Math.random(), Math.random(), 1.0);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  });
}
export function shaderBookRender(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl') as WebGLRenderingContext;
  const program = initShaders(gl, vertShaderBook_1_Source, fragShaderBook_1_Source);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}
