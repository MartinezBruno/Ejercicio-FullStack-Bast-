import React, { useState } from 'react'
import styles from './AddForm.module.css'
import axios from 'axios'

const AddForm = ({ show, onClose }) => {
  const [input, setInput] = useState({
    idSenasa: '',
    animalType: '',
    weight: '',
    name: '',
    device: '',
    deviceNumber: '',
  })
  const [error, setError] = useState({})

  const handleError = input => {
    let error = {}
    //regex for alphanumeric values
    const regex = /^[a-zA-Z0-9]+$/

    if (!input.idSenasa) {
      error.idSenasa = 'El idSenasa es requerido'
    } else if (!regex.test(input.idSenasa)) {
      error.idSenasa = 'El idSenasa debe ser alfanumérico'
    }
    if (!input.animalType) {
      error.animalType = 'El tipo de animal es requerido'
    }
    if (!input.weight) {
      error.weight = 'El peso es requerido'
    }
    if (!input.name) {
      error.name = 'El nombre es requerido'
    } else if (!regex.test(input.name)) {
      error.name = 'El nombre debe ser alfanumérico'
    }
    if (!input.device) {
      error.device = 'El dispositivo es requerido'
    }
    if (!input.deviceNumber) {
      error.deviceNumber = 'El numero de dispositivo es requerido'
    } else if (!regex.test(input.deviceNumber)) {
      error.deviceNumber = 'El numero de dispositivo debe ser alfanumérico'
    }
    setError(error)
    return error
  }

  const handleOnChange = e => {
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
        .post('http://localhost:3001/api/cattle', input)
        .then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1000)
          return alert('Animal agregado')
        })
        .catch(err => {
          if (err.response.data.message) return alert(err.response.data.message)
          alert('Error al agregar el animal')
        })
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
          <h4 className={styles.modalTitle}>Agregar nuevo Animal</h4>
        </div>
        <div className={styles.modalBody}>
          <form>
            <div className={styles.inputGroup}>
              <input
                autoComplete='off'
                type='text'
                placeholder='ID Senasa'
                name='idSenasa'
                className={styles.input}
                maxLength='16'
                required
                onChange={handleOnChange}
              />
              <span className={styles.borderBottom}>{error.idSenasa && <span className={styles.error}>{error.idSenasa}</span>}</span>
            </div>
            <div className={styles.inputGroup}>
              <select
                type='number'
                defaultValue={''}
                placeholder='Tipo de animal'
                name='animalType'
                className={styles.input}
                required
                onChange={handleOnChange}>
                <option value='' disabled>
                  Seleccione tipo de animal
                </option>
                <option value='novillo'>Novillo</option>
                <option value='toro'>Toro</option>
                <option value='vaquillona'>Vaquillona</option>
              </select>
              <span className={styles.borderBottom}>{error.animalType && <span className={styles.error}>{error.animalType}</span>}</span>
            </div>
            <div className={styles.inputGroup}>
              <input
                autoComplete='off'
                type='number'
                placeholder='Peso del Animal en kg'
                name='weight'
                className={styles.input}
                required
                onChange={handleOnChange}
              />
              <span className={styles.borderBottom}>{error.weight && <span className={styles.error}>{error.weight}</span>}</span>
            </div>
            <div className={styles.inputGroup}>
              <input
                autoComplete='off'
                type='text'
                placeholder='Nombre de potrero'
                name='name'
                className={styles.input}
                required
                onChange={handleOnChange}
              />
              <span className={styles.borderBottom}>{error.name && <span className={styles.error}>{error.name}</span>}</span>
            </div>
            <div className={styles.inputGroup}>
              <select defaultValue={''} type='text' placeholder='Tipo de dispositivo' name='device' className={styles.input} required onChange={handleOnChange}>
                <option value='' disabled>
                  Seleccione tipo de dispositivo
                </option>
                <option value='caravana'>Caravana</option>
                <option value='collar'>Collar</option>
              </select>
              <span className={styles.borderBottom}>{error.device && <span className={styles.error}>{error.device}</span>}</span>
            </div>
            <div className={styles.inputGroup}>
              <input
                autoComplete='off'
                type='text'
                placeholder='Número de dispositivo'
                name='deviceNumber'
                className={styles.input}
                required
                maxLength='8'
                onChange={handleOnChange}
              />
              <span className={styles.borderBottom}>{error.deviceNumber && <span className={styles.error}>{error.deviceNumber}</span>}</span>
            </div>
          </form>
        </div>
        <div className={styles.modalFooter}>
          {input.idSenasa.length > 1 && !error.idSenasa && !error.animalType && !error.weight && !error.potrero && !error.device && !error.deviceNumber ? (
            <button className={styles.modalSendButton} onClick={handleSubmit}>
              Enviar
            </button>
          ) : (
            <p>Por favor llene todos los campos para poder enviar el formulario</p>
          )}
          <button className={styles.modalCloseButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddForm
