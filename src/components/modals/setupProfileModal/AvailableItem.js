import React from 'react'
import styles from 'styles/SetupProfileModal.module.css'
import DynamicIcon from 'components/icons/DynamicIcon'
import PlusIcon from 'components/icons/PlusIcon'

export default function AvailableItem({item, onAdd}) {
    return (
        <div className={styles.setupProfileModalAvailableItem}>
            <span className={styles.setupProfileModalAvailableItemLabelIcon}>
                <DynamicIcon name={item.boldIcon}/>
                <span>{item.name}</span>
            </span>
            <button type="button"
                    className={styles.setupProfileModalAvailableItemAddButton}
                    onClick={onAdd}
                    aria-label={`Ajouter ${item.name}`}
            >
                <PlusIcon className={styles.setupProfileModalAvailableItemAddIcon} onClick={onAdd}/>
            </button>
        </div>
    )
}
