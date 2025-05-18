import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [modalName, setModalName] = useState(null)
  const [modalProps, setModalProps] = useState({})

  const openModal = (name, props = {}) => {
    setModalName(name)
    setModalProps(props)
  }

  const closeModal = () => {
    setModalName(null)
    setModalProps({})
  }

  return (
    <ModalContext.Provider value={{ modalName, modalProps, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
