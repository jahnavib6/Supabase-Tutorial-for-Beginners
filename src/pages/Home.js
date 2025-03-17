import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

// components
import UserCard from '../components/UserCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [edata, setEdata] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setEdata(prevEdata => {
      return prevEdata.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchEdata = async () => {
      const { data, error } = await supabase
        .from('environmental_data')
        .select()
        .order(orderBy, {ascending: false})
      
      if (error) {
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
      }
      if (data) {
        setEdata(data)
        setFetchError(null)
      }
    }

    fetchEdata()

  }, [orderBy])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {edata && (
        <div className="edata">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('method')}>Method</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            <button onClick={() => setOrderBy('dorm')}>Dorm</button>
          </div>
          <div className="edata-grid">
            {edata.map(edata => (
              <UserCard key={edata.id} edata={edata} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
