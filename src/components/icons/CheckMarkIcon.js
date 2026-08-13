import React from 'react'
import { DEFAULT_ICON_STROKE_WIDTH } from './constants'

export default function CheckMarkIcon({
    fill = 'currentColor',
    className,
    strokeWidth = DEFAULT_ICON_STROKE_WIDTH,
    ...props
}) {
    return (
        <svg 
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            fill={fill}
            stroke={fill}
            aria-hidden="true"
            {...props}>
                <g fill={fill} transform="translate(-896 -180)"><path d="M915.731 183.621 903.998 194.712 898.36 188.938 896.412 190.794 903.906 198.494 905.877 196.66 917.588 185.546Z" /></g>
        </svg>
    )
}