import React from 'react'
import styles from 'styles/SetupProfileModal.module.css'
import CrossIcon from 'components/icons/CrossIcon'

export default function SelectedItem({ item, onDelete }) {
  return (
    <span className={styles.setupProfileModalSelectedItem}>
      {item.name}
      <CrossIcon className={styles.setupProfileModalSelectedItemIcon} onClick={onDelete} />
    </span>
  )
}
