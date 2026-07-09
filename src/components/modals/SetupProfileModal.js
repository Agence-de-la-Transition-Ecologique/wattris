import React, { useContext } from 'react'
import ModalContext from "components/providers/ModalProvider";
import Modal from 'components/base/Modal'
import styles from 'styles/SetupProfileModal.module.css'
import ArrowRightIcon from 'components/icons/ArrowRightIcon'
import DynamicIcon from 'components/icons/DynamicIcon'
import CrossIcon from 'components/icons/CrossIcon'
import PlusIcon from 'components/icons/PlusIcon'
import DataContext from 'components/providers/DataProvider';

export default function SetupProfileModal() {

    const { 
        setupProfile: setupProfileOpen, 
        setSetupProfile: setSetupProfileOpen,
        setupProfileOccurences, 
        setSetupProfileOccurences
    } = useContext(ModalContext)

    const { categoryAppliances } = useContext(DataContext)

    const addOccurence = (item) => {
        setSetupProfileOccurences([...setupProfileOccurences, item])
    }

    const deleteOccurence = ({ occurenceIndex }) => {
        setSetupProfileOccurences((prevOccurences) =>
        prevOccurences.filter((occurence, index) => index !== occurenceIndex)
        )
    }

    return (
        <Modal open={setupProfileOpen} setOpen={setSetupProfileOpen} width="95vw" height="85vh" backgroundColor={(props) => props.theme.colors.textLight}>
            <div className={styles.setupProfileModalContainer}>
                <div className={styles.setupProfileModalHeader}>
                    <h3 className={styles.setupProfileModalTitle}>Configurez votre profil</h3>
                    <small className={styles.setupProfileModalSubtitle}>Cliquez sur le + pour ajouter un appareil à votre sélection</small>
                </div>

                <div className={styles.setupProfileModalBody}>
                    <section className={styles.setupProfileModalBloc}>
                        <h4 className={styles.setupProfileModalBlocTitle}>Mes appareils sélectionnés</h4>
                        <div className={styles.setupProfileModalBlocContent}>
                            {setupProfileOccurences && setupProfileOccurences.map((item, index) => (
                                <span key={index} className={styles.setupProfileModalSelectedItem}>
                                    {item.name} <CrossIcon className={styles.setupProfileModalSelectedItemIcon} onClick={() => deleteOccurence({ occurenceIndex: index })} />
                                </span>
                            ))}
                        </div>
                    </section>
                    <section className={styles.setupProfileModalBloc}>
                        <h4 className={styles.setupProfileModalBlocTitle}>Appareils disponibles</h4>
                        <div className={styles.setupProfileModalBlocContent}>
                            {categoryAppliances && categoryAppliances.map((category, categoryIndex) => (
                                <div key={categoryIndex} className={styles.setupProfileModalAvailableCategory}>
                                    <div className={styles.setupProfileModalAvailableCategoryTitle}>{category.category}</div>
                                    <div>
                                        {category.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className={styles.setupProfileModalAvailableItem}>
                                                <span className={styles.setupProfileModalAvailableItemLabelIcon}>
                                                    <DynamicIcon name={item.icon} />
                                                    <span>{item.name}</span>
                                                </span>
                                                <PlusIcon className={styles.setupProfileModalAvailableItemAddIcon} onClick={() => addOccurence(item)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))} 
                        </div>
                    </section>
                </div>

                <footer className={styles.setupProfileModalFooter}>
                    <button type="button" className={styles.setupProfileModalButton} onClick={() => setSetupProfileOpen(false)}>
                        Commencer
                        <ArrowRightIcon className={styles.setupProfileModalButtonIcon} />
                    </button>
                </footer>
            </div>
        </Modal>
    );
}