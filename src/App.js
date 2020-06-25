import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sorts from './components/sort-visualier/sorts.component';
import GraphVisualier from './components/graph-visualizer/graph-visualier.component';

function App() {
  return (
    <div className="App">
      <GraphVisualier />
      <Sorts />
    </div>
  );
}

export default App;
