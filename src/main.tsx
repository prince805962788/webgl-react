// import '@fabu/fabu-design/dist/style.css'; // fabu内部组件样式，如需使用，可以打开
// todo: 这里本不应该全局引入antd.css, 但是目前antd存在sider组件的bug，后续修复可以将这个引入删除
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store/index';
import 'styles/index.module.less';
import 'styles/variable.module.less';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
