import React, { useState, useEffect } from "react"
import "../App.css"

export default function TimeAgo(props) {
  const [timeAgo, setTimeAgo] = useState("")
  const { targetTime, includeTime, dynamic } = props

  function countIncludeTime(date) {
    const difference = +new Date() - +new Date(date)
    let remaining = ""

    if (difference > 0) {
      const parts = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }

      remaining = Object.keys(parts)
        .map((part) => {
          if (!parts[part]) return
          return `${parts[part]} ${part}`
        })
        .join(" ")
    }

    return remaining
  }

  useEffect(() => {
    console.log("didMounted")
    setTimeAgo(countIncludeTime(targetTime))
  }, [])

  useEffect(() => {
    if (dynamic) {
      console.log("dynamic", dynamic)
      setTimeAgo(countIncludeTime(targetTime))
      const interval = setInterval(() => {
        setTimeAgo(countIncludeTime(targetTime))
      }, 1000 * 60)
      return () => clearInterval(interval)
    }
  }, [dynamic, targetTime])

  useEffect(() => {
    if (includeTime) {
      console.log("include", includeTime)
      setTimeAgo(countIncludeTime(targetTime))
      const interval = setInterval(() => {
        setTimeAgo(countIncludeTime(targetTime))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [includeTime, targetTime])

  useEffect(() => {
    if (!includeTime && !dynamic) {
      console.log("include", includeTime)
      setTimeAgo(countIncludeTime(targetTime))
      const interval = setInterval(() => {
        setTimeAgo(countIncludeTime(targetTime))
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [includeTime, dynamic, targetTime])

  return <span className="big">{timeAgo}</span>
}
