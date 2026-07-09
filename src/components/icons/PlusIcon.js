import React from 'react'

export default function PlusIcon({ fill = 'currentColor', className, ...props }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 81 81"
            fill={fill}
            aria-hidden="true"
            {...props}
        >
            <g transform="translate(-592 -327)">
                <path d="M633.344 333.75 631.656 333.75 631.656 366.656 598.75 366.656 598.75 368.344 631.656 368.344 631.656 401.25 633.344 401.25 633.344 368.344 666.25 368.344 666.25 366.656 633.344 366.656 633.344 333.75Z" />
            </g>
        </svg>
    )
}