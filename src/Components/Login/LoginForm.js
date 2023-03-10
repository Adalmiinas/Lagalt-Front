import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { submitUser } from '../../Service/UserInfo'
import { storageSave } from "../../Utils/Storage";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../Context/UserContext";

const usernameConfig = {
    required: true,
    minLength: 4
}

const LoginForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const {user, setUser} = useUser();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [ apiError, setApiError] = useState(null);

    useEffect(() => {
        if(user !== null){
            navigate("/");
        }
    }, [user , navigate])

    const onSubmit =  async ({username, password}) => {
        setLoading(true);
        const [error, userResponse] = await submitUser(username, password);
        if(error !== null){
            setApiError(error);
        }

        if(userResponse !== null){
            storageSave('logged-user', userResponse);
            setUser(userResponse);
        }
        setLoading(false);
    }

    const errorMessage = (() => {
        if(!errors.username){
            return null;
        }
        if(errors.username.type === "required"){
            return <span>Username is required.</span>
        } 

        if(errors.username.type === "minLength"){
            return <span>Username has to be at least 4 characters.</span>
        } 
    })()

    return (
        <>
            <h1>Log in:</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type= "text"
                        placeholder="username"
                        { ...register("username", usernameConfig)}/>
                       
                    <label htmlFor="password">Password:</label>
                    <input 
                        type= "text"
                        placeholder="password"
                        { ...register("password", usernameConfig)}/>
                    { errorMessage }
                </fieldset>

                <button type="submit" disabled={ loading }>Log in</button>
                {loading && <p>Logging in...</p>}
                {apiError && <p>{apiError}</p>}
            </form>
            
        </>
    )
}

export default LoginForm;