import React from 'react'

const Modal = ({openModal, setIsOpenModal, title, children}) => {
  return (
    <>
      {openModal && (
        <dialog id='my_modal_3' className='modal modal-open'>
          <div className='modal-box'>
            <form method='dialog'>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2' onClick={setIsOpenModal}>
                ✕
              </button>
            </form>
            <h3 className='font-semibold uppercase'>{title}</h3>
            {children}
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal