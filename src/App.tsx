import { useEffect } from 'react'
import Router from './router'
import {
  Outlet,
  useRoutes,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { message } from 'antd'

function ToHome() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <></>
}
function ToLogin() {
  const navigate = useNavigate()
  useEffect(() => {
    message.destroy()
    message.error({
      duration: 1,
      content: '请登录！',
    })
    navigate('/login')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <></>
}
//路由拦截
function BeforeRouter() {
  const token = localStorage.getItem('token')
  const outlet = useRoutes(Router)
  const location = useLocation()
  if (location.pathname === '/login' && token) {
    return <ToHome></ToHome>
  }

  if (location.pathname !== '/login' && !token) {
    return <ToLogin></ToLogin>
  }
  return outlet
}
function App() {
  return (
    <>
      {/* <Link to="/home">Home</Link> |
    <Link to="/about">About</Link> */}
      {/* 路由标签式路由 */}
      {/* <Outlet></Outlet> */}
      {/* {outlet} */}
      <BeforeRouter></BeforeRouter>
    </>
  )
}

export default App
