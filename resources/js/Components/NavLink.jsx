import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex rounded-sm items-center h-fit text-base p-2 font-semibold transition duration-150 ease-in-out focus:outline-none space-x-2 hover:text-white hover:bg-gray-800 hover:ease-in hover:duration-150 border-0' +
                (active
                    ? 'border-0 text-gray-100 focus:border-0 bg-gray-800 border-r-purple-600'
                    : 'border-transparent text-blsck hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-0 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
