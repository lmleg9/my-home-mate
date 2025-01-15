function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5 d-flex align-items-center">
        {/* Hamburger menu to the left */}
        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo */}
        <a className="logo navbar-brand" href="/home">MyHomeMate</a>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="ms-auto d-flex align-items-center">
            {/* Favorite List Button */}
            <a className="btn btn-outline-secondary me-2" href="/favorites">
              Favorite List
            </a>

            {/* Log In Button */}
            <a className="btn btn-outline-primary" href="/login">
              Log In
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
