import React from 'react'
import styles from 'styles/SetupProfileModal.module.css'
import SelectedItem from './SelectedItem'

export default function SelectedAppliances({ occurences, onDelete }) {
  return (
    <section className={styles.setupProfileModalBloc}>
      <h4 className={styles.setupProfileModalBlocTitle}>Mes appareils sélectionnés</h4>
      <div className={styles.setupProfileModalBlocContent}>
        {occurences && occurences.map((item, index) => (
          <SelectedItem
            key={index}
            item={item}
            onDelete={() => onDelete({ occurenceIndex: index })}
          />
        ))}
      </div>
    </section>
  )
}
