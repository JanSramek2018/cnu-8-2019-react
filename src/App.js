import React from 'react';
import './App.css';

import Header from './components/Header';
import PageSwitcher from './components/PageSwitcher';

/**
 * What do we need
 * Listing page - output all recepies - DONE
 * Detail page - print one recepie with all of it's data
 * Header - DONE
 * pageSwitcher
 */

function App() {
  return (
    <div className="App">
      <Header />
      <PageSwitcher />
    </div>
  );
}

export default App;
