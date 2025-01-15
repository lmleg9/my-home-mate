import { useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { getFlatmatesForHome } from "../userApi"; // API function to fetch flatmates

function Homes({ homes }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);
  const [flatmates, setFlatmates] = useState([]); // State to store flatmates
  const [isLoadingFlatmates, setIsLoadingFlatmates] = useState(false); // Loading state

  const handleOpenModal = async (home) => {
    setSelectedHome(home);
    setShowModal(true);
    setIsLoadingFlatmates(true); // Show loading indicator

    try {
      const flatmates = await getFlatmatesForHome(home._id); // Fetch flatmates
      setFlatmates(flatmates);
    } catch (error) {
      console.error("Error fetching flatmates:", error);
      setFlatmates([]); // Ensure state is cleared if an error occurs
    } finally {
      setIsLoadingFlatmates(false); // Hide loading indicator
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHome(null);
    setFlatmates([]); // Clear flatmates
  };

  return (
    <>
      {homes.map((home) => (
        <div className="col mb-5" key={home._id}>
          <div className="card h-100">
            <img className="card-img-top" src={home.thumbnail} alt={home.address} />
            <div className="card-body p-4">
              <div className="text-center">
                <h5 className="fw-bolder">{home.address}</h5>
                {home.price} €/month <br />
                {home.size} m² <br />
                {home.rooms} bed.
              </div>
            </div>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center">
                <button
                  className="btn btn-outline-dark mt-auto"
                  onClick={() => handleOpenModal(home)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal} centered className="custom-modal">
        {selectedHome && (
          <>
            <div className="custom-modal-header">
              <button className="close-btn" onClick={handleCloseModal}>&times;</button>
            </div>
            <Modal.Body className="custom-modal-body">
              <div className="custom-modal-image">
                <img src={selectedHome.thumbnail} alt={selectedHome.address} />
              </div>
              <div className="custom-modal-info">
                <h5>{selectedHome.address}</h5>
                <div className="property-details">
                  <p><strong>{selectedHome.price} €/month</strong></p>
                  <p><strong>{selectedHome.rooms} bed</strong></p>
                  <p><strong>{selectedHome.size} m²</strong></p>
                </div>
                <div className="description-wrapper">
                  <p className="description">
                    <strong>Description:</strong> {selectedHome.description}
                  </p>
                </div>
                <hr />
                <h5>Potential Flatmates</h5>
                {isLoadingFlatmates ? (
                  <p>Loading flatmates...</p>
                ) : flatmates.length > 0 ? (
                  <ul>
                    {flatmates.map((mate) => (
                      <li key={mate._id}>
                        {mate.name} ({mate.age} years old, {mate.occupation})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No matching flatmates found.</p>
                )}
                <div className="actions">
                  <button className="contact-btn">Contact</button>
                  <button className="favorite-btn">Add to Favorites</button>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}

Homes.propTypes = {
  homes: PropTypes.array.isRequired,
};

export default Homes;
