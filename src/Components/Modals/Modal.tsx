import './Modal.css';

function Modal({children, closeModal}: { children: React.ReactNode, closeModal: any }) {
  return (
    <div className="modal" onClick={closeModal}>
        <div onClick={((e) => e.stopPropagation())} className="modal-content">
            <div className="modal-close" onClick={closeModal}>&times;</div>
            {children}
        </div>
    </div>
  )
}

export default Modal