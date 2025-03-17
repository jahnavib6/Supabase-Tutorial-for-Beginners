import supabase from "../config/supabaseClient"
import { Link } from 'react-router-dom'

const UserCard = ({ edata, onDelete }) => {

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('environmental_data')
      .delete()
      .eq('id', edata.id)
    
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
      onDelete(edata.id)
    }
  }

  return (
    <div className="user-card">
      <h3>{edata.title}</h3>
      <p>{edata.method}</p>
      <div className="rating">{edata.rating}</div>
      <div className="buttons">
        <Link to={"/" + edata.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}

export default UserCard
