import React from 'react'

export default function SleepModeBoldIcon({
    fill = 'currentColor',
    className,
    ...props
}) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 96 96"
            fill={fill}
            xmlSpace="preserve"
            overflow="hidden"
            aria-hidden="true"
            {...props}
        >
            <g transform="translate(-199 -82)"><path d="M241 89 253 89 253 133 241 133Z"/><path d="M268.8 101.9 261.9 111.7C268.6 116.4 273 124.2 273 133 273 147.3 261.3 159 247 159 232.7 159 221 147.3 221 133 221 124.2 225.4 116.4 232.1 111.7L225.2 101.9C215.4 108.7 209 120.1 209 133 209 154 226 171 247 171 268 171 285 154 285 133 285 120.1 278.6 108.7 268.8 101.9Z"/></g>
        </svg>
    )
}
