import React, { useContext } from 'react'
import DynamicIcon from 'components/icons/DynamicIcon'
import styles from 'styles/AdviseAndRecommendations.module.css'
import DataContext from 'components/providers/DataProvider'
import Link from 'next/link'

export default function ApplianceItem({ appliance }) {
    const { setActive } = useContext(DataContext)
    
    const handleClick = () => {
        setActive({ appliance: appliance.slug })
    }
    return (
        <Link
            href='#home'
            onClick={handleClick}
            className={appliance.peak ? styles.applianceItemKO : styles.applianceItemOK}
        >
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
        </Link>
    )
}
