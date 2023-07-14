import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function AuthInput({ type = 'text', className = '', isFocused = false, icon, ...props }, ref) {

    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="bg-white flex h-11">
            <div className="bg-transparent flex items-center px-3">
                <div className='w-7'>
                    {icon}
                </div>
            </div>
            <div className="w-full h-full">
                <input
                    {...props}
                    type={type}
                    className="bg-transparent border-0 text-gray-900 text-base focus:ring-0 focus:border-0 block w-full h-full"
                    ref={input}
                />
            </div>
        </div>
    )
})
