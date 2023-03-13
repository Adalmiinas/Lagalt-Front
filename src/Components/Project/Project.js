import { useState, useEffect } from "react";
import { fetchProjects, getProjectById } from "../../Service/ProjectInfos";
import { AppBar, Button, ButtonGroup, TextField } from "@mui/material";

const GetProject = () => {
  const [projectId, setProjectId] = useState(() => {
    return "2"
  })

  const [searchedProject, setSearchedProject] = useState([]);

  const renderProjects = () => {
    return searchedProject.map(item => <p key={item.id}>{item.title}</p>)
  }
 
  useEffect(() =>  {
    //const getProjects = async () => {setSearchedProject(fetchProjects())
    //const getProjects = fetchProjects()
    const getProjects =  async () => {
      //const apiResponse = fetchProjects()
      //console.log(apiResponse)
      const apiResponse = await fetch("http://localhost:5128/api/Project/List")
      const apiPayload = await apiResponse.json()
      setSearchedProject(apiPayload)
      //setSearchedProject(apiResponse)
        
      
    }
    
    getProjects()
  }, [])

  return (
    
      <div>
        {renderProjects()}
      </div>
    
  )
}
export default GetProject;
