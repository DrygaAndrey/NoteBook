import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

function AuthPage() {
    const { request } = useHttp();

    const [form, setForm] = useState({
        email: '', password: ''
    });

    const context = useContext(AuthContext);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            context.setContextLoading(true);
            const data = await request('api/auth/register/', 'POST', { ...form }, {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            });
            context.setContextMessage(data.message);
            context.setContextLoading(false);
        } catch (e) {
            context.setContextMessage(e.message);
            context.setContextLoading(false);
        }
    }

    const loginHandler = async () => {
        try {
            context.setContextLoading(true);
            const data = await request('/api/auth/login', 'POST', { ...form });
            context.setContextLoading(false);
            context.login(data.token, data.userId);
            console.log(data);

        } catch (e) {
            context.setContextMessage(e.message);
            context.setContextLoading(false);
        }
    }
    return (
        <div className='authContainer'>
            <h1>Authorization</h1>
            <div className='inputs'>
                <input placeholder='Your email' name='email' onChange={changeHandler}></input>
                <input placeholder='Your password' name='password' onChange={changeHandler}></input>
            </div>
            <div className='buttons'>
                <button onClick={loginHandler} disabled={context.loading}>Log in</button>
                <button onClick={registerHandler} disabled={context.loading}>Register</button>
            </div>
        </div>
    );
}

export default AuthPage;