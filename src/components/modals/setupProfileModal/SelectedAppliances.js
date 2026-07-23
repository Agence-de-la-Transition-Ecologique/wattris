import React from 'react'
import styles from 'styles/SetupProfileModal.module.css'
import SelectedItem from './SelectedItem'

export default function SelectedAppliances({ occurrences, onDelete }) {
  return (
    <section className={styles.setupProfileModalBloc}>
      <h4 className={styles.setupProfileModalBlocTitle}>Mes appareils sélectionnés</h4>
      <div className={styles.setupProfileModalBlocContent}>
        {occurrences && occurrences.map((item, index) => (
          <SelectedItem
            key={index}
            item={item}
            onDelete={() => onDelete({ occurrenceIndex: index })}
          />
        ))}
      </div>
    </section>
  )
}
