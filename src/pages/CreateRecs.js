import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const CreateRecommendation = () => {
const navigate = useNavigate()
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [impact, setImpact] = useState('')
const [formError, setFormError] = useState(null)

const handleSubmit = async (e) => {
e.preventDefault()

if (!title || !description || !impact) {
setFormError('Please fill in all fields correctly.')
return
}

const { data, error } = await supabase
.from('recommendations')
.insert([{ title, description, impact: Number(impact) }])

if (error) {
console.log(error)
setFormError('Could not submit recommendation. Try again.')
}if (data) {
console.log(data)
setFormError(null)
navigate('/recommendations')
}
}

return (
<div className="page create">
<h2>Give a Sustainability Recommendation</h2>
<form onSubmit={handleSubmit}>
<label>Title:</label>
<input
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>

<label>Description:</label>
<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
/>

<label>Impact (1-5):</label>
<input
type="number"
value={impact}
onChange={(e) => setImpact(e.target.value)}
min="1"
max="5"
/>

<button>Submit</button>
{formError && <p className="error">{formError}</p>}
</form>
</div>
)
}

export default CreateRecommendation