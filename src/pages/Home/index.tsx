import { shaderBookRender } from '@/render/gl_init';
import { useEffect, useRef } from 'react';
import styles from './index.module.less';
let isDraw = false;
const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!isDraw) {
      canvasRef.current && shaderBookRender(canvasRef.current);
      isDraw = true;
    }
  }, []);
  return (
    <div>
      <canvas className={styles.webgl} id="3d-container" ref={canvasRef}></canvas>
    </div>
  );
};
export default Home;
