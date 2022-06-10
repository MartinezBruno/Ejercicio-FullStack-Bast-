import React from 'react'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav>
      <div className={styles.nav}>
        <div>
          <h1>Ejercicio Full Stack Developer - Bastó</h1>
        </div>
        <div>
          <button className={styles.notificationButton} disabled>
            Notificaciones <span className={styles.notificationNumber}>📢</span>
          </button>
          <button className={styles.logoutButton} disabled>
            Cerrar Sesión <span className={styles.logoutIcon}> 👋 </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
