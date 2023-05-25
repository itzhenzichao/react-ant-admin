import React from 'react'
import ReactDOM from 'react-dom/client'
// 初始化默认样式
import 'reset-css'
import '@/assets/styles/global.scss'
// 标签式路由
// import Router from './router/index-old'
// 路由表式路由
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* 标签式路由 */}
    {/* <Router /> */}
    {/* 路由表式路由 */}
    <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
