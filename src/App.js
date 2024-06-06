import { Suspense, useEffect } from 'react';
import './App.css';
import TableWhole from './components/TableWhole';
import { setDefaultFields } from './utils/storageModel';

const defaultFields = [
  { id: "mambojumbo", name: "Sales", verticalLevel: 0, color: "#ffffff", nestmentLevel: 0, subfields: [] },
  { id: "mambojumbo2", name: "Costs", verticalLevel: 1, color: "#ff0000", nestmentLevel: 1, subfields: [] },
  { id: "mambojumbo3", name: "Net Income", verticalLevel: 2, color: "#f6b73c", nestmentLevel: 0, subfields: [] },
];

function App() {
  useEffect(() => {
    // setDefaultFields(defaultFields);
    // localStorage.removeItem("fields")
  },[])

  return (
    <div>
      <h1 className='header'>
        Dynamic table task
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TableWhole />
      </Suspense>
    </div>
  );
}

export default App;
