import React, { useState, useRef } from "react"
import TimeAgo from "./components/TimeAgo"
import "./App.css"

function App() {
  const [time, setTime] = useState("")
  const [data, setData] = useState({
    time: "",
    dynamic: false,
    includeTime: false,
  })
  const dynamic = useRef(false)
  const includeTime = useRef(false)

  function handleSubmit(e) {
    e.preventDefault()

    setData({
      time,
      dynamic: dynamic.current.checked,
      includeTime: includeTime.current.checked,
    })
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter time"
        />
        <label>
          Dynamic:
          <input type="checkbox" ref={dynamic} />
        </label>
        <label>
          Include Time:
          <input type="checkbox" ref={includeTime} />
        </label>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {data.time && (
        <TimeAgo
          targetTime={data.time}
          dynamic={data.dynamic}
          includeTime={data.includeTime}
        />
      )}
    </div>
  )
}

export default App
