import React, { useId } from 'react'

const Input = React.forwardRef(function({
    label,
    type ="text",
    className= "",
    hint,
    ...props
},ref){
    const id = useId();
return (
    <div className='w-full space-y-1'>
        {label && <label className="text-sm text-slate-300"
        htmlFor={id} >{label}</label>}

        <input 
        type={type}
        className={`px-4 py-3 rounded-2xl bg-slate-900/60 text-white outline-none border border-white/10 focus:border-blue-400 focus:bg-slate-900 transition w-full  ${className}`}
        ref={ref}
        {...props}
        id={id}/>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
)
})

export default Input;
