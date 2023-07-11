import {BsEmojiNeutral} from 'react-icons/bs'

export default function NoDataDisplay({ children }) {
  return (
    <div className='w-full h-screen flex items-center justify-center space-x-3'>
      <div className="w-14 opacity-50">
        <BsEmojiNeutral color='#ffffff' size={'100%'} />
      </div>
      <h1 className='text-2xl font-medium opacity-50 text-white'>
        {children}
      </h1>
    </div>
  )
}
