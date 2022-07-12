import React, { useState } from "react";
import { useRoutes } from "./routes";
import { AuthContext } from './context/AuthContext';
import Message from "./components/message/message";
import Loading from "./components/loading/loading";
import { useAuth } from "./hooks/auth.hook";

function App() {
  const { token, login, logout, userId, ready } = useAuth();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{
      message,
      loading,
      setContextMessage: setMessage,
      setContextLoading: setLoading,
      token,
      login,
      logout,
      userId,
      ready
    }}>
      <div>
        {routes}
      </div>
      <Message />
      <Loading />
    </AuthContext.Provider >
  );
}

export default App;
