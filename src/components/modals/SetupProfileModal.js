import React, { useContext } from 'react'
import ModalContext from 'components/providers/ModalProvider'
import DataContext from 'components/providers/DataProvider'
import Modal from 'components/base/Modal'
import ArrowRightIcon from 'components/icons/ArrowRightIcon'
import styles from 'styles/SetupProfileModal.module.css'
import SelectedAppliances from './setupProfileModal/SelectedAppliances'
import AvailableAppliances from './setupProfileModal/AvailableAppliances'

export default function SetupProfileModal() {
  const {
    setupProfileOpen,
    setSetupProfileOpen,
    setupProfileOccurrences,
    setSetupProfileOccurrences,
  } = useContext(ModalContext)

  const { categoryAppliances, setOccurrences } = useContext(DataContext)

  const addOccurrence = (item) => {
    setSetupProfileOccurrences([...setupProfileOccurrences, item])
  }

  const deleteOccurrence = ({ occurrenceIndex }) => {
    setSetupProfileOccurrences((prevOccurrences) =>
      prevOccurrences.filter((_, index) => index !== occurrenceIndex)
    )
  }

  const start = () => {
    setOccurrences(setupProfileOccurrences)
    setSetupProfileOpen(false)
  }

  return (
    <Modal open={setupProfileOpen} setOpen={setSetupProfileOpen} width="95vw" height="85vh" backgroundColor={(props) => props.theme.colors.textLight}>
      <div className={styles.setupProfileModalContainer}>
        <div className={styles.setupProfileModalHeader}>
          <h3 className={styles.setupProfileModalTitle}>Configurez votre profil</h3>
          <small className={styles.setupProfileModalSubtitle}>Cliquez sur le + pour ajouter un appareil à votre sélection</small>
        </div>

        <div className={styles.setupProfileModalBody}>
          <SelectedAppliances occurrences={setupProfileOccurrences} onDelete={deleteOccurrence} />
          <AvailableAppliances categoryAppliances={categoryAppliances} onAdd={addOccurrence} />
        </div>

        <footer className={styles.setupProfileModalFooter}>
          <button type="button" className={styles.setupProfileModalButton} onClick={start}>
            Commencer
            <ArrowRightIcon strokeWidth={10} className={styles.setupProfileModalButtonIcon} />
          </button>
        </footer>
      </div>
    </Modal>
  )
}