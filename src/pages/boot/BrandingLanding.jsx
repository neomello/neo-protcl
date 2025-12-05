import { useEffect, useRef, useState } from 'react';
import { useDesktopBlock } from '../../hooks/useDesktopBlock';

/**
 * NΞØ HUB — INTAKE PROTOCOL
 * Landing page minimalista para IPFS/ENS
 */
export default function BrandingLanding() {
  useDesktopBlock();
  
  const glowRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const glowPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      glowPosRef.current.x += (mousePosRef.current.x - glowPosRef.current.x) * 0.15;
      glowPosRef.current.y += (mousePosRef.current.y - glowPosRef.current.y) * 0.15;
      
      if (glowRef.current) {
        glowRef.current.style.left = glowPosRef.current.x + 'px';
        glowRef.current.style.top = glowPosRef.current.y + 'px';
      }
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Smooth scroll for anchor links
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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      document.removeEventListener('click', handleClick);
    };
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
          overflow-y: hidden;
        }

        body {
          background-color: #ffffff;
          color: #000000;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif;
          font-weight: 400;
          letter-spacing: -0.01em;
          overflow: hidden;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .web-app-badge {
          position: fixed;
          top: 18px;
          right: 18px;
          z-index: 100;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #000000;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
        }

        .web-app-badge:hover {
          opacity: 0.7;
        }

        .grid-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          pointer-events: none;
          opacity: 0.05;
          background-image: 
            linear-gradient(0deg, #e0e0e0 1px, transparent 1px),
            linear-gradient(90deg, #e0e0e0 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 0;
        }

        .glow {
          display: none;
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
          padding: 48px;
          max-width: 1280px;
          margin: 0 auto;
        }

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
          animation: fadeInScale 300ms linear 0s forwards;
          margin-bottom: 48px;
        }

        .title-section {
          animation: fadeInDown 300ms linear 90ms forwards;
          text-align: center;
          margin-bottom: 24px;
          padding: 2.5rem 2rem;
          background: rgba(30, 30, 30, 0.5);
          border: 1px solid rgba(62, 62, 62, 0.3);
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(10px);
          width: 100%;
          max-width: 600px;
        }

        .message-section {
          animation: fadeInDown 300ms linear 160ms forwards;
          max-width: 40rem;
          text-align: center;
          margin-bottom: 48px;
        }

        .buttons-section {
          animation: fadeInScale 300ms linear 300ms forwards;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .genesis-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0;
        }

        .genesis-label {
          font-size: 0.8125rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #000000;
          font-weight: 500;
        }

        .particle {
          font-size: 1rem;
          color: #000000;
          line-height: 1;
        }

        .neo-logo {
          width: clamp(200px, 30vw, 400px);
          height: auto;
          margin-bottom: 30px;
          opacity: 0;
          animation: fadeInScale 300ms linear 100ms forwards;
        }

        h1 {
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          line-height: 1.1;
          color: #000000;
        }

        h2 {
          font-size: clamp(1.25rem, 4vw, 2rem);
          font-weight: 300;
          color: #000000;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .message-primary {
          font-size: 1.0625rem;
          color: #000000;
          line-height: 1.6;
          margin-bottom: 1rem;
          font-weight: 300;
        }

        .message-secondary {
          font-size: 0.875rem;
          color: #000000;
          letter-spacing: 0.1em;
          font-weight: 400;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }

        .btn-primary {
          background-color: #0B0D10;
          border: 1px solid #1A9AF7;
          color: #1A9AF7;
        }

        .btn-primary:hover {
          filter: saturate(115%) blur(0.2px);
          border-color: #34E1FF;
          color: #34E1FF;
        }

        .btn-primary:active {
          filter: saturate(90%);
        }

        .btn-secondary {
          border: 1px dashed #7B5DFF;
          color: #7B5DFF;
          background-color: transparent;
        }

        .btn-secondary:hover {
          filter: saturate(115%) blur(0.2px);
          border-color: #1A9AF7;
          color: #1A9AF7;
        }

        .btn-secondary:active {
          filter: saturate(90%);
        }

        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          background: linear-gradient(to top, #ffffff, transparent);
          padding: 18px;
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
          color: rgba(0, 0, 0, 0.5);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .footer-links a {
          color: #858585;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #4ec9b0;
        }

        .footer-divider {
          color: #3e3e3e;
        }

        .coding-status {
          color: rgba(0, 0, 0, 0.5);
          font-weight: 400;
        }

        @media (max-width: 640px) {
          .buttons-section {
            flex-direction: column;
            gap: 0.75rem;
          }

          .btn {
            width: 100%;
          }

          .container {
            padding: 18px;
            height: auto;
            min-height: 100vh;
            padding-bottom: 156px;
          }
        }
      `}</style>

      <a href="https://neoprotocol.space" target="_blank" rel="noreferrer" className="web-app-badge">WEB APP</a>
      
      <div className="grid-background"></div>
      <div ref={glowRef} className="glow"></div>

      <div className="container">
        <div className="accent">
          <div className="genesis-text">
            <span className="particle">⟡</span>
            <span className="genesis-label" style={{ marginRight: '9rem' }}>Genesis Block</span>
          </div>
        </div>

        <div className="title-section">
          <img 
            src="https://gateway.lighthouse.storage/ipfs/bafkreifm3hzdhem47tfzzqxm4274t3rqkzrgsa2zi2bc72nzjecxaixsxm" 
            alt="NΞØ" 
            className="neo-logo"
          />
          <h2>Protocolo de Admissão</h2>
        </div>

        <div className="message-section">
          <p className="message-primary">
            Quando o centro desaparece, a direção vira linguagem.
          </p>
          <p className="message-primary">
            E a linguagem vira rede. E a rede vira organismo.
          </p>
          <p className="message-secondary">
            Assim você descobre que é livre.
          </p>
        </div>

      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-specs">
            <span>v1.0</span>
            <span className="footer-divider">|</span>
            <span className="coding-status">øcoding</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/NEO-PROTOCOL" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.instagram.com/neoprotocol.eth/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </footer>

      <div id="protocol" style={{ position: 'absolute', top: '100vh', width: '100%', height: '0', visibility: 'hidden' }}></div>
    </>
  );
}
