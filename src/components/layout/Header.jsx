import Filters from "../header/Filters";

export default function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="main-title fs-1">BOOLFLIX</div>
          <Filters />
        </div>
      </nav>
    </header>
  );
}
