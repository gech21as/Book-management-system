import React from 'react';
import './About.css';

export function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Heritage Archive</h1>
        <div className="about-content">
          <p className="about-description">
            Heritage Archive is a digital preservation platform
            dedicated to making historical, cultural, and
            educational materials freely accessible worldwide.
          </p>
          <p className="about-description">
            Our mission is to preserve fragile manuscripts, ancient texts, and rare documents
            by converting them into secure digital formats, ensuring these invaluable materials
            remain accessible to future generations.
          </p>
          <h2 className="about-subtitle">Our Approach</h2>
          <p className="about-description">
            We work with cultural institutions, libraries, and archives worldwide to digitize
            their collections using advanced imaging technology. Each document is carefully
            scanned, cataloged, and stored with comprehensive metadata.
          </p>
          <h2 className="about-subtitle">Global Impact</h2>
          <p className="about-description">
            With materials from 150+ institutions across 45+ countries, we're creating a
            global digital library that promotes cultural exchange and supports scholarly research.
          </p>
          <h2 className="about-subtitle">Community Participation</h2>
          <p className="about-description">
            We encourage community involvement through our book suggestion system. If you know
            of valuable heritage or educational materials that should be digitized, please
            submit your suggestions through our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
