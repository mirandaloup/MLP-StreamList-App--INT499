import { NavLink, Outlet } from "react-router-dom";
import logo from './logo.svg';

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <img src={logo} alt="StreamList logo" className="logo" />

        <nav className="nav">
          <NavLink to="/" end>StreamList</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <hr className="divider" />
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}