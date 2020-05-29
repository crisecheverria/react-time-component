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

  function validate(input) {
    let error = ""
    const patern1 = /^(\d{4}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).(\d{2})$/g
    if (!input.match(patern1)) {
      error = "Invalid dateTime format."
      console.error(error)
    }

    if (input.trim() === "") {
      error = "A dateTime is required."
      console.error(error)
    }

    return error
  }

  function handleSubmit(e) {
    e.preventDefault()

    const error = validate(time)
    if (error) return

    setData({
      time,
      dynamic: dynamic.current.checked,
      includeTime: includeTime.current.checked,
    })
  }

  return (
    <div className="container">
      <h3>Use a valid dateTime format like 2020-05-28 05:45:20</h3>
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
      <p>
        In order to see the changes you have to select the options and also
        click on Submit button
      </p>
      <ul>
        <li>
          <b>Dynamic</b>: Update the component after 1 minute interval.
        </li>
        <li>
          <b>Include Time</b>: Update the component after 1 second interval.
        </li>
      </ul>
    </div>
  )
}

export default App
