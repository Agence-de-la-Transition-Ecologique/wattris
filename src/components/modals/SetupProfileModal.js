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
    setupProfile: setupProfileOpen,
    setSetupProfile: setSetupProfileOpen,
    setupProfileOccurences,
    setSetupProfileOccurences,
  } = useContext(ModalContext)

  const { categoryAppliances, setOccurences } = useContext(DataContext)

  const addOccurence = (item) => {
    setSetupProfileOccurences([...setupProfileOccurences, item])
  }

  const deleteOccurence = ({ occurenceIndex }) => {
    setSetupProfileOccurences((prevOccurences) =>
      prevOccurences.filter((_, index) => index !== occurenceIndex)
    )
  }

  const start = () => {
    setOccurences(setupProfileOccurences)
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
          <SelectedAppliances occurences={setupProfileOccurences} onDelete={deleteOccurence} />
          <AvailableAppliances categoryAppliances={categoryAppliances} onAdd={addOccurence} />
        </div>

        <footer className={styles.setupProfileModalFooter}>
          <button type="button" className={styles.setupProfileModalButton} onClick={start}>
            Commencer
            <ArrowRightIcon className={styles.setupProfileModalButtonIcon} />
          </button>
        </footer>
      </div>
    </Modal>
  )
}