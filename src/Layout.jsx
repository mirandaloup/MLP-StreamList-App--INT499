import { NavLink, Outlet } from "react-router-dom";
import logo from './logo.svg';


//week 4 AI suggested updates: logo wrapped to link to home, navlinks updated 
// to visually show where you are at
export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" end className="logoLink">
        <img src={logo} alt="StreamList logo" className="logo" />
        </NavLink>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            StreamList
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
            Movies
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
            Cart
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </nav>

        <hr className="divider" />
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}