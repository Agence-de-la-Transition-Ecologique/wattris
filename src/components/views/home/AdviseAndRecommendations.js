import React, { useContext } from 'react'
import { usePeaks } from 'hooks/useAppliances'
import DataContext from 'components/providers/DataProvider'
import Score from './Score'
import styles from 'styles/AdviseAndRecommendations.module.css'
import { getRealHoursFromDecimalHours } from 'utils/formatters'
import ApplianceList from './adviceRecommendations/ApplianceList'
import NoteInfo from './adviceRecommendations/NoteInfo'

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
                <div className={`${styles.blocWrapper} ${styles.blocWrapperScore}`} style={{ marginTop: hasWatchedAppliances ? '' : '0' }}>
                    <Score adviseSection />
                </div>
                <ApplianceList watchedAppliances={watchedAppliances} hasWatchedAppliances={hasWatchedAppliances} />
            </div>
            <NoteInfo />
        </>
    )
}