import { useEffect, useState } from 'react';
import useField from '../hooks/useField';
import useStorage from '../hooks/useStorage';
import useReport from '../hooks/useReport';
import { returnNewItem, setNewUuid } from '../utils/common';

import Field from './Field';
import Report from './Report';
import Action from './Action';
import TableHead from './TableHead';

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


export default function Table () {
  const { updateStorage, returnStorage } = useStorage();
  const { formFieldInputs } = useField();
  const { deleteReport } = useReport();

  const [ fieldsData, setFieldsData ] = useState(returnStorage("fields") || []);
  const [ reportsData, setReportsData ] = useState(returnStorage("reports") || []);
  const [ addField, setAddField ] = useState(false);
  const [editableReport, setEditableReport] = useState(null);

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

  const handleDeleteReport = (id) => {
    const newReports = deleteReport(reportsData, id);
    updateStorage("reports", newReports);
    setReportsData(newReports);
  };

  const handleInsertReport = () => {
    const id = setNewUuid();
    const newReport = {id};
    
    fieldsData.forEach(field => {
      let keyName = field.name.toLowerCase().replace(" ","_");
      newReport[keyName] = 'moje';
      field.items && field.items.forEach(subfield => {
        newReport[subfield.name] = 'test';
      });
    });

    const reportsArray = [...reportsData, newReport]
    setReportsData(reportsArray);
    updateStorage("reports", reportsArray)
  };

  return (
    <table className='mb'>
      <TableHead 
        fields={fieldsData} 
        reports={reportsData} 
        setReports={setReportsData}
        handleDeleteReport={handleDeleteReport} 
      />
      <tbody>
        {fieldsData.map(dataItem => (
          <tr key={dataItem.id} style={{backgroundColor: dataItem.color}}>
            <Field 
              field={dataItem} 
              fields={fieldsData} 
              handleUpdateField={handleUpdateFields} 
              isSubitem={false}/>
          
          { reportsData.map((report, reportIndex) => (
            <Report key={report.id} 
              field={dataItem} 
              reports={reportsData}
              report={report} 
              setReports={setReportsData} 
              editableReport={editableReport}
              reportIndex={reportIndex}
            />
          ))}
          </tr>
        ))
        }
        <tr>
          <td>
            { addField ?
              <form onSubmit={handleAddField} className='form'>
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
              <>
                <Action handleClick={() => setAddField(true)} name="Add Field"/>
                <Action handleClick={handleInsertReport} className='ml' name="Add Report"/>
              </>
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
}
