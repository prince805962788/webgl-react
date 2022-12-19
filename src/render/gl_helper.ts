export function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  //根据着色类型，建立着色器对象
  const shader = gl.createShader(type) as WebGLShader;
  //将着色器源文件传入着色器对象中
  gl.shaderSource(shader, source);
  //编译着色器对象
  gl.compileShader(shader);
  //返回着色器对象
  return shader;
}
export function initShaders(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  //创建程序对象
  const program = gl.createProgram() as WebGLProgram;
  //建立着色对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  //把顶点着色对象装进程序对象中
  gl.attachShader(program, vertexShader);
  //把片元着色对象装进程序对象中
  gl.attachShader(program, fragmentShader);
  //连接webgl上下文对象和程序对象
  gl.linkProgram(program);
  //启动程序对象
  gl.useProgram(program);
  //将程序对象挂到上下文对象上
  Reflect.set(gl, 'program', program);
  return program;
}
export function getClickPosition(canvas: HTMLCanvasElement, event: MouseEvent) {
  const { clientX, clientY } = event;
  const { left, top, width, height } = canvas.getBoundingClientRect();
  const [cssX, cssY] = [clientX - left, clientY - top];

  //解决坐标原点位置的差异
  const [halfWidth, halfHeight] = [width / 2, height / 2];
  const [xBaseCenter, yBaseCenter] = [cssX - halfWidth, cssY - halfHeight];
  // 解决y 方向的差异
  const yBaseCenterTop = -yBaseCenter;
  //解决坐标基底的差异
  const [x, y] = [xBaseCenter / halfWidth, yBaseCenterTop / halfHeight];
  return [x, y];
}
