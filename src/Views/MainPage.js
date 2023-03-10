import LoginForm from "../Components/Login/LoginForm";
import Popup from "reactjs-popup";

const MainPage = () => {

    return (
        <>
            <h1>Main</h1>
            <Popup trigger={<button>Login</button>} position="top center" modal nested>
                {close => (
                    <div style={{
                    minHeight: "500px",
                    minWidth:"500px",
                    backgroundColor: "#ECD9BA"
                    }}>
                    <button onClick={close}>&times;</button>
                    <LoginForm />
                    </div>
                )}
            </Popup> 
        </>
    )
}

export default MainPage; 