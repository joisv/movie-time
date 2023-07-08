import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex rounded-sm items-center h-fit text-lg p-1 transition duration-150 ease-in-out focus:outline-none space-x-2 font-medium hover:text-white hover:bg-purple-400  hover:ease-in hover:duration-150' +
                (active
                    ? 'border-indigo-400 text-gray-100 focus:border-indigo-700 bg-purple-400 border border-r-purple-600'
                    : 'border-transparent text-blsck hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
