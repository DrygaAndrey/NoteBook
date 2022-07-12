import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/auth.hook';
import { useHttp } from '../hooks/http.hook';
import './mainPage.sass';
import { AuthContext } from '../context/AuthContext';


function MainPage() {
    const { request } = useHttp();
    const { token, userId } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [newQuest, setNewQuest] = useState('');

    const context = useContext(AuthContext);

    const fetchQuestions = useCallback(async () => {
        try {
            if (!userId) {
                return;
            }
            const fetched = await request(`/api/questions/${userId}`, 'GET');
            if (!fetched) {
                return;
            }
            setQuestions(fetched);
        } catch (e) {

        }
    }, [userId, request]);



    const addQuest = async () => {
        try {
            context.setContextLoading(true);
            const answer = await request('/api/questions/add', 'POST', {
                userId: userId,
                questionTitle: newQuest
            });
            console.log(answer);
            context.setContextMessage(answer.message);
            context.setContextLoading(false);
            fetchQuestions();
        } catch (e) {
            context.setContextMessage(e.message);
            context.setContextLoading(false);
            fetchQuestions();
        }
    }

    const changeHandler = event => {
        setNewQuest(event.target.value);
    };

    const deleteQuestion = async (questionId) => {
        try {
            context.setContextLoading(true);
            const answer = await request('/api/questions/delete', 'POST', {
                questionId
            });
            console.log(answer);
            context.setContextMessage(answer.message);
            context.setContextLoading(false);
            fetchQuestions();
        } catch (e) {
            context.setContextMessage(e.message);
            console.log(e)
            context.setContextLoading(false);
            fetchQuestions();
        }
    }
    useEffect(() => {
        fetchQuestions();
        console.log(questions);
    }, [token, fetchQuestions]);
    return (
        <div className='mainPageContainer'>
            <h1>Main page</h1>
            <button onClick={context.logout} className="logOutButton">Log out</button>
            {questions.map((item, index) => {
                return (
                    <div key={index} className='quest'>
                        <p >{index + 1}.{item.title}</p><button onClick={() => deleteQuestion(item._id)} disabled={context.loading}>X</button>
                    </div>
                )
            })}
            <input placeholder='New quest' onChange={changeHandler}></input>
            <button disabled={context.loading} onClick={addQuest}>add Quest</button>
        </div >

    );
}

export default MainPage;