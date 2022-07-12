import { createContext } from 'react';
function noop() { };
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    message: 'zxczxc',
    setContextMessage: noop,
    loading: true,
    setContextLoading: noop
})