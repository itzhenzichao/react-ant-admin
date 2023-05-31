import { Navigate } from 'react-router-dom'
import React,{ lazy } from 'react';
import Home from '@/views/Home';
import NotFoundPage from '@/views/Error/404';
// import About from '@/views/About';
const About = lazy(() => import('@/views/About'));
const StatisticsPage = lazy(() => import('@/views/Statistics'));
const ListPage = lazy(() => import('@/views/List'));
const RecordGoodsPage = lazy(() => import('@/views/Record/Goods/goods'));
const LoginPage = lazy(() => import('@/views/Login'));

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>loading...</div>}>
    {comp}
  </React.Suspense>
)
const Router = [
  {
    path:'/',
    element: <Navigate to="/statistics" />,
  },
  {
    path:'/',
    element: <Home />,
    children: [
      {
        path:'/statistics',
        element: withLoadingComponent(<StatisticsPage />),
      },
      {
        path:'/list',
        element: withLoadingComponent(<ListPage />),
      },
      {
        path:'/record',
        children:[
          {
            path:'/record/goods',
            element: withLoadingComponent(<RecordGoodsPage />),
          },
        ]
      }
    ]
  },
  {
    path:'/about',
    element: withLoadingComponent(<About />),
  },
  {
    path:'/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path:'*',
    element: <NotFoundPage></NotFoundPage>,
  }
]

export default Router;
