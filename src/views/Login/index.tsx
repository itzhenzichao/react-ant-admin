import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,message } from 'antd';
import Style from './index.module.scss'
import { useNavigate,Outlet,useLocation } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    if (values.username!=='admin'||values.password!=='123') {
      message.error('用户名或者密码错误!');
    } else {
      localStorage.setItem('token',new Date().getTime().toString());
      navigate('/')
    }
  };
  return (
    <div className={Style['login-container']}>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '填输入用户名！' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名使用admin" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '填输入密码！' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码使用123"
        />
      </Form.Item>

      <Form.Item style={{display: 'flex',justifyContent: 'center',margin:'0px'}}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;
