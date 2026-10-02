import React from 'react'
import styles from 'styles/SetupProfileModal.module.css'
import DynamicIcon from 'components/icons/DynamicIcon'
import PlusIcon from 'components/icons/PlusIcon'

export default function AvailableItem({item, onAdd}) {
    return (
        <button type="button"
                className={styles.setupProfileModalAvailableItem}
                onClick={onAdd}
                aria-label={`Ajouter ${item.name}`}
        >
                <span className={styles.setupProfileModalAvailableItemLabelIcon}>
                    <DynamicIcon name={item.boldIcon}/>
                    <span>{item.name}</span>
                </span>
            <PlusIcon className={styles.setupProfileModalAvailableItemAddIcon}/>
        </button>
    )
}
