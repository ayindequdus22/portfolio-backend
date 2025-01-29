import React from 'react'
import { useParams } from 'react-router-dom'

const Project = ():React.JSX.Element => {
    const  {id}  = useParams();
    console.log(id)
  return (
    <div>{id}</div>
  )
}

export default Project