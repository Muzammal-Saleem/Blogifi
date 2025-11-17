import React, { useId } from 'react'

const Select = React.forwardRef(function({
    label,
    className = "",
    options = [],
    placeholder = "Choose...",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full space-y-1">
            {label && (
                <label htmlFor={id} className="text-sm text-slate-300">
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`px-4 py-3 rounded-2xl bg-slate-900/60 text-white outline-none border border-white/10 focus:border-blue-400 focus:bg-slate-900 transition w-full ${className}`}
                {...props}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Select
