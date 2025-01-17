export const validateName = (name) => {
    const regex = /^[A-Za-zА-Яа-я\s-]{1,100}$/;
    return regex.test(name);
};

export const validateCompanyName = (name) => {
    const regex = /^[A-Za-zА-Яа-я0-9_\- .,:;!?”%&*№()/\\]{1,100}$/;
    return regex.test(name);
};

export const validateINN = (inn) => {
    const regex = /^\d{10,12}$/;
    return regex.test(inn);
};

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-+=?/\\]).{8,50}$/;
    return regex.test(password);
};
