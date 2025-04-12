import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { Profile } from './pages/Profile';
import { Messages } from './pages/Messages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app" style={{ minHeight: '100vh', backgroundColor: '#121212', color: 'white' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
        <Navigation />
      </div>
    </BrowserRouter>
  );
};

export default App;
