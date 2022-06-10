import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './App.module.css'
import AddForm from './components/AddForm/AddForm'
import List from './components/List/List'
import NavBar from './components/NavBar/NavBar'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  const [show, setShow] = useState(false)
  const [cattle, setCattle] = useState([])

  const handleOnClick = () => {
    setShow(true)
  }
  const handleOnClose = () => {
    setShow(false)
  }

  const handleAddData = input => {
    if (input) {
      axios.get(`http://localhost:3001/api/cattle?name=${input}`).then(res => {
        console.log(res.data)
        setCattle(res.data)
      })
    } else {
      axios
        .get('http://localhost:3001/api/cattle')
        .then(res => {
          setCattle(res.data)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  }

  // const handleSetCattle = input => {
  //   axios.get(`http://localhost:3001/api/cattle?name=${input}`).then(res => {
  //     console.log(res.data)
  //     setCattle(res.data)
  //   })
  // }

  useEffect(() => {
    handleAddData()
  }, [])
  return (
    <div className={styles.App}>
      <NavBar />
      <div>
        <header className={styles.header}>
          <h5 className={styles.route}>Admin/List</h5>
          <h3 className={styles.title}>Lista de Ganado</h3>
          <button className={styles.addButton} onClick={handleOnClick}>
            Añadir nuevo
          </button>
          <AddForm onClose={handleOnClose} show={show} />
          <SearchBar handleSetCattle={handleAddData} />
        </header>
        <div className={styles.list}>
          <List cattle={cattle} />
        </div>
      </div>
    </div>
  )
}

export default App
