import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

export const Results = () => {
    const [results, setResults] = useState([]);

  useEffect(() => {
    getResults(1)
  }, [])

  const onInput = (e) => {
    getResults(e.target.value)
  }

  const getResults = async (count) => {
    let request = await fetch(`api/Results?count=${count ?? 0}`)
    let newResults = await request.json()

    for (let result of newResults) {
      let request = await fetch(`api/Results/IsAccepted/${result.id}`)
      let status = await request.json()
      console.log({...result, status})
      result.status = status
    }
    setResults(newResults)
  }

  return <div>
          <h1>Results</h1>
          <input type="text" onChange={onInput} defaultValue={1}/>
          <div>
            {results.map((result, i) => (
              <div key={result.id}>{i+1}. {result.name} is {result.status ? 'Accepted' : 'Denied'}</div>
            ))}
          </div>
        </div>
}