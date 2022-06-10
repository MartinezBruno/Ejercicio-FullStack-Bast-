import React, { useState } from 'react'
import ModalDelete from '../DeleteModal/ModalDelete'
import EditForm from '../EditForm/EditForm'
import styles from './List.module.css'

const List = ({ cattle }) => {
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [modalData, setModalData] = useState(null)

  const handleOnClick = data => {
    setModalData(data)
    setShow(true)
  }
  const handleOnClick2 = data => {
    setModalData(data)
    setShow2(true)
  }
  const handleOnClose = () => {
    setShow(false)
  }
  const handleOnClose2 = () => {
    setShow2(false)
  }
  return (
    <div>
      {cattle.length >= 1 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Senasa</th>
              <th>Tipo de animal</th>
              <th>Peso</th>
              <th>Nombre de potrero</th>
              <th>Dispositivo</th>
              <th>Numero de Dispositivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cattle.map(animal => (
              <tr key={animal.id}>
                <td>{animal.idSenasa}</td>
                <td>{animal.animalType.charAt(0).toUpperCase() + animal.animalType.slice(1)}</td>
                <td>{animal.weight}kg</td>
                <td>{animal.name}</td>
                <td>{animal.device.charAt(0).toUpperCase() + animal.device.slice(1)}</td>
                <td>{animal.deviceNumber}</td>
                <td>
                  <button className={styles.actionButton} onClick={() => handleOnClick(animal)}>
                    Edit
                  </button>
                  {modalData && <EditForm show={show} onClose={handleOnClose} cattle={modalData} />}
                  <button className={styles.actionDeleteButton} onClick={() => handleOnClick2(animal)}>
                    Delete
                  </button>
                  {modalData && <ModalDelete show={show2} onClose={handleOnClose2} cattle={modalData} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No hay ganado</h2>
      )}
    </div>
  )
}

export default List
