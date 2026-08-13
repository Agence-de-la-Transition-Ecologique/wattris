import React from 'react'
import DynamicIcon from 'components/icons/DynamicIcon'
import styles from 'styles/AdviseAndRecommendations.module.css'

export default function ApplianceItem({ appliance }) {
    return (
        <div className={appliance.peak ? styles.applianceItemKO : styles.applianceItemOK}>
            <div className={styles.applianceItemIconLabel}>
                <DynamicIcon name={appliance.boldIcon} />
                <span className={styles.applianceItemLabel}>
                    <span>{appliance.name}</span>
                    <small className='hours'>{appliance.start} - {appliance.end}</small>
                </span>
            </div>
            <span className={styles.applianceItemStatus}>
                {appliance.peak ? 'En période de pointe' : <><DynamicIcon name="CheckMarkIcon" /> Hors pointe</>}
            </span>
        </div>
    )
}
