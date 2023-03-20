import { Chip } from "@mui/material"
import { useState } from "react"   

let newSkillList = []
export const returnedListSkills = () => {
    return newSkillList
}

const SkillsInput = () => {

    const [skills, setSkills] = useState([])
    const [text, setText] = useState("")

    const handleKeyDown = (e) => {
        if(e.key !== "Enter") return
        newSkillList.push({skillName: text})
        setSkills([...skills, {skillName: text}])
        setText("");  
        console.log(newSkillList)     
    }
    
    const removeSkill = (index) => {
        setSkills(skills.filter((el, i) => i !== index))
        newSkillList = newSkillList.filter((el, i) => i !== index)
         console.log(newSkillList)
    }

    return (
        <>
        <span>
        <input onKeyDown={handleKeyDown} value={text} onChange={e => setText(e.target.value)} />
            <div>
             {skills.map((item, index) => ( 
                <span><Chip label={item.skillName}/>
                <span className="close" onClick={() => removeSkill(index)}>x</span></span>
             ))}
             </div>
        </span>
        </>
    )
}

export default SkillsInput