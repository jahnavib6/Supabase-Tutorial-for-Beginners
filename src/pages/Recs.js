import { useState, useEffect } from 'react'
import supabase from '../config/supabaseClient'

const Recommendations = () => {
const [recommendations, setRecommendations] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
const fetchRecommendations = async () => {
const { data, error } = await supabase
.from('recommendations')
.select()

if (error) {
console.error('Error fetching recommendations:', error)
} else {
setRecommendations(data)
}
setLoading(false)
}

fetchRecommendations()
}, [])

return (
<div className="page recommendations">
<h2>Sustainability Recommendations</h2>
{loading && <p>Loading recommendations...</p>}
<div className="recommendations-grid">
{recommendations.map((rec) => (
<div key={rec.id} className="recommendation-card">
<h3>{rec.title}</h3>
<p>{rec.description}</p>
<span>Impact: {rec.impact}/5</span>
</div>
))}
</div>
</div>
)
}

export default Recommendations