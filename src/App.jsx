import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NeoProtocol from './pages/home/NeoProtocol';
// import MCPConsole from './pages/mcp-console'; // Comentado - será instruído depois
import ManifestoPage from './pages/manifesto/ManifestoPage';
import NosPage from './pages/nos/NosPage';
import IntelligenceBoot from './pages/boot/IntelligenceBoot';
import { soundManager } from './utils/sounds';

// Componente para detectar mudanças de rota
function RouteChangeListener() {
  const location = useLocation();

  useEffect(() => {
    // Tocar som quando a rota mudar
    soundManager.playPageLoad();
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <RouteChangeListener />
      <Routes>
        <Route path="/" element={<NeoProtocol />} />
        <Route path="/neo-protocol" element={<NeoProtocol />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/nos" element={<NosPage />} />
        <Route path="/boot" element={<IntelligenceBoot />} />
        {/* <Route path="/mcp" element={<MCPConsole />} /> Comentado - será instruído depois */}
      </Routes>
    </Router>
  );
}

export default App;

