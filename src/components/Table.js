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
//   { id: "mambojumbo1", name: "Sales", verticalLevel: 0, color: "#ffffff", nestmentLevel: 0, items: [] },
//   { id: "mambojumbo2", name: "Costs", verticalLevel: 1, color: "#ff0000", nestmentLevel: 1, items: [] },
//   { id: "mambojumbo3", name: "Net Income", verticalLevel: 2, color: "#f6b73c", nestmentLevel: 0, items: [] },
// ];

// const fields = [
// { id: "mambojumbo", name: "Sales", verticalLevel: 0, color: "#ffffff", nestmentLevel: 0, items: [
//  { id: "mambojumbo2", name: "Costs", verticalLevel: 1, color: "#ff0000", nestmentLevel: 1, items: [] },
//  { id: "mambojumbo3", name: "Net Income", verticalLevel: 2, color: "#f6b73c", nestmentLevel: 1, items: [] },
// ]}];


export default function Table () {
  const { updateStorage, returnStorage } = useStorage();
  const { formFieldInputs } = useField();
  const { insertReport, deleteReport, updateAllReports } = useReport();

  const [ fieldsData, setFieldsData ] = useState(returnStorage("fields") || []);
  const [ reportsData, setReportsData ] = useState(returnStorage("reports") ||[]);
  // const [ reportsData, setReportsData ] = useState([]);
  const [ addField, setAddField ] = useState(false);
  const [ editReportMode, setEditReportMode ] = useState(null);

  // useEffect(() => {
  //   updateStorage("fields", fields)
  // },[])

  const handleAddField = (event) => { 
    const newItem = returnNewItem(event);
    const temp = [...fieldsData, newItem];
    setFieldsData(temp);
    updateStorage("fields", temp);
    setAddField(false);

    updateAllReports(reportsData, newItem);
  }

  const handleUpdateFields = (updatedItem) => {
    setFieldsData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );

    setTimeout(()=>{
      updateStorage("fields", fieldsData);
    });
  };

  const handleDeleteReport = (id) => {
    const newReports = deleteReport(reportsData, id);
    setReportsData(newReports);
    updateStorage("reports", newReports);
  };

  const handleInsertReport = () => {
    const newReport = {id: setNewUuid()}

    const temp = insertReport(fieldsData, newReport);
    const reportsArray = [...reportsData, temp];
    setReportsData(reportsArray);
    updateStorage("reports", reportsArray);
  };

  const onSaveReport = () => {
    setEditReportMode(null);

    setTimeout(()=>{
      updateStorage("reports", reportsData);
    });
  }

  return (
    <table className='mb'>
      <TableHead 
        fields={fieldsData} 
        reports={reportsData}
        handleDeleteReport={handleDeleteReport} 
        onSaveReport={onSaveReport}
        editReportMode={editReportMode}
      />
      <tbody>
        {fieldsData.map(dataItem => (
          <tr key={dataItem.id} style={{backgroundColor: dataItem.color}}>
            <td>
              <Field 
                field={dataItem} 
                fields={fieldsData} 
                reports={reportsData}
                setReports={setReportsData}
                handleUpdateField={handleUpdateFields} 
                isSubitem={false}
              />
            </td>
          
            { reportsData.map((report, reportIndex) => {
              const reportKey = dataItem.name.toLowerCase().replace(" ","_");
              return <td key={report.id} onClick={()=>setEditReportMode(report)} style={{cursor: !editReportMode && 'pointer'}}>
                <Report
                  field={dataItem} 
                  reportsData={reportsData}
                  setReportsData={setReportsData}
                  report={report}
                  parentReport={report}
                  reportKey={reportKey}
                  reportIndex={reportIndex}
                  editReportMode={editReportMode}
                  setEditReportMode={setEditReportMode}
                  isSubfield={false}
                  fieldsData={fieldsData}
                />
              </td>
            })}
          </tr>
        ))
        }
        <tr>
          <td >
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
              <div className='mt'>
                <Action handleClick={() => setAddField(true)} name="Add Field"/>
                <Action handleClick={handleInsertReport} className='ml' name="Add Report"/>
              </div>
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
}
