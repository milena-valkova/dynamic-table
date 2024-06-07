import { Suspense, useEffect, useState } from 'react';
import './App.css';
import useField from './hooks/useField';
import useStorage from './hooks/useStorage';
import Table from './components/Table';
import Field from './components/Field';
import Action from './components/Action';
import { returnNewItem } from './utils/common';

// const fields = [
//   { id: "mambojumbo", name: "Sales", verticalLevel: 0, color: "#ffffff", nestmentLevel: 0, items: [] },
//   { id: "mambojumbo2", name: "Costs", verticalLevel: 1, color: "#ff0000", nestmentLevel: 1, items: [] },
//   { id: "mambojumbo3", name: "Net Income", verticalLevel: 2, color: "#f6b73c", nestmentLevel: 0, items: [] },
// ];

// const fields = [
// { id: "mambojumbo", name: "Sales", verticalLevel: 0, color: "#ffffff", nestmentLevel: 0, items: [
//  { id: "mambojumbo1", name: "Sales", verticalLevel: 0, color: "#ffffff", nestmentLevel: 0, items: [] },
//  { id: "mambojumbo2", name: "Costs", verticalLevel: 1, color: "#ff0000", nestmentLevel: 1, items: [] },
//  { id: "mambojumbo3", name: "Net Income", verticalLevel: 2, color: "#f6b73c", nestmentLevel: 1, items: [] },
// ]}];


function App() {
  const { updateStorage, returnStorage } = useStorage();
  const { formFieldInputs } = useField();

  const [ fieldsData, setFieldsData ] = useState(returnStorage("fields"));
  const [ addField, setAddField ] = useState(false);

  // useEffect(() => {
  //   updateStorage("fields", fields)
  // },[])

  const handleAddField = (event) => { 
    const newItem = returnNewItem(event);
    setFieldsData([...fieldsData, newItem]);
    updateStorage("fields", [...fieldsData, newItem])
    setAddField(false);
  }

  const handleUpdateFields = (updatedItem) => {
    setFieldsData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );

    setTimeout(()=>{
      updateStorage("fields", fieldsData);
    })
  };

  return (
    <div>
      <h1 className='header'>
        Dynamic table task
      </h1>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <Table />
      </Suspense> */}
      <table>
        <tbody>
          {fieldsData.map(dataItem => (
            <tr key={dataItem.id} style={{backgroundColor: dataItem.color}}>
              <Field 
                field={dataItem} 
                fields={fieldsData} 
                handleUpdateField={handleUpdateFields} 
                isSubitem={false}/>
            </tr>
          ))
          }
          <tr>
            <td>
              { addField ?
                <form onSubmit={handleAddField} style={{backgroundColor: "linen", padding: '1rem'}}>
                  <h4>Add New Field</h4>
                  {formFieldInputs.map((field) => (
                    <p key={field.id}>
                      <label htmlFor={field.id}>{field.label}</label>
                        <input type={field.type} id={field.id} name={field.id} defaultValue={field.id === "color" ? "#FFFFFF" : ""}/>
                    </p>
                  ))}
                  <div className="buttons-row">
                    <Action type="submit" className='ml' name="Save"/>
                    <Action handleClick={() => setAddField(false)} className='ml' name="Cancel"/>
                  </div>
                </form>
                :
                <Action handleClick={() => setAddField(true)} name="Add Field"/>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
