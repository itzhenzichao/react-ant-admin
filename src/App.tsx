// import { useState } from 'react'
import Router from './router'
import { Outlet, useRoutes ,Link } from 'react-router-dom';
function App() {
  // const [count, setCount] = useState(0)
  const outlet = useRoutes(Router)
  return (
    <>
    {/* <Link to="/home">Home</Link> |
    <Link to="/about">About</Link> */}
    {/* 路由标签式路由 */}
    {/* <Outlet></Outlet> */}
    {outlet}
    </>
  )
}

export default App
