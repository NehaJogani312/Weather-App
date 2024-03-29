import React from 'react'
import styles from '../styles/Header.module.css'

export default function Header() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          Seeing the weather of the whole world with <span className={styles.hawamaan}>Hawamaan!</span>
        </div>
      </div>
    </>
  )
}
