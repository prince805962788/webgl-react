import renderProgrem from '@/render/three_init';
import { useEffect, useRef } from 'react';
import styles from './index.module.less';

const ChildAPage = () => {
  const canvasRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const canvas = document.getElementById('3d-container');
    if (canvas) {
      renderProgrem.init(canvas);
    }
  }, []);
  return (
    <div>
      <div
        className={styles.webgl}
        id="3d-container"
        ref={canvasRef as React.RefObject<HTMLDivElement>}
      ></div>
    </div>
  );
};
export default ChildAPage;
