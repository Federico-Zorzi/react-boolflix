import { useState } from "react";

import FilterSelect from "./FilterSelect";
import SearchBar from "./SearchBar";

export default function Filters() {
  //* inizialization form data
  const defaultFormData = {
    title: "",
    genre: "",
  };

  //* manage form data
  const handleFormData = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setformData({ ...formData, [e.target.name]: value });
  };

  const [formData, setformData] = useState(defaultFormData);

  return (
    <>
      <div className="d-flex">
        <FilterSelect
          formData={formData}
          handleFormData={handleFormData}
        ></FilterSelect>
        <SearchBar
          formData={formData}
          handleFormData={handleFormData}
        ></SearchBar>
      </div>
    </>
  );
}
