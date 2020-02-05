import React from 'react';
import './App.css';
import Header from './components/header/index';
import Footer from './components/footer/index';
import ContactList from './pages/contacts/index';

function App() {
  return (
    <div className="App">
      <Header/>
      <ContactList/>
      <Footer/>
    </div>
  );
}

export default App;
