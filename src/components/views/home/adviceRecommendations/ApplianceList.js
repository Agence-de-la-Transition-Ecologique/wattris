import React from 'react'
import ApplianceItem from './ApplianceItem'
import styles from 'styles/AdviseAndRecommendations.module.css'

export default function ApplianceList({ watchedAppliances, hasWatchedAppliances }) {
    const slugCounts = watchedAppliances.reduce((acc, a) => {
        acc[a.slug] = (acc[a.slug] || 0) + 1
        return acc
    }, {})
    const slugIndexes = {}

    return (
        <div className={styles.blocWrapper}>
            {hasWatchedAppliances && (
                <h4 className={styles.title}>
                    Les appareils suivants peuvent être décalés en dehors des heures de pointe :
                </h4>
            )}
            <div className={styles.listAppliances}>
                {watchedAppliances.map((appliance, index) => {
                    slugIndexes[appliance.slug] = (slugIndexes[appliance.slug] || 0) + 1
                    const indexInAppliance = slugCounts[appliance.slug] > 1 ? slugIndexes[appliance.slug] : undefined
                    return (
                        <ApplianceItem
                            key={appliance.slug + index}
                            appliance={appliance}
                            indexInAppliance={indexInAppliance}
                        />
                    )
                })}
            </div>
        </div>
    )
}
