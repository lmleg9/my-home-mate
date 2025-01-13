import { useState } from "react";
import PropTypes from "prop-types";

function FilterSection({ onFilterChange }) {
  const [filters, setFilters] = useState({
    price: "",
    rooms: "",
    size: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <header className="filter-section bg-dark py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white mb-4">
          <h4 className="display-4 fw-bolder">Where your dream home meets the perfect people</h4>
          {/*<p className="lead">Find the perfect home with your preferred criteria</p>*/}
        </div>
        <div className="filter-controls text-white">
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="price" className="form-label">Max Price (€)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={filters.price}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g., 1000"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="rooms" className="form-label">Min Rooms</label>
              <input
                type="number"
                id="rooms"
                name="rooms"
                value={filters.rooms}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g., 2"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="size" className="form-label">Min Size (m²)</label>
              <input
                type="number"
                id="size"
                name="size"
                value={filters.size}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g., 50"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-light"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

FilterSection.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterSection;
