type NavbarProps = {
  onStartAssessment: () => void;
};

function Navbar({ onStartAssessment }: NavbarProps) {
  return (
    <nav className="navbar">
      <h2>CyberScore</h2>

      <button
        className="nav-button"
        onClick={onStartAssessment}
      >
        Start Assessment
      </button>
    </nav>
  );
}

export default Navbar;