import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './message.sass';
function Message() {
    const context = useContext(AuthContext);
    const [messageState, setMessageState] = useState('');

    useEffect(() => {
        setMessageState(context.message);
    }, [context.message]);

    const buttonHandler = () => {
        context.setContextMessage('');
    };

    if (messageState !== '') {
        return (
            <div className="messageContainer" >
                <p>{messageState}</p>
                <button onClick={buttonHandler}>OK</button>
            </div>
        )
    }

    if (messageState === '') {
        return (<div className="messageContainer"></div>)
    }
}

export default Message;