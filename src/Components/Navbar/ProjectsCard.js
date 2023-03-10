import { useForm } from "react-hook-form"
const usernameConfig = {
    required: true,
    minLength: 3
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        
    }

    console.log(console.errors)

    const errorMessage = (() => {
        if(!errors.username) {
            return null
        }

        if(errors.username.type === "required"){
            return <span>Username is required</span>
        }

        if(errors.username.type === "minLength"){
            return <span>Username is too short min 3 chars.</span>
        }
    })()

    return (
        <>
            <h2>What's your name?</h2>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <fieldset>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        {...register("username", usernameConfig)}
                    />
                    { errorMessage }
                </fieldset>
                <button type="submit">Continue</button>
            </form>
        </>
    );
};
export default LoginForm


// Tsekkaa löytyykö käyttäjä ja täytetty oikein niin tekee span
// { (errors.username && errors.username.type === "required") && <span>Username is required</span> }