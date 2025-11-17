import React from 'react'

function Button({
        children ,
        type="button",
        variant="primary",
        className="",
        bgColor,
        textColor,
        ...props
    }) {

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-500",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        ghost: "bg-transparent text-white hover:bg-white/10",
    }

    const palette = bgColor || textColor ? `${bgColor ?? ""} ${textColor ?? ""}` : variants[variant]

  return (
    <button className={`px-4 py-2 rounded-full font-semibold transition ${palette} ${className}`} type={type} {...props}>{children}</button>
  )
}

export default Button