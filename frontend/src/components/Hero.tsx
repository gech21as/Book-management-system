import { Button } from "./ui/button";
import { BookOpen, Globe, Users, Star, ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import './Hero.css';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  return (
    <div className="relative">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">

            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-badge">
                <p className="hero-badge-text">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  100% Free Digital Access to Heritage & Educational Books
                </p>
              </div>

              <h1 className="hero-title">
                Explore the World's Knowledge — Absolutely Free
              </h1>

              <p className="hero-description">
                Access rare manuscripts, ancient texts, and educational materials
                from libraries, monasteries, and archives worldwide. 
                No fees, no limits, no barriers to learning.
              </p>

              <div className="hero-buttons">
                <button onClick={onExploreClick} className="hero-primary-btn">
                  <BookOpen className="w-5 h-5" />
                  Browse Collection
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button onClick={onExploreClick} className="hero-secondary-btn">
                  Start Reading Now
                </button>
              </div>

              <div className="hero-stats">
                <div className="hero-stat-item">
                  <span className="hero-stat-number">10+</span>
                  <span className="hero-stat-label">Free Books</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">5+</span>
                  <span className="hero-stat-label">Institutions</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">3+</span>
                  <span className="hero-stat-label">Languages</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hero-image-section">
              <div className="hero-image-wrapper">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1722605165802-ce803e7af8f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Ancient library with historical books"
                  className="hero-image"
                />
              </div>

              {/* Floating Card */}
              <div className="hero-floating-card">
                <div className="hero-floating-content">
                  <div className="hero-floating-icon-wrapper">
                    <BookOpen className="hero-floating-icon" />
                  </div>
                  <div className="hero-floating-text">
                    <p className="hero-floating-title">100% Free Access</p>
                    <p className="text-xs text-muted-foreground">
                      only registration needed
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Why Choose Heritage Archive?
            </h2>
            <p className="features-description">
              Our platform combines digital preservation with free, open access
              to make valuable cultural and educational materials available to everyone.
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: <BookOpen className="feature-icon" />,
                title: "100% Free Access",
                desc: "All books are freely accessible to everyone without any restrictions.",
              },
              {
                icon: <Star className="feature-icon" />,
                title: "Community Ratings",
                desc: "Rate and review books to help others discover valuable materials.",
              },
              {
                icon: <Users className="feature-icon" />,
                title: "Suggest Books",
                desc: "Help expand our collection by suggesting books to add.",
              },
              {
                icon: <Globe className="feature-icon" />,
                title: "Global Accessibility",
                desc: "Access rare manuscripts from anywhere in the world.",
              },
            ].map((item, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {item.icon}
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-description">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Start Exploring Today</h2>
            <p className="cta-description">
              Join thousands of readers, researchers, and students who are already 
              discovering rare books and expanding their knowledge through our free platform.
            </p>

            <div className="cta-buttons">
              <button onClick={onExploreClick} className="hero-primary-btn">
                Browse Free Collection
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={onExploreClick} className="hero-secondary-btn">
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
