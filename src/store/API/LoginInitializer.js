import storageKeys from './APISetup';


const initializer = () => {
    const storage = window.localStorage;
    const token = storage.getItem(storageKeys.tokenKey);
    const username = storage.getItem(storageKeys.usernameKey);

    //TODO check token
    return {
        auth: token ? true : false,
        username: username || '',
        buttonText: token ? 'Выход' : 'Вход/Регистрация',
        loading: false,
        err: '',
        showModal: false
    };
}

export default initializer;