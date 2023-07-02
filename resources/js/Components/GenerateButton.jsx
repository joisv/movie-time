import { ImSpinner9 } from 'react-icons/im'

export default function GenerateButton({ children, disabled, type, className = '', ...props }) {
  return (
    <button 
        {...props}
        type={type}
        className={`focus:outline-none text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-[4px] mb-2 w-20 flex justify-center items-center ${disabled ? 'opacity-80' : null } ` + className } 
        disabled={disabled}
    >
        {disabled ? <ImSpinner9 color='#ffffff' size={17} className='animate-spin'/> : children}
    </button>
  )
}

