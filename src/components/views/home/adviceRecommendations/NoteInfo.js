import React from 'react'
import styles from 'styles/AdviseAndRecommendations.module.css'

export default function NoteInfo() {
    return (
        <p className={styles.noteInfo}>
            <strong>Pour aller plus loin</strong>
            <br />
            <small>
                Pour diminuer sa consommation pendant les heures de pointe, deux solutions : décaler l'utilisation de ses appareils ou réduire sa consommation.
                Voici <a href="https://agirpourlatransition.ademe.fr/particuliers/economiser/energie/20-solutions-reduire-consommation-electricite" target="_blank" rel="noopener noreferrer">20 solutions pour réduire sa consommation d'électricité</a> proposées par l'ADEME.
            </small>
        </p>
    )
}
