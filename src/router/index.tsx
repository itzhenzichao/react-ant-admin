import { Navigate } from 'react-router-dom'
import React,{ lazy } from 'react';
import Home from '@/views/Home';
// import About from '@/views/About';
const About = lazy(() => import('@/views/About'));
const StatisticsPage = lazy(() => import('@/views/Statistics'));
const ListPage = lazy(() => import('@/views/List'));

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
      }
    ]
  },
  {
    path:'/about',
    element: withLoadingComponent(<About />),
  },
  {
    path:'*',
    element: <div>404</div>,
  }
]

export default Router;
