import React from 'react'
import styles from 'styles/SetupProfileModal.module.css'
import CrossIcon from 'components/icons/CrossIcon'

export default function SelectedItem({item, onDelete}) {
    return (
        <div className={styles.setupProfileModalSelectedItem}>
            <span>{item.name}</span>
            <button type="button"
                    className={styles.setupProfileModalSelectedItemDeleteButton}
                    onClick={onDelete}
                    aria-label={`Retirer ${item.name}`}
            >
                <CrossIcon onClick={onDelete}/>
            </button>
        </div>
    )
}
