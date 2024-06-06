import { Suspense, useEffect } from 'react';
import './App.css';
import Table from './components/Table';

const fields = [
  { id: "mambojumbo", name: "Sales", verticalLevel: 0, color: "#ffffff", nestmentLevel: 0, items: [] },
  { id: "mambojumbo2", name: "Costs", verticalLevel: 1, color: "#ff0000", nestmentLevel: 1, items: [] },
  { id: "mambojumbo3", name: "Net Income", verticalLevel: 2, color: "#f6b73c", nestmentLevel: 0, items: [] },
];

function App() {

  useEffect(() => {
    const first = JSON.stringify(fields);
    localStorage.setItem("fields", first);

    // localStorage.removeItem("fields")
  },[])

  return (
    <div>
      <h1 className='header'>
        Dynamic table task
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Table />
      </Suspense>
    </div>
  );
}

export default App;
