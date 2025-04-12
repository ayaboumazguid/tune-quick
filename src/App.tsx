import * as React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './components/Navigation';

export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
