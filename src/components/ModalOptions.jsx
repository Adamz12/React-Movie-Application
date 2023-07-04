import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FaBars, FaRegWindowClose, FaWindowClose } from "react-icons/fa";

const ModalOptions = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="modal__overall">
      <Button onClick={handleOpen}>
        <FaBars className="bars__menu" />
      </Button>
      <Modal className="modal__container"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal">
          <Button className="btn__close" onClick={handleClose}><FaRegWindowClose className="close__icon" /></Button>
          <h2 id="modal-title">HOME</h2>
          <h2 id="modal-title">SEARCH</h2>
          <h2 id="modal-title">CONTACT</h2>
        </div>
      </Modal>
    </div>
  );
};

export default ModalOptions;
