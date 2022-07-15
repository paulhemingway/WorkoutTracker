import { useParams } from "react-router-dom"

export default function Profile(props) {

    const {id } = useParams()

    console.log(id)
  return (
    <div>
        {id}'s profile
        <h3>{props.info.fName}</h3>
    </div>
    
  )
}
