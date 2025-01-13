import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function Homes({ homes }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);

  const handleOpenModal = (home) => {
    setSelectedHome(home);
    setShowModal(true);
  };

  const handleCloseModal = () => {  
    setShowModal(false);
    setSelectedHome(null);
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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        {selectedHome && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedHome.address}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedHome.thumbnail}
                alt={selectedHome.address}
                className="img-fluid mb-3"
              />
              <p>
                <strong>Price:</strong> {selectedHome.price} €/month
              </p>
              <p>
                <strong>Size:</strong> {selectedHome.size} m²
              </p>
              <p>
                <strong>Bed:</strong> {selectedHome.rooms}
              </p>
              <p>
                <strong>Description:</strong> {selectedHome.description}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
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
