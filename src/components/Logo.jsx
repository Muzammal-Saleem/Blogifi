import React from 'react'

function Logo({ className = "", size = "text-2xl", width, style }) {
  return (
    <div
      className={`font-semibold tracking-tight ${size} ${className}`}
      style={{ width, ...style }}
    >
      <span className="text-white">Blog</span>
      <span className="text-blue-300">ifi</span>
    </div>
  )
}

export default Logo