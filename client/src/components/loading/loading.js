import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import './loading.sass';
function Loading() {
    const context = useContext(AuthContext);
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        setLoadingState(context.loading);
    }, [context.loading]);

    if (loadingState) {
        return (
            <div className="loadingContainer">
                <div className="lds-dual-ring">
                </div>
            </div>
        )
    };
    return (
        <div className="loadingContainer"></div>
    )
}

export default Loading;