import React, { forwardRef, useEffect, useRef, useState } from 'react'

export default forwardRef(function InputComponent({ def, className = '',  ...props }, ref) {
    const input = ref ? ref : useRef();
    const [ isFocused, setIsFocused ] = useState(false);
    const [inputClass, setInputClass] = useState('');

    useEffect(() => {
        setInputClass('text-transparent')
        if (isFocused) {
            input.current.focus();
        }
    },[])
    
    function handleBlur() {
        setIsFocused(false)
        setInputClass('text-transparent')
    }
    
    function handleFocus(){
        setIsFocused(true)
        setInputClass('')
    }
  return (
    <div className='relative'>
       <input type="text" className={`border-transparent bg-transparent font-medium text-gray-900 rounded-md focus:ring-transparent focus:border-transparent block w-full px-2.5 absolute text-base ease-out duration-150 h-fit placeholder:text-transparent ${inputClass}`} 
            {...props}
            onFocus={() => handleFocus()} 
            onBlur={() => handleBlur()}
            ref={ref}
        />
        <div className={`transition-transform ease-in duration-150 ${className.className} ${isFocused ? className.translate : ''}`}>
            {
                props.value ? (
                    <div className='flex space-x-2'>
                        <h3 className={`ease-in duration-150 ${isFocused ? 'hidden' : 'block'}`}>{props.value}</h3>
                        <span className={`text-base font-medium ease-in duration-150 opacity-60 italic ${!isFocused ? 'hidden' : 'block'}`}>{ props.placeholder ? `${props.placeholder}` : null }</span>
                    </div>
                ) : def
            }
        </div>
    </div>
  )
})
