import NotFoundPageImage from '@/assets/img/404.png';
import Style from './404.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();
    function goHome(){
      navigate('/')
    }
  return (
    <div className={Style['not-found-page']}>
        <img src={NotFoundPageImage} alt="页面不存在" />
        <p className={Style.tips}>肥肠抱歉，你要找的页面不见了</p>
        <Button type='primary' onClick={goHome}>返回首页</Button>
    </div>
  )
}
