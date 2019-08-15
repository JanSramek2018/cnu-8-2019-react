import React from 'react';
import './App.css';

import Header from './components/Header';
import Listing from './components/listing/Listing';

/**
 * What do we need
 * Listing page - output all recepies
 * Detail page - print one recepie with all of it's data
 * Header
 */

function App() {
  return (
    <div className="App">
      <Header />
      <Listing />
    </div>
  );
}

export default App;
