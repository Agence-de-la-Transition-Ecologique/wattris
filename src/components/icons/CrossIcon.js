import React from 'react'
import { DEFAULT_ICON_STROKE_WIDTH } from './constants'

export default function CrossIcon({
    fill = 'currentColor',
    className,
    strokeWidth = DEFAULT_ICON_STROKE_WIDTH,
    ...props
}) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 96 96"
            fill={fill}
            stroke={fill}
            strokeWidth={strokeWidth}
            aria-hidden="true"
            {...props}
        >
            <g transform="translate(-592 -312)">
                <path d="M608.707 391.707 639 361.414 670.293 392.707 671.707 391.293 640.414 360 671.707 328.707 670.293 327.293 639 358.586 608.707 328.293 607.293 329.707 637.586 360 607.293 390.293 608.707 391.707Z"/>
            </g>
        </svg>
    )
}
