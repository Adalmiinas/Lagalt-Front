import { Autocomplete, Chip, TextField } from "@mui/material"
import { useState } from "react"   

let newTagList = []
export const returnedList = () => {
    console.log(newTagList)
    return newTagList
}

const TagsInput = () => {

    const [tags, setTags] = useState([])
    const [text, setText] = useState("")

    const handleKeyDown = (e) => {
        if(e.key !== "Enter") return
        newTagList.push({tagName:text})
        setTags([...tags, {tagName: text}])
        setText("");    
        
        console.log(newTagList)   
    }
    
    const removeTag = (index) => {
        setTags(tags.filter((el, i) => i !== index))
        newTagList = newTagList.filter((el, i) => i !== index)
         console.log(newTagList)
    }

    return (
        <>
        <span>
        <input onKeyDown={handleKeyDown} value={text} onChange={e => setText(e.target.value)} />
            <div>
             {tags.map((item, index) => ( 
                 <span><Chip label={item.tagName}/>
                <span className="close" onClick={() => removeTag(index)}>x</span></span>
             ))}
             </div>
        </span>
        </>
    )
}

export default TagsInput