import React from 'react'
import styles from 'styles/SetupProfileModal.module.css'
import AvailableItem from './AvailableItem'

export default function AvailableCategory({ category, onAdd }) {
  return (
    <div className={styles.setupProfileModalAvailableCategory}>
      <div className={styles.setupProfileModalAvailableCategoryTitle}>{category.category}</div>
      <div>
        {category.items.map((item, index) => (
          <AvailableItem key={index} item={item} onAdd={() => onAdd(item)} />
        ))}
      </div>
    </div>
  )
}
