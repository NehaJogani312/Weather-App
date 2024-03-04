import React from 'react'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Details from '../components/DetailsCard'
import Api from '../components/Api'

export default function Home() {
  return (
    <>
        <div className={styles.mainContainer}>
            <Navbar/>
            <Header/>
            <Details/>
            <Api/>
        </div>
    </>
  )
}
