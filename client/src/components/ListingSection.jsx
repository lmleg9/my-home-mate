import { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import Homes from "./Homes";
import { getHomes } from "../api";
import MapView from "./MapView";
import ErrorBoundary from "./ErrorBoundary";

function ListingSection() {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [view, setView] = useState("list"); // State to toggle between 'list' and 'map'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomes();

        // Filter out invalid homes
        const validHomes = data.filter((home) => home.latitude && home.longitude);
        setHomes(validHomes);
        setFilteredHomes(validHomes); // Initialize filteredHomes with valid homes
      } catch (error) {
        console.error("Error fetching homes:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filters) => {
    const { price, rooms, size } = filters;

    const filtered = homes.filter((home) => {
      return (
        (!price || home.price <= price) &&
        (!rooms || home.rooms === parseInt(rooms)) &&
        (!size || home.size >= parseInt(size))
      );
    });

    setFilteredHomes(filtered);
  };

  return (
    <>
      <FilterSection onFilterChange={handleFilterChange} />
      <div className="container my-4">
        {/* Toggle Buttons */}
        <div className="d-flex justify-content-center mb-3">
          <button
            className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"} me-2`}
            onClick={() => setView("list")}
          >
            List View
          </button>
          <button
            className={`btn ${view === "map" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("map")}
          >
            Map View
          </button>
        </div>

        {/* Conditionally Render List or Map */}
        {view === "list" ? (
          <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
              <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <Homes homes={filteredHomes} />
              </div>
            </div>
          </section>
        ) : (
            <ErrorBoundary>
              <MapView homes={filteredHomes} />
            </ErrorBoundary>
        )}
      </div>
    </>
  );
}

export default ListingSection;
