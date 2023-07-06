import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FaBars, FaRegWindowClose, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      <Modal
        className="modal__container"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal">
          <Button className="btn__close" onClick={handleClose}>
            <FaRegWindowClose className="close__icon" />
          </Button>
          <Link to="/" className="modal-title">
            <h2>HOME</h2>
          </Link>
          <Link to="/search" className="modal-title">
            <h2>SEARCH</h2>
          </Link>
          <Link to="#" className="modal-title">
            <h2>CONTACT</h2>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default ModalOptions;
