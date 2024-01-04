import { IconClose } from "@/components/icon";
import React, { useEffect, useRef, useState } from "react";
import { Portal } from "react-portal";

const ModalData = ({
  onRequestClose,
  modalBody,
  modalTitle,
  bodyClassName,
}) => {
  const toggler = useRef();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        onRequestClose();
      }
      if (toggler.current && !toggler.current.contains(event.target)) {
        onRequestClose();
      }
    }
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", onKeyDown);

    return () => {
      document.body.style.overflow = "visible";
      document.addEventListener("mousedown", onKeyDown);
    };
  }, []);

  return (
    <Portal>
      <div className="modal-backdrop">
        <div ref={toggler} className="modal-container">
          <div className={`modal-body ${bodyClassName}`}>
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-20  font-700 leading-6 dark:text-white text-black mb-4">
                {modalTitle}
              </h2>
              <IconClose
                onClick={() => onRequestClose()}
                className="w-5 h-5 cursor-pointer dark:text-white close-icon"
              />
            </div>
            {modalBody}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export const Modal = ({
  title,
  modalContent,
  modalButton,
  className = "",
  bodyClassName = "",
}) => {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };
  return (
    <>
      {isModalOpen && (
        <ModalData
          bodyClassName={bodyClassName}
          modalTitle={title}
          modalBody={modalContent}
          onRequestClose={toggleModal}
        />
      )}
      <div className={className} onClick={toggleModal}>
        {modalButton}
      </div>
    </>
  );
};
