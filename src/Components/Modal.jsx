

export const Modal = ({ title, onClose, children }) => {
  return (
    <div className={'modal'}>
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__content">
        <div className="modal__content__title__container">
          <p className="modal__content__title">{ title }</p>
          <p className="modal__content__close" onClick={onClose}><i className="fa-regular fa-xmark"></i></p>
        </div>

        <div className="modal__content__content">

          { children }

        </div>

      </div>
    </div>
  )
}