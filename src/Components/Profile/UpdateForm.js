import { useForm } from "react-hook-form";
import { useUser } from "../../Context/UserContext";

const usernameConfig = {
    required: true,
    minLength: 4
}

const UpdateForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const {user} = useUser();

    const onSubmit = async ({username, password, description, email, portfolio}) => {
        
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label> Username: 
                <input type="text" name="username"
                {...register("username", usernameConfig)}/>
                </label>

                <label> Password:
                <input type="text" name="password"
                {...register("password")}/>
                </label>

                <label> Description: 
                <input type="text" name="description"
                {...register("description")}/>
                </label>

                <label> Email: 
                <input type="text" name="email"
                {...register("email")}/>
                </label>

                <label> Portfolio: 
                <input type="text" name="portfolio"
                {...register("portfolio")}/>
                </label>
            </form>
        </>
    )
}

export default UpdateForm;
