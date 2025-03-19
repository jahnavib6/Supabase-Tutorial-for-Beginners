import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [dorm, setDorm] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!dorm || !method || !rating) {  
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('environmental_data') 
      .update({ dorm, rating, method })
      .eq('id', id)

    if (error) {
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchEdata = async () => {
      const { data, error } = await supabase
        .from('environmental_data')  
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setDorm(data.dorm)
        setMethod(data.method)
        setRating(data.rating)
      }
    }

    fetchEdata()
  }, [id, navigate])

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="dorm">Dorm:</label>
        <input 
          type="text" 
          id="dorm"
          value={dorm}
          onChange={(e) => setDorm(e.target.value)}  
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Environmental Task</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update
