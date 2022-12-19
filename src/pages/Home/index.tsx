import { webglRender } from '@/render/gl_init';
import { useEffect, useRef } from 'react';
import styles from './index.module.less';
let isDraw = false;
const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!isDraw) {
      canvasRef.current && webglRender(canvasRef.current);
      isDraw = true;
    }
  }, []);
  return (
    <div>
      <canvas className={styles.webgl} ref={canvasRef}></canvas>
    </div>
  );
};
export default Home;
