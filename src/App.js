import React from 'react';
import AppProvider from './context/AppProvider';
import './App.css';
import Table from './component/Table';

function App() {
  return (
    <AppProvider>
      <main className="container">
        <Table />
      </main>

    </AppProvider>
  );
}

export default App;
