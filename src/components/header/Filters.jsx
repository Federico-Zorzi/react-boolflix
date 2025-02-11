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

    setFormData({ ...formData, [e.target.name]: value });
  };

  const [formData, setFormData] = useState(defaultFormData);

  return (
    <>
      <div className="d-flex">
        <FilterSelect
          formData={formData}
          setFormData={setFormData}
          handleFormData={handleFormData}
        ></FilterSelect>
        <SearchBar
          formData={formData}
          setFormData={setFormData}
          handleFormData={handleFormData}
        ></SearchBar>
      </div>
    </>
  );
}
