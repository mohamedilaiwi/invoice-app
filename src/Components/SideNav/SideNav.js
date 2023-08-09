import "./SideNav.css";
import { useEffect, useState } from "react";

import logo from "../../images/assets/logo.svg";
import moon from "../../images/assets/icon-moon.svg";
import sun from "../../images/assets/icon-sun.svg";
import avatar from "../../images/assets/image-avatar.jpg";

const SideNav = () => {
  const [theme, setTheme] = useState({ isLight: true, isDark: false });


  const handleThemeChange = () => {
    setTheme({
      isLight: !theme.isLight,
      isDark: !theme.isDark,
    });
  };

  return (
    <div className="side-nav">
      <div className='side-nav_logo-wrapper'>
        <img className="side-nav__logo" src={logo} alt="logo"></img>
      </div>
      <button className='side-nav__theme-button'>
        <img
          className="side-nav__theme-button"
          src={theme.isLight ? moon : sun}
          alt="theme button"
          onClick={handleThemeChange}
        ></img>
      </button>

      <div className="side-nav__theme-seperator"></div>
      <button className='side-nav__avatar-wrapper'>
        <img className="side-nav__avatar" src={avatar} alt="avatar"></img>
      </button>
    </div>
  );
};
export default SideNav;