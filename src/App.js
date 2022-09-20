import React from 'react';
import AppProvider from './context/AppProvider';
import './App.css';
import Table from './component/Table';

function App() {
  return (
    <AppProvider>
      <Table />
    </AppProvider>
  );
}

export default App;
