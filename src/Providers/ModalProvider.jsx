import React, { createContext, useState, useCallback, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const openModal = useCallback((Component, props = {}) => {
    const id = Math.random().toString(36).substr(2, 9);
    setModals((prev) => [...prev, { id, Component, props }]);
    return id;
  }, []);

  const closeModal = useCallback((id) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const closeLastModal = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <div className="modal-overlay" onClick={closeLastModal}>
        {modals.map(({ id, Component, props }) => (
          <div
            key={id}
            className="modal-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <Component
              {...props}
              onClose={() => closeModal(id)}
              modalId={id}
            />
          </div>
        ))}
      </div>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal должен использоваться внутри ModalProvider');
  }
  return context;
};