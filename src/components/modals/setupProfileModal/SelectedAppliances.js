import React from 'react'
import styles from 'styles/SetupProfileModal.module.css'
import SelectedItem from './SelectedItem'

export default function SelectedAppliances({occurrences, onDelete}) {
    return (
        <section className={styles.setupProfileModalBloc}>
            <h4 className={styles.setupProfileModalBlocTitle}>Correspondez-vous à ce profil ?</h4>
            <small className={styles.setupProfileModalBlocSubtitle}>Si certains appareils ne sont pas disponibles dans<br/>
                votre foyer, cliquez sur X</small>
            <div className={styles.setupProfileModalBlocContent}>
                {occurrences && occurrences.map((item, index) => (
                    <SelectedItem
                        key={index}
                        item={item}
                        onDelete={() => onDelete({occurrenceIndex: index})}
                    />
                ))}
            </div>
        </section>
    )
}
