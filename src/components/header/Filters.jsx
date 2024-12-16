import { useState } from "react";
import { useEntertainmentContext } from "../../context/EntertainmentContext";

export default function Filters() {
  //* inizialization form data
  const defaultFormData = {
    title: "",
  };

  const [formData, setformData] = useState(defaultFormData);

  //* manage form data
  const handleFormData = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setformData({ ...formData, [e.target.name]: value });
  };

  //* use context variables
  const { search } = useEntertainmentContext();

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <nav className="navbar-brand fs-2">BOOLFLIX</nav>
        <form
          onSubmit={(e) => search(e, formData)}
          className="d-flex"
          role="search"
        >
          <input
            name="title"
            onChange={handleFormData}
            value={formData.title}
            className="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
