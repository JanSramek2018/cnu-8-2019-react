import React from 'react';
import './App.css';
import Header from './components/Header';
import PageSwitcher from './components/PageSwitcher';

/**
 * What do we need
 * Listing page - output all recipes - DONE
 * Detail page - print one recipe with all of it's data
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
