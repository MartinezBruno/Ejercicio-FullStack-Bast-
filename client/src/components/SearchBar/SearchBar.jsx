import React from 'react'
import styles from './SearchBar.module.css'

const SearchBar = ({ handleSetCattle }) => {
  const handleChange = e => {
    handleSetCattle(e.target.value)
  }
  return (
    <div className={styles.inputGroup}>
      <input type='text' id='name' required className={styles.input} onChange={handleChange} autoComplete='off' />
      <label htmlFor='name' className={styles.inputLabel}>
        Nombre del Potrero
      </label>
    </div>
  )
}

export default SearchBar
