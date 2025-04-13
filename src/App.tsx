import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { Messages } from './pages/Messages';
import { useMusicStore } from './stores/musicStore';

export const App: React.FC = () => {
  const { currentUser } = useMusicStore();

  return (
    <Router>
      <div className="app">
        {currentUser && <Navigation />}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={currentUser ? <Home /> : <Login />} 
            />
            <Route path="/discover" element={<Discover />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
