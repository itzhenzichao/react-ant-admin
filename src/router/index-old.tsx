import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Home from '@/views/Home';
import About from '@/views/About';
import App from '@/App';
const Router = () => {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
