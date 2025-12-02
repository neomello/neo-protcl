import { useEffect, useRef, useState } from 'react';
import { soundManager } from '../../utils/sounds';

/**
 * NΞØ HUB — INTAKE PROTOCOL
 * Página de landing conectada ao neoprotocol.eth via ENS/IPFS
 */
export default function BrandingLanding() {
  const glowRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    soundManager.playClick();
  }, []);

  // Mouse glow effect animation
  useEffect(() => {
    const mousePosRef = { x: 0, y: 0 };
    const glowPosRef = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mousePosRef.x = e.clientX;
      mousePosRef.y = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      glowPosRef.x += (mousePosRef.x - glowPosRef.x) * 0.15;
      glowPosRef.y += (mousePosRef.y - glowPosRef.y) * 0.15;
      
      setGlowPos({ x: glowPosRef.x, y: glowPosRef.y });
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Smooth scroll for internal links
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        body {
          background-color: #0a0a0a;
          color: #f0f0f0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          letter-spacing: 0.5px;
          overflow: hidden;
        }

        /* Grid background */
        .grid-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.05;
          background-image: 
            linear-gradient(0deg, #00cfff 1px, transparent 1px),
            linear-gradient(90deg, #00cfff 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
        }

        /* Mouse glow effect */
        .glow {
          position: fixed;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #00cfff 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          pointer-events: none;
          mix-blend-mode: screen;
          z-index: 1;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease-out;
        }

        .container {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .accent {
          animation: fadeInScale 1s ease-out 0s forwards;
          margin-bottom: 3rem;
        }

        .title-section {
          animation: fadeInDown 1s ease-out 0.1s forwards;
          text-align: center;
          margin-bottom: 2rem;
        }

        .message-section {
          animation: fadeInDown 1s ease-out 0.2s forwards;
          max-width: 40rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .buttons-section {
          animation: fadeInScale 1s ease-out 0.3s forwards;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Typography */
        .genesis-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .genesis-label {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(0, 207, 255, 0.6);
          font-weight: 600;
        }

        .brain-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #00cfff;
        }

        h1 {
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        h2 {
          font-size: clamp(1.25rem, 4vw, 2rem);
          font-weight: 300;
          color: #00cfff;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .message-primary {
          font-size: clamp(1.125rem, 3vw, 1.25rem);
          color: rgba(240, 240, 240, 0.8);
          line-height: 1.6;
          margin-bottom: 1rem;
          font-weight: 300;
        }

        .message-secondary {
          font-size: clamp(0.875rem, 2vw, 1rem);
          color: #00ff99;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
          white-space: nowrap;
        }

        .btn-primary {
          background-color: #00cfff;
          color: #0a0a0a;
          box-shadow: 0 0 20px rgba(0, 207, 255, 0.4);
        }

        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(0, 207, 255, 0.6);
        }

        .btn-primary:active {
          transform: scale(0.95);
        }

        .btn-secondary {
          border: 1px solid rgba(0, 207, 255, 0.4);
          color: #00cfff;
          background-color: transparent;
        }

        .btn-secondary:hover {
          border-color: #00cfff;
          box-shadow: 0 0 20px rgba(0, 207, 255, 0.2);
        }

        .btn-secondary:active {
          transform: scale(0.98);
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Footer */
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: 1px solid rgba(0, 207, 255, 0.1);
          background: linear-gradient(to top, #0a0a0a, transparent);
          padding: 1.5rem;
          z-index: 10;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: space-between;
          align-items: center;
        }

        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
          }
        }

        .footer-specs,
        .footer-links {
          display: flex;
          gap: 1.5rem;
          font-size: 0.75rem;
          color: rgba(240, 240, 240, 0.5);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .footer-links a {
          color: rgba(240, 240, 240, 0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #00cfff;
        }

        .footer-divider {
          color: rgba(240, 240, 240, 0.3);
        }

        /* Responsive */
        @media (max-width: 640px) {
          .buttons-section {
            flex-direction: column;
            gap: 0.75rem;
          }

          .btn {
            width: 100%;
          }

          .container {
            padding: 1.5rem;
            height: auto;
            min-height: 100vh;
            padding-bottom: 12rem;
          }
        }
      `}</style>

      {/* Grid background */}
      <div className="grid-background"></div>

      {/* Mouse glow effect */}
      <div 
        ref={glowRef}
        className="glow" 
            style={{
          left: `${glowPos.x}px`,
          top: `${glowPos.y}px`
        }}
      ></div>

      {/* Main content */}
      <div className="container">
        {/* Genesis accent */}
        <div className="accent">
          <div className="genesis-text">
            <svg className="brain-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.59 9a6 6 0 1 1 8.82 8.82A6.5 6.5 0 0 0 12 18.5a6.5 6.5 0 0 1-6.41-9.5"></path>
            </svg>
            <span className="genesis-label">Genesis Block</span>
            <svg className="brain-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.59 9a6 6 0 1 1 8.82 8.82A6.5 6.5 0 0 0 12 18.5a6.5 6.5 0 0 1-6.41-9.5"></path>
            </svg>
          </div>
        </div>

        {/* Title section */}
        <div className="title-section">
          <h1>NΞØ HUB</h1>
          <h2>Intake Protocol</h2>
        </div>

        {/* Message section */}
        <div className="message-section">
          <p className="message-primary">
            O primeiro mecanismo oficial para integração sem autorização central.
          </p>
          <p className="message-secondary">
            Humanos · IAs · Agentes · Contratos · Nós
          </p>
        </div>

        {/* Buttons section */}
        <div className="buttons-section">
          <a 
            href="#protocol" 
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              soundManager.playClick();
              const target = document.getElementById('protocol');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>📋</span>
            <span>Ver Especificação</span>
          </a>
          <a 
            href="https://neoprotocol.eth.limo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
            onClick={() => soundManager.playClick()}
          >
            <span>Documentação</span>
            <span>↗</span>
          </a>
        </div>
        </div>

        {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-specs">
            <span>v1.0</span>
            <span className="footer-divider">|</span>
            <span>Status: Ativo</span>
        </div>
          <div className="footer-links">
            <a 
              href="https://github.com/NEO-PROTOCOL" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
            >
              GitHub
            </a>
            <a 
              href="https://www.instagram.com/neoprotocol.eth/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
            >
              Instagram
            </a>
            <a 
              href="https://neo-protcl.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
            >
              Dapp
            </a>
      </div>
    </div>
      </footer>
    </>
  );
}
