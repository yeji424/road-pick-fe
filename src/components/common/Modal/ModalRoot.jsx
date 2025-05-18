import { useModal } from '@/hooks/useModal'
import RegisterModal from './RegisterModal'

export default function ModalRoot() {
  const { modalName, modalProps, closeModal } = useModal()

  if (!modalName) return null

  switch (modalName) {
    case 'registerComplete':
      return <RegisterModal onClose={closeModal} {...modalProps} />
    // case "other":
    //   return <OtherModal onClose={closeModal} {...modalProps} />;
    default:
      return null
  }
}
