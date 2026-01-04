'use client';

import { useState } from 'react';
import './design-system.css';

export default function DesignSystemShowcase() {
  const [hearts, setHearts] = useState(3);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setDiceRoll(null);

    // Simulate rolling animation
    let count = 0;
    const interval = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setDiceRoll(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <div className="showcase">
      <div className="showcase-container">
        {/* Header */}
        <header className="showcase-header">
          <h1 className="heading-hero">Tiny Heroes Design System</h1>
          <p className="text-large">
            A magical, storybook-inspired design for young adventurers ✨
          </p>
        </header>

        {/* Colors Section */}
        <section className="showcase-section">
          <h2 className="heading-xl">Color Palette</h2>
          <div className="color-grid">
            <div className="color-card">
              <div
                className="color-swatch"
                style={{ background: '#F5E6D3' }}
              ></div>
              <div className="color-info">
                <span className="color-name">Parchment</span>
                <span className="color-hex">#F5E6D3</span>
              </div>
            </div>
            <div className="color-card">
              <div
                className="color-swatch"
                style={{ background: '#E63946' }}
              ></div>
              <div className="color-info">
                <span className="color-name">Adventure Red</span>
                <span className="color-hex">#E63946</span>
              </div>
            </div>
            <div className="color-card">
              <div
                className="color-swatch"
                style={{ background: '#457B9D' }}
              ></div>
              <div className="color-info">
                <span className="color-name">Adventure Blue</span>
                <span className="color-hex">#457B9D</span>
              </div>
            </div>
            <div className="color-card">
              <div
                className="color-swatch"
                style={{ background: '#06A77D' }}
              ></div>
              <div className="color-info">
                <span className="color-name">Adventure Green</span>
                <span className="color-hex">#06A77D</span>
              </div>
            </div>
            <div className="color-card">
              <div
                className="color-swatch"
                style={{ background: '#FFB703' }}
              ></div>
              <div className="color-info">
                <span className="color-name">Adventure Yellow</span>
                <span className="color-hex">#FFB703</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="showcase-section">
          <h2 className="heading-xl">Typography</h2>
          <div className="typo-stack">
            <div className="typo-sample">
              <h1 className="heading-hero">Hero Heading</h1>
              <span className="typo-meta">Fredoka • 64px • Bold</span>
            </div>
            <div className="typo-sample">
              <h2 className="heading-2xl">Large Heading</h2>
              <span className="typo-meta">Fredoka • 48px • Bold</span>
            </div>
            <div className="typo-sample">
              <h3 className="heading-xl">Medium Heading</h3>
              <span className="typo-meta">Fredoka • 36px • Bold</span>
            </div>
            <div className="typo-sample">
              <p className="text-large">Large body text for easy reading</p>
              <span className="typo-meta">Nunito • 22px • Normal</span>
            </div>
            <div className="typo-sample">
              <p className="text-base">
                Standard body text with excellent readability
              </p>
              <span className="typo-meta">Nunito • 18px • Normal</span>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="showcase-section">
          <h2 className="heading-xl">Buttons</h2>
          <div className="button-grid">
            <button className="button-primary">Start Adventure! ✨</button>
            <button className="button-secondary">Go Back</button>
            <button className="button-character button-sorceress">
              Choose Sorceress
            </button>
            <button className="button-character button-knight">
              Choose Knight
            </button>
            <button className="button-character button-ranger">
              Choose Ranger
            </button>
            <button className="button-character button-bard">
              Choose Bard
            </button>
            <button className="button-primary" disabled>
              Disabled Button
            </button>
          </div>
        </section>

        {/* Cards Section */}
        <section className="showcase-section">
          <h2 className="heading-xl">Cards</h2>
          <div className="card-grid-demo">
            <div className="card">
              <h3 className="heading-lg">Basic Card</h3>
              <p className="text-base">
                A simple card with border and shadow. Perfect for containing
                related content.
              </p>
            </div>
            <div className="card-character">
              <h3 className="heading-lg">Character Card</h3>
              <p className="text-base">
                Special storybook-style card with decorative borders and
                parchment background.
              </p>
              <div className="skill-badges">
                <div className="skill-badge">
                  <span className="skill-icon">💪</span>
                  <span className="skill-name">Strong</span>
                  <span className="skill-value skill-value-0">0</span>
                </div>
                <div className="skill-badge">
                  <span className="skill-icon">📚</span>
                  <span className="skill-name">Smart</span>
                  <span className="skill-value skill-value-3">3</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Components */}
        <section className="showcase-section">
          <h2 className="heading-xl">Interactive Components</h2>

          {/* Hearts Display */}
          <div className="component-demo">
            <h3 className="heading-lg">Hearts System</h3>
            <div className="hearts-container">
              {[1, 2, 3].map((heart) => (
                <div
                  key={heart}
                  className={`heart ${heart > hearts ? 'lost' : ''}`}
                  onClick={() =>
                    setHearts(hearts === heart ? heart - 1 : heart)
                  }
                >
                  ❤️
                </div>
              ))}
            </div>
            <div className="demo-controls">
              <button
                className="button-small"
                onClick={() => setHearts(Math.max(0, hearts - 1))}
                disabled={hearts === 0}
              >
                Lose Heart
              </button>
              <button
                className="button-small"
                onClick={() => setHearts(Math.min(3, hearts + 1))}
                disabled={hearts === 3}
              >
                Restore Heart
              </button>
            </div>
          </div>

          {/* Dice Roller */}
          <div className="component-demo">
            <h3 className="heading-lg">Dice Roller</h3>
            <div className="dice-demo">
              {diceRoll !== null && (
                <div className={`dice-roll ${isRolling ? 'rolling' : ''}`}>
                  <div className="dice-number">{diceRoll}</div>
                  <div className="dice-label">
                    {diceRoll === 6 && '🌟 Critical!'}
                    {diceRoll === 1 && '😅 Fumble!'}
                    {diceRoll > 1 && diceRoll < 6 && '🎲 Rolled'}
                  </div>
                </div>
              )}
              <button
                className="button-primary"
                onClick={rollDice}
                disabled={isRolling}
              >
                🎲 Roll the Dice!
              </button>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="showcase-section">
          <h2 className="heading-xl">Form Elements</h2>
          <div className="form-demo">
            <div className="form-group">
              <label className="form-label">
                What&apos;s your hero&apos;s name?
              </label>
              <input
                type="text"
                className="input-text"
                placeholder="Enter a brave name..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Choose your adventure!</label>
              <select className="input-select">
                <option>Fantasy Quest</option>
                <option>Space Adventure</option>
                <option>Silly Mystery</option>
                <option>Ocean Exploration</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Tell us about your adventure idea:
              </label>
              <textarea
                className="input-textarea"
                placeholder="What exciting adventure should we go on?"
                rows={4}
              />
            </div>
          </div>
        </section>

        {/* Skill Badges */}
        <section className="showcase-section">
          <h2 className="heading-xl">Skill Badges</h2>
          <div className="badge-grid">
            <div className="skill-badge skill-badge-strong">
              <span className="skill-icon">💪</span>
              <span className="skill-name">Strong Stuff</span>
              <span className="skill-value skill-value-3">3</span>
            </div>
            <div className="skill-badge skill-badge-smart">
              <span className="skill-icon">📚</span>
              <span className="skill-name">Smart Stuff</span>
              <span className="skill-value skill-value-2">2</span>
            </div>
            <div className="skill-badge skill-badge-sneaky">
              <span className="skill-icon">⚡</span>
              <span className="skill-name">Sneaky Stuff</span>
              <span className="skill-value skill-value-1">1</span>
            </div>
            <div className="skill-badge skill-badge-kind">
              <span className="skill-icon">❤️</span>
              <span className="skill-name">Kind Stuff</span>
              <span className="skill-value skill-value-0">0</span>
            </div>
          </div>
        </section>

        {/* Shadows & Depth */}
        <section className="showcase-section">
          <h2 className="heading-xl">Shadows & Depth</h2>
          <div className="shadow-grid">
            <div className="shadow-example shadow-sm">
              <span className="shadow-label">Small</span>
            </div>
            <div className="shadow-example shadow-md">
              <span className="shadow-label">Medium</span>
            </div>
            <div className="shadow-example shadow-lg">
              <span className="shadow-label">Large</span>
            </div>
            <div className="shadow-example shadow-xl">
              <span className="shadow-label">Extra Large</span>
            </div>
          </div>
        </section>

        {/* Animations */}
        <section className="showcase-section">
          <h2 className="heading-xl">Animations</h2>
          <div className="animation-grid">
            <div className="animation-example bounce-animation">
              <div className="animation-box">Bounce</div>
            </div>
            <div className="animation-example wiggle-animation">
              <div className="animation-box">Wiggle</div>
            </div>
            <div className="animation-example celebrate-animation">
              <div className="animation-box">Celebrate</div>
            </div>
            <div className="animation-example pulse-animation">
              <div className="animation-box">Pulse</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
