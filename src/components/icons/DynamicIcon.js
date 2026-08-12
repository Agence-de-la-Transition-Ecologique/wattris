import React from 'react'
import ArrowRightIcon from 'components/icons/ArrowRightIcon'

const iconMap = {
  ArrowRightIcon
}

export default function DynamicIcon({ name, ...props }) {
  const Icon = (name && iconMap[name]) || ArrowRightIcon
  return <Icon {...props} />
}
