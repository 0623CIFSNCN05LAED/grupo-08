import "./Header.css";
import logo from "../assets/images/logo/kairos-logo-un-color-beige.png";

export default function Header() {
  return (
    <div className='header'>
        <img src={logo} alt='logo' className='logo' />
    </div>
  );
}
