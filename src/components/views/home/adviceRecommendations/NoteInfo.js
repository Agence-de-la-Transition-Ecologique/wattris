import React from 'react'
import styles from 'styles/AdviseAndRecommendations.module.css'

export default function NoteInfo() {
    return (
        <p className={styles.noteInfo}>
            <strong>Pour aller plus loin</strong>
            <br/>
            <small>
                Pour diminuer la demande d'électricité pendant les heures de pointe, mieux connaître la consommation de
                tous les appareils de votre foyer et trouver des idées pour réduire votre facture, explorez notre
                rubrique &laquo;<a href="https://agirpourlatransition.ademe.fr/particuliers/economiser/energie"
                             target="_blank" rel="noopener noreferrer">Comment économiser de l'énergie ?</a>&raquo;.
            </small>
        </p>
    )
}
