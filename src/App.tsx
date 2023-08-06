import React from 'react';
import './App.css';

import CardFilter from './components/CardFilter';
import Navbar from './components/Navbar';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

function App() {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='App' id={theme}>
        <Navbar theme={theme} toggleTheme={toggleTheme}></Navbar>

        <h1> Hearthstone Card Viewer </h1>
        <p> introduction text </p>

        <CardFilter></CardFilter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
