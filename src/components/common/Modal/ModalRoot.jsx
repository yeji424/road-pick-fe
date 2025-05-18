import { useModal } from '@/hooks/useModal'
import RegisterModal from './RegisterModal'
import LogoutModal from './LogoutModal'
import DeleteModal from './DeleteModal'

export default function ModalRoot() {
  const { modalName, modalProps, closeModal } = useModal()

  if (!modalName) return null

  switch (modalName) {
    case 'registerComplete':
      return <RegisterModal onClose={closeModal} {...modalProps} />
    case 'logout':
      return <LogoutModal onClose={closeModal} {...modalProps} />
    case 'delete':
      return <DeleteModal onClose={closeModal} {...modalProps} />
    default:
      return null
  }
}
