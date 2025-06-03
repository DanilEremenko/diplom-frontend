import React from 'react';
import { Table, Typography } from 'antd';
import '../styles/UsersContent.css';

const { Text } = Typography;

const UsersTable = ({ users, loading, currentPage, totalItems, onPageChange, onUserClick }) => {
    const roleLabels = {
        SPECIALIST: 'Специалист',
        MANAGER: 'Менеджер',
        METHODOLOGIST: 'Методолог',
        MENTOR: 'Ментор',
    };
    const columns = [
        {
            title: 'Пользователь',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (text, record) => (
                <Text
                    style={{ color: '#1890ff', cursor: 'pointer' }}
                    onClick={() => onUserClick(record.id)} // 🔑 Передаём id
                >
                    {text}
                </Text>
            ),
        },
        {
            title: 'Роли',
            dataIndex: 'role',
            key: 'role',
            render: (roles) => (
                <Text>{roles.map((role) => roleLabels[role] || role).join(', ')}</Text>
            ),
        },
        {
            title: 'Дата создания',
            dataIndex: 'registrationDate',
            key: 'registrationDate',
        },
        {
            title: 'Дата обновления',
            dataIndex: 'updateDate',
            key: 'updateDate',
        },
        {
            title: 'Активность',
            dataIndex: 'activeStatus',
            key: 'activeStatus',
            render: (active) => <Text>{active ? 'Да' : 'Нет'}</Text>,
        },
    ];

    return (
        <Table
            className="users-table"
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={{
                current: currentPage,
                total: totalItems,
                pageSize: 4,
                onChange: onPageChange,
                showSizeChanger: false,
            }}
            loading={loading}
        />
    );
};

export default UsersTable;
