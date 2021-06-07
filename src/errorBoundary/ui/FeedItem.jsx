import React from 'react';

import styles from './FeedItem.module.css';

export function FeedItem({ title, image }) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title.toUpperCase()}</p>
      <div><img className={styles.image} src={image} alt="" /></div>
    </div>
  )
}