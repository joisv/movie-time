import { Link } from '@inertiajs/react';

export default function ResponsiveMenu({ active = false, className = '', children, ...props }) {
    return (
      <Link
        {...props}
        className={`text-text flex space-x-2 items-center p-2 gap-2 rounded-sm ${
          active
            ? 'bg-secondaryAccent bg-opacity-70 border-r-4 border-secondaryAccent font-semibold '
            : 'border-transparent text-text hover:text-text hover:bg-secondaryAccent hover:border-gray-300 focus:text-text focus:bg-secondaryAccent focus:border-gray-300'
        } text-base ${className}`}
      >
        {children}
      </Link>
    );
  }
