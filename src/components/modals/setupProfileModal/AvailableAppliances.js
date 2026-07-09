import React from 'react'
import styles from 'styles/SetupProfileModal.module.css'
import AvailableCategory from './AvailableCategory'

export default function AvailableAppliances({ categoryAppliances, onAdd }) {
  return (
    <section className={styles.setupProfileModalBloc}>
      <h4 className={styles.setupProfileModalBlocTitle}>Appareils disponibles</h4>
      <div className={styles.setupProfileModalBlocContent}>
        {categoryAppliances && categoryAppliances.map((category, index) => (
          <AvailableCategory key={index} category={category} onAdd={onAdd} />
        ))}
      </div>
    </section>
  )
}
