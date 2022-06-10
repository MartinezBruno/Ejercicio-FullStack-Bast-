import React, { useState } from 'react'
import styles from './ModalDelete.module.css'
import axios from 'axios'

const ModalDelete = ({ show, onClose, cattle }) => {
  console.log(cattle)

  const handleOnDelete = e => {
    e.preventDefault()
    axios
      .delete(`http://localhost:3001/api/cattle/${cattle.id}`)
      .then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
        return alert('Información eliminada')
      })
      .catch(err => {
        alert('Error al eliminar la información')
        console.log(err)
      })
  }

  if (!show) {
    return null
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>
            ¿Está seguro que quiere eliminar?
            <br />
            Los cambios son irevercibles
          </h4>
        </div>
        <div className={styles.modalBody}>
          <button onClick={handleOnDelete} className={styles.modalDeleteButton}>
            Eliminar
          </button>
          <button onClick={onClose} className={styles.modalCloseButton}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete
