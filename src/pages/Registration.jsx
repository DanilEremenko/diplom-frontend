import React from 'react';
import FormInput from '../components/FormInput';
import '../styles/Registration.css';
import wsLogo from '../assets/ws_logo.svg';


function Registration() {
    return (
        <div className="registration-container">
            <div className="form-section">
                <div className="form-header">
                    <img src={wsLogo} alt={"logo"}/>
                    <h1>BE BETTER</h1>
                    <p>Регистрация</p>
                </div>
                <form>
                    <FormInput label="Фамилия" name="last-name" placeholder="Введите фамилию" required={true} />
                    <FormInput label="Имя" name="first-name" placeholder="Введите имя" required={true} />
                    <FormInput label="Отчество" name="middle-name" placeholder="Введите отчество" />
                    <FormInput label="Название компании / ИП" name="company" placeholder="Введите название компании" required={true} />
                    <FormInput label="ИНН компании / ИП" name="inn" placeholder="Введите ИНН" required={true} />
                    <FormInput label="Электронная почта" name="email" type="email" placeholder="Введите email" required={true} />
                    <FormInput label="Пароль" name="password" type="password" placeholder="Введите пароль" required={true} />
                    <div className="checkbox-group">
                        <input type="checkbox" id="consent" defaultChecked />
                        <label htmlFor="consent">Я согласен(-на) с политикой конфиденциальности</label>
                    </div>
                    <div className="form-footer">
                        <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
                        <a href="/login">Уже зарегистрированы? Войти.</a>
                    </div>
                </form>
            </div>
            {/*<div className="image-section"></div>*/}
        </div>
    );
}

export default Registration;
