import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NeoProtocol from './pages/home/NeoProtocol';
import MCPConsole from './pages/mcp-console';
import X402Example from './pages/x402-example';
import SDKExample from './pages/sdk-example';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NeoProtocol />} />
        <Route path="/neo-protocol" element={<NeoProtocol />} />
        <Route path="/mcp" element={<MCPConsole />} />
        <Route path="/x402" element={<X402Example />} />
        <Route path="/sdk" element={<SDKExample />} />
      </Routes>
    </Router>
  );
}

export default App;

