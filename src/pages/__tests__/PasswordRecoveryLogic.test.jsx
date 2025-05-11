import axios from '../../api/AxiosClient';

jest.mock('../../api/AxiosClient');

const requestPasswordRecovery = async (login, onSuccess, onError) => {
    try {
        const response = await axios.post('/auth/password-recovery/', { login });
        onSuccess(response);
    } catch (error) {
        onError(error);
    }
};

const resetPassword = async ({ login, secret, newPassword }, onSuccess, onError) => {
    try {
        const response = await axios.post('/auth/reset-password/', {
            login,
            secret,
            newPassword,
        });

        if (response.status === 200) {
            onSuccess();
        } else {
            onError('Неверный статус ответа');
        }
    } catch (error) {
        onError('Ошибка при смене пароля');
    }
};

describe('Password Recovery Flow', () => {

    describe('requestPasswordRecovery', () => {
        it('успешно отправляет запрос на восстановление пароля', async () => {
            axios.post.mockResolvedValueOnce({ status: 200 });

            const onSuccess = jest.fn();
            const onError = jest.fn();

            await requestPasswordRecovery('user@example.com', onSuccess, onError);

            expect(axios.post).toHaveBeenCalledWith('/auth/password-recovery/', { login: 'user@example.com' });
            expect(onSuccess).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();
        });

        it('обрабатывает ошибку при отправке', async () => {
            axios.post.mockRejectedValueOnce(new Error('Server error'));

            const onSuccess = jest.fn();
            const onError = jest.fn();

            await requestPasswordRecovery('user@example.com', onSuccess, onError);

            expect(onSuccess).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
        });
    });

    describe('resetPassword', () => {
        const validData = {
            login: 'user@example.com',
            secret: 'uuid-secret-123',
            newPassword: 'newpass123',
        };

        it('успешно сбрасывает пароль', async () => {
            axios.post.mockResolvedValueOnce({ status: 200 });

            const onSuccess = jest.fn();
            const onError = jest.fn();

            await resetPassword(validData, onSuccess, onError);

            expect(axios.post).toHaveBeenCalledWith('/auth/reset-password/', validData);
            expect(onSuccess).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();
        });

        it('обрабатывает ошибку если статус ≠ 200', async () => {
            axios.post.mockResolvedValueOnce({ status: 400 });

            const onSuccess = jest.fn();
            const onError = jest.fn();

            await resetPassword(validData, onSuccess, onError);

            expect(onSuccess).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalledWith('Неверный статус ответа');
        });

        it('обрабатывает исключение при сбросе пароля', async () => {
            axios.post.mockRejectedValueOnce(new Error('Network fail'));

            const onSuccess = jest.fn();
            const onError = jest.fn();

            await resetPassword(validData, onSuccess, onError);

            expect(onSuccess).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalledWith('Ошибка при смене пароля');
        });
    });

});
