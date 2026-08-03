import React from 'react'
import { DEFAULT_ICON_STROKE_WIDTH } from './constants'

export default function ArrowRightIcon({
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
            <g transform="translate(-558 -370)">
                <path d="M591.293 392.707 616.586 418 591.293 443.293 592.707 444.707 619.414 418 592.707 391.293 591.293 392.707Z" />
            </g>
        </svg>
    )
}
