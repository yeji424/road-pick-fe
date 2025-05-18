import { useModal } from '@/hooks/useModal'
import RegisterModal from './RegisterModal'
import LogoutModal from './LogoutModal'
import DeleteModal from './DeleteModal'
import PlanModal from './PlanModal'

const MODAL_COMPONENTS = {
  registerComplete: RegisterModal,
  logout: LogoutModal,
  delete: DeleteModal,
  plan: PlanModal,
}

export default function ModalRoot() {
  const { modalName, modalProps, closeModal } = useModal()
  if (!modalName) return null

  const ModalComponent = MODAL_COMPONENTS[modalName]
  if (!ModalComponent) return null

  return <ModalComponent onClose={closeModal} {...modalProps} />
}
