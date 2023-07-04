import React from "react";
import Logo from "../assets/Diamond-logo-cropped.png";
import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";
import ModalOptions from "./ModalOptions";

function Nav() {
  return (
    <nav>
      <div className="container">
        <ModalOptions />
        <ul className="nav__links">
          <Link to="/">
            <li className="nav__list nav__list--home">Home</li>
          </Link>
          <Link to="/search">
            <li className="nav__list">Search</li>
          </Link>
          <Link to="#">
            <li className="nav__list--btn">Contact</li>
          </Link>
        </ul>
          <div className="img__wrapper">
            <img src={Logo} className="logo--img" />
          </div>
          <div className="social__icons--wrapper">
          <SocialIcon className="social__icon" network="twitter" bgColor="#eba75d" fgColor="white" />
          <SocialIcon className="social__icon" network="instagram" bgColor="#eba75d" fgColor="white" />
          <SocialIcon className="social__icon facebook" network="facebook" bgColor="#eba75d" fgColor="white" />
          </div>
      </div>
    </nav>
  );
}

export default Nav;
