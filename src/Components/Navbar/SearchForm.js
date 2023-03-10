import {useForm } from "react-hook-form"
import { Button, TextField } from "@mui/material";
import { fetchProjects, onSearchSubmitById} from  "../../Service/ProjectInfos"

const searchWordConfig = {
    minLength: 1
}

const SearchForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        const filteredList = onSearchSubmitById(data)
        //const filteredList = fetchProjects()
        console.log(filteredList)
        
        //onSearchSubmitById(data)
    }

    const errorMessage = (() => {
        if(!errors.searchedWord) {
            return null
        }

        if(errors.searchedWord.type === "minLength"){
            return <span>Type at least one character.</span>
        }
    })()

    return (
        <>
            {/* <TextField onSubmit={ handleSubmit(onSubmit)}
                    id="filled-search"
                    label="Search projects..."
                    type="search"
                    variant="filled"
                    {...register("filled search", searchWordConfig)}
                />
                {errorMessage } */}
                
                <form onSubmit={ handleSubmit(onSubmit) }>
                <fieldset>
                    {/* <label htmlFor="searchedWord">Search: </label> */}
                    <input
                        type="text"
                        placeholder="Search"
                        {...register("searchedWord", searchWordConfig)}
                    />
                    { errorMessage }
                </fieldset>
                <button type="submit" >Continue</button>
            </form>
        </>
    )    
}
export default SearchForm