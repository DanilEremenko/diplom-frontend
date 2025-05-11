import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import axios from '../api/AxiosClient'; // Твой axios клиент
import '../styles/ResetPassword.css'; // Отдельный CSS файл

const { Title, Text } = Typography;

const ResetPassword = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        try {
            const response = await axios.post('/auth/reset-password/', {
                login: values.login,
                secret: values.secret,
                newPassword: values.newPassword,
            });

            if (response.status === 200) {
                message.success('Пароль успешно изменён');
                navigate('/login');
            }
        } catch (error) {
            messageApi.error(error.response?.data?.errors[0] || 'Ошибка при смене пароля');
            console.error(error);
            message.error('Ошибка при смене пароля');
        }
    };

    return (
        <SidebarLayout>
            {contextHolder}
            <div className="form-header">
                <Title level={1} className="logo-text">BE BETTER</Title>
            </div>
            <Form
                name="reset-password"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="reset-password-form"
            >
                <div className="description">
                    <Text type="secondary">
                        Введите логин, секретный код из уведомления и новый пароль.
                    </Text>
                </div>

                <Form.Item
                    name="login"
                    rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
                >
                    <Input placeholder="Логин" className="input-custom-login" />
                </Form.Item>

                <Form.Item
                    name="secret"
                    rules={[{ required: true, message: 'Введите секретный код!' }]}
                >
                    <Input placeholder="Секретный код" className="input-custom" />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: 'Введите новый пароль!' }]}
                >
                    <Input.Password placeholder="Новый пароль" className="input-custom" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="submit-btn">
                        СМЕНИТЬ ПАРОЛЬ
                    </Button>
                </Form.Item>
            </Form>
        </SidebarLayout>
    );
};

export default ResetPassword;
