import React from 'react';

const ComingSoonPage: React.FC = () => {
  return (
    <div className="coming-soon-root">
      <div className="coming-soon-frame">
        <div className="coming-soon-image-section">
          <img
            src="https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&w=400&h=600&fit=crop"
            alt="Book Cover"
            className="coming-soon-book-image"
          />
        </div>
        <div className="coming-soon-content">
          <nav className="coming-soon-nav">
            <span className="coming-soon-nav-item">the auction</span>
            <span className="coming-soon-nav-item">history</span>
            <span className="coming-soon-nav-item">about</span>
          </nav>
          <h1 className="coming-soon-title">Artifice, Ruse and Subterfuge</h1>
          <p className="coming-soon-description">
            A piece of history among card mechanics and those practicing the art of deception.<br />
            Only a handful of first editions are known to exist.<br />
            Be one of the few who will own a copy.
          </p>
          <form className="coming-soon-signup">
            <input
              type="email"
              placeholder="your.name@email.com"
              className="coming-soon-input"
              required
            />
            <button type="submit" className="coming-soon-signup-btn">sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;

// CSS will be added in index.css for layout, fonts, and border. 