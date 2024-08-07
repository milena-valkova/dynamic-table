import { Suspense } from 'react';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <div className='container'>
      <h1 className='header'>
        Fully Dynamic table
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Table />
      </Suspense>
    </div>
  );
}

export default App;
