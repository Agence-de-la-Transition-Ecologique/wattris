import React from 'react'
import ApplianceItem from './ApplianceItem'
import styles from 'styles/AdviseAndRecommendations.module.css'

export default function ApplianceList({ watchedAppliances, hasWatchedAppliances }) {
    return (
        <div className={styles.blocWrapper}>
            {hasWatchedAppliances && (
                <h4 className={styles.title}>
                    Les appareils suivants peuvent être décalés en dehors des heures de pointe :
                </h4>
            )}
            <div className={styles.listAppliances}>
                {watchedAppliances.map((appliance) => (
                    <ApplianceItem key={appliance.slug} appliance={appliance} />
                ))}
            </div>
        </div>
    )
}
