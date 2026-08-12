import React from 'react'

export default function TvBoldIcon({
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
            <g transform="scale(0.8696) translate(-728.8 -374.8)"><path d="M744 448 744 402 824 402 824 448 744 448ZM792 460 776 460 776 454 792 454 792 460ZM830 454 830 396 738 396 738 454 770 454 770 460 752 460C750.9 460 750 460.9 750 462L750 464 818 464 818 462C818 460.9 817.1 460 816 460L798 460 798 454 830 454Z"/></g>
        </svg>
    )
}
