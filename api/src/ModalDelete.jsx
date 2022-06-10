import React, { useState } from 'react'
import styles from './ModalDelete.module.css'
import axios from 'axios'

const ModalDelete = ({ show, onClose, cattle }) => {
  const [input, setInput] = useState({
    idSenasa: cattle.idSenasa,
    animalType: cattle.animalType,
    weight: cattle.weight,
    potrero: cattle.name,
    device: cattle.device,
    deviceNumber: cattle.deviceNumber,
  })
  const [error, setError] = useState({})

  const handleError = input => {
    let error = {}
    //regex for alphanumeric values
    const regex = /^[a-zA-Z0-9]+$/
    //regex for letters only
    const regexLetters = /^[a-zA-Z]+$/

    if (!regex.test(input.idSenasa)) {
      error.idSenasa = 'El idSenasa debe ser alfanumérico'
    }
    if (!regexLetters.test(input.potrero)) {
      error.potrero = 'El nombre debe contener unicamente letras'
    }
    if (!regex.test(input.deviceNumber)) {
      error.deviceNumber = 'El numero de dispositivo debe ser alfanumérico'
    }
    setError(error)
    return error
  }

  const handleOnChange = e => {
    console.log(cattle)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    handleError(input)
    console.log(error)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const error = handleError(input)
    if (Object.keys(error).length === 0) {
      axios
        .put(`http://localhost:3001/api/cattle/${cattle.id}`, input)
        .then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
          return alert('Información actualizada')
        })
        .catch(err => {
          alert('Error al actualizar la información')
          console.log(err)
        })
    } else {
      return alert('Error al actualizar la información, revise los campos')
    }

    onClose()
  }

  if (!show) {
    return null
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>
            ¿Está seguro que quiere eliminar?<span className={styles.info}>Los cambios son irevercibles</span>
          </h4>
        </div>
        <div className={styles.modalBody}></div>
      </div>
    </div>
  )
}

export default ModalDelete
