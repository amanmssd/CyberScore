type HeroProps = {
  onStartAssessment: () => void;
};

function Hero({ onStartAssessment }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Know Your Cybersecurity Score.</h1>

        <p>
          Discover weaknesses in your online security and receive personalized
          recommendations to better protect your digital life.
        </p>

        <button
          className="primary-btn"
          onClick={onStartAssessment}
        >
          Take Assessment
        </button>
      </div>

      <div className="score-card">
        <h3>Example CyberScore</h3>

        <div className="circle">
          72
        </div>

        <p className="risk">
          Moderate Risk
        </p>

        <ul>
          <li>✔ Enable MFA</li>
          <li>✔ Update Devices</li>
          <li>✔ Use Unique Passwords</li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;