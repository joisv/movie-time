import { Link } from '@inertiajs/react'
import { Fragment } from 'react'

export default function Pagination({ data }) {
    return (
        <div>
            {data.links.length > 3 && (
                <div className="flex justify-center mt-4 space-x-4">
                    {data.links.map((link, index) => (
                        <Fragment key={index}>
                            <Link
                                href={link.url}
                                className={`sm:px-2 sm:py-1 p-1 h-fit  text-sm leading-4 bg-white rounded hover:bg-white focus:text-purple-500 hover:shadow ${link.active ? 'bg-purple-400 text-white' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </Fragment>
                    ))}
                </div>
            )}
        </div>

    )
}
