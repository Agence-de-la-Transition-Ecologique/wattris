import React, { useContext } from 'react'
import { usePeaks } from 'hooks/useAppliances'
import DataContext from 'components/providers/DataProvider'
import DynamicIcon from 'components/icons/DynamicIcon'
import Score from './Score'
import styles from 'styles/AdviseAndRecommendations.module.css'
import { getRealHoursFromDecimalHours } from 'utils/formatters'

export default function AdviseAndRecommendations() {
    const {
    appliances,
    occurrences,
    watchedApplianceSlugs
    } = useContext(DataContext)

    const watchedOccurrences = occurrences.filter((occurrence) => watchedApplianceSlugs.includes(occurrence.slug))
    const peaks = usePeaks(watchedOccurrences)
    const watchedAppliances = watchedOccurrences.map((occurrence, index) => {
        const appliance = appliances.find((appliance) => appliance.slug === occurrence.slug)
        return {
            ...appliance,
            peak: peaks[index],
            start: getRealHoursFromDecimalHours(occurrence.start),
            end: getRealHoursFromDecimalHours(occurrence.start + occurrence.duration),
        }
    }).sort((a, b) => watchedApplianceSlugs.indexOf(a.slug) - watchedApplianceSlugs.indexOf(b.slug))

    const hasWatchedAppliances = watchedAppliances && watchedAppliances.length > 0

  return (
      <>
          <div className={styles.contentWrapper}>
            <div className={`${styles.blocWrapper} ${styles.blocWrapperScore}`} style={{marginTop: hasWatchedAppliances ? '' : '0'}}>
                <Score adviseSection />
            </div>
            <div className={styles.blocWrapper}>
                {hasWatchedAppliances && 
                <h4 className={styles.title}>
                    Les appareils suivant peuvent être décalés en dehors des heures de pointe :
                </h4>
            }
    
            <div className={styles.listAppliances}>
                {watchedAppliances.map((appliance) => (
                    <div key={appliance.slug} className={appliance.peak ? styles.applianceItemKO : styles.applianceItemOK}>
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
                ))}
            </div>
            </div>
          </div>
          <p className={styles.noteInfo}>
                <strong>Pour aller plus loin</strong>
                <br />
                <small>
                    Pour diminuer sa consommation pendant les heures de pointe, deux solutions : décaler l'utilisation de ses appareils ou réduire sa consommation. 
                    Voici <a href="https://agirpourlatransition.ademe.fr/particuliers/economiser/energie/20-solutions-reduire-consommation-electricite" target="_blank" rel="noopener noreferrer">20 solutions pour réduire sa consommation d'électricité</a> proposées par l'ADEME.
                </small>
          </p>
      </>
  )
}