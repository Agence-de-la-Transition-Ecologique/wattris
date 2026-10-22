import React, { useState } from 'react';
import styles from 'styles/SetupProfileModal.module.css';
import AvailableItem from './AvailableItem';

export default function AvailableCategory({ categoryIndex, category, onAdd }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.setupProfileModalAvailableCategory}>
      <h4 className={styles.setupProfileModalAvailableCategoryTitle}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`category-${categoryIndex}`}
          id={`category-${categoryIndex}-label`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {category.category}
        </button>
      </h4>
      <div
        id={`category-${categoryIndex}`}
        aria-labelledby={`category-${categoryIndex}-label`}
        className={styles.setupProfileModalAvailableCategoryContent}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        {category.items.map((item, index) => (
          <AvailableItem key={index} item={item} onAdd={() => onAdd(item)} />
        ))}
      </div>
    </div>
  );
}
