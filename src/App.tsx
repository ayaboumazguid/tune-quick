import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Discover } from './pages/Discover';
import { Messages } from './pages/Messages';
import { Login } from './components/Login';
import { useMusicStore } from './stores/musicStore';

const App: React.FC = () => {
  const { currentUser } = useMusicStore();

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={currentUser ? <Home /> : <Login />} 
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
        {currentUser && <Navigation />}
      </div>
    </BrowserRouter>
  );
};

export default App;
