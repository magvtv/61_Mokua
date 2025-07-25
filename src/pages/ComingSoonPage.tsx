import React, { useState, useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';

// Development flag - change to false for production
const IS_DEVELOPMENT = false;

interface ComingSoonContent {
  date: string;
  navigation: Array<{ id: string; label: string; url?: string }>;
  header: {
    title: string;
    subtitle: string;
  };
  content: {
    mainText: string;
    highlights: string[];
  };
  form: {
    placeholder: string;
    buttonText: string;
    successMessage: string;
    errorMessage: string;
  };
  image: {
    src: string;
    alt: string;
  };
}

const ComingSoonPage: React.FC = () => {
  const [content, setContent] = useState<ComingSoonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [fontClass, setFontClass] = useState('font-hina-mincho');
  const { addNotification } = useAppStore();

  // Format date as YYYY.MM
  const formattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}.${month}`;
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/content/web-content.json');
        if (!response.ok) throw new Error('Failed to load content');
        const data = await response.json();
        setContent(data.comingSoon);
        setLoading(false);
      } catch (err) {
        setError('Failed to load page content');
        setLoading(false);
      }
    };

    fetchContent();

    // Apply the font class to the root element
    document.documentElement.className = fontClass;
  }, [fontClass]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      addNotification({
        type: 'success',
        message: content.form.successMessage
      });
      setEmail('');
    } catch (err) {
      addNotification({
        type: 'error',
        message: content.form.errorMessage
      });
    }
  };

  // Font switcher function
  const switchFont = (fontName: string) => {
    setFontClass(`font-${fontName}`);
  };

  if (loading) {
    return (
      <div className="coming-soon-root">
        <div className="coming-soon-loading">Loading...</div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="coming-soon-root">
        <div className="coming-soon-error">{error}</div>
      </div>
    );
  }

  return (
    <div className={`coming-soon-root ${fontClass}`}>
      {/* Date inside border, above frame */}
      <div className="coming-soon-date" data-testid="coming-soon-date">
        {formattedDate()}
      </div>
      <div className="coming-soon-frame flex flex-col gap-8 w-full max-w-5xl lg:flex-row lg:gap-16 lg:items-center">
        {/* Book image */}
        <div className="coming-soon-image-section flex justify-center w-full lg:w-[45%]">
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="coming-soon-book-image"
            onError={(e) => {
              e.currentTarget.src = 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&w=400&h=600&fit=crop';
            }}
          />
        </div>
        {/* Content */}
        <div className="coming-soon-content w-full lg:w-[55%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-4 lg:pr-8">
          <nav className="coming-soon-nav flex gap-8 mb-8 self-end lg:self-auto">
            {content.navigation.map((item) => (
              <a
                key={item.id}
                href={item.url || '#'}
                className="coming-soon-nav-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <h1 className="coming-soon-title mb-2">{content.header.title}</h1>
          <h2 className="coming-soon-subtitle mb-6">{content.header.subtitle}</h2>
          <p className="coming-soon-description mb-8">
            {content.content.mainText}<br /><br />
            {content.content.highlights.map((highlight, index) => (
              <React.Fragment key={index}>
                {highlight}<br />{index < content.content.highlights.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <form className="coming-soon-signup flex flex-col sm:flex-row gap-2 w-full max-w-md" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={content.form.placeholder}
              className="coming-soon-input flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="coming-soon-signup-btn uppercase">
              {content.form.buttonText}
            </button>
          </form>
          {/* Font switcher for development */}
          {IS_DEVELOPMENT && (
            <div className="mt-6 flex gap-2 justify-center">
              <button onClick={() => switchFont('eb-garamond')} className="px-2 py-1 text-xs border">EB Garamond</button>
              <button onClick={() => switchFont('hina-mincho')} className="px-2 py-1 text-xs border">Hina Mincho</button>
              <button onClick={() => switchFont('baskervville')} className="px-2 py-1 text-xs border">Baskervville</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage; 