import React, { useState } from 'react'
import styles from './EditForm.module.css'
import axios from 'axios'

const EditForm = ({ show, onClose, cattle }) => {
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
            Editar Información<span className={styles.info}>Los campos sin completar no seran cambiados</span>
          </h4>
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
              <span className={styles.borderBottom}></span>
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
              <span className={styles.borderBottom}></span>
            </div>
            <div className={styles.inputGroup}>
              <input
                autoComplete='off'
                type='text'
                placeholder='Nombre de potrero'
                maxLength='200'
                name='potrero'
                className={styles.input}
                required
                onChange={handleOnChange}
              />
              <span className={styles.borderBottom}>{error.potrero && <span className={styles.error}>{error.potrero}</span>}</span>
            </div>
            <div className={styles.inputGroup}>
              <select defaultValue={''} type='text' placeholder='Tipo de dispositivo' name='device' className={styles.input} required onChange={handleOnChange}>
                <option value='' disabled>
                  Seleccione tipo de dispositivo
                </option>
                <option value='caravana'>Caravana</option>
                <option value='collar'>Collar</option>
              </select>
              <span className={styles.borderBottom}></span>
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
          {input.idSenasa.length > 1 && !error.idSenasa && !error.potrero && !error.deviceNumber ? (
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

export default EditForm
