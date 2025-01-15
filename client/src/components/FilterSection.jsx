import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getHomes } from "../api";

function FilterSection({ onFilterChange }) {
  const [filters, setFilters] = useState({
    price: "",
    rooms: "",
    size: "",
    province: "",
  });

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getHomes();
        const uniqueProvinces = [...new Set(data.map((home) => home.province))];

        setProvinces(uniqueProvinces);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

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
        </div>
        <div className="filter-controls text-white">
          {/* Province Filter (First Line) */}
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="province" className="form-label">Province</label>
              <select
                id="province"
                name="province"
                value={filters.province}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">All Provinces</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Other Filters (Second Line) */}
          <div className="row g-3 mt-3">
            <div className="col-md-4">
              <label htmlFor="price" className="form-label">Max Price (€)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={filters.price}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g., 500"
                min="0" // Prevent negative values
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
                min="0" // Prevent negative values
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
                min="0" // Prevent negative values
              />
            </div>
          </div>

          {/* Apply Filters Button */}
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
