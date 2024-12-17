import { useEntertainmentContext } from "../../context/EntertainmentContext";

export default function SearchBar({ handleFormData, formData }) {
  //* use context variables
  const { search } = useEntertainmentContext();

  return (
    <form
      onSubmit={(e) => search(e, formData)}
      className="d-flex"
      role="search"
    >
      <input
        name="title"
        onChange={handleFormData}
        value={formData.title}
        className="form-control"
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />
      <button className="btn btn-outline-secondary" type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}
