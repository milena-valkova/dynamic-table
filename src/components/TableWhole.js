import React, { useState } from 'react';
import { returnFields, updateFields } from '../utils/storageModel';
import { emptyField, deleteItem } from '../utils/common';
import ManageField from './ManageField';

export default function TableWhole () {
  const [fields, setFields] = useState(returnFields() || []);
  const [reports, setReports] = useState([]);
  const [currentField, setCurrentField] = useState(emptyField);
  const [openManageFieldBox, setOpenManageFieldBox] = useState(false);

  const showFieldsBox = () => {
    setOpenManageFieldBox(prev => !prev);
  };

  const addSubField = (index) => {
    const newFields = [...fields];
    const parentField = newFields[index];
    const newSubField = { name: '', color: '', verticalLevel: parentField.verticalLevel + 1, nestmentLevel: parentField.nestmentLevel + 1, subfields: [] };
    parentField.subfields.push(newSubField);
    setFields(newFields);
  };

  const handleSubFieldChange = (parentIndex, subIndex, key, value) => {
    const newFields = [...fields];
    newFields[parentIndex].subfields[subIndex][key] = value;
    setFields(newFields); 
  };

  const addReport = () => {
    const newReport = {};
    fields.forEach(field => {
      let keyName = field.name.replace(" ","");
      keyName = keyName[0].toLowerCase() + keyName.slice(1);
      newReport[keyName] = '';
      // field.subfields && field.subfields.forEach(subfield => {
      //   newReport[subfield.name] = '';
      // });
    });
    setReports([...reports, newReport]);
  };

  const handleReportChange = (reportIndex, fieldName, value) => {
    const newReports = [...reports];
    newReports[reportIndex][fieldName] = value;
    setReports(newReports);
  };

  const deleteReport = (index) => {
    const newReports = [...reports];
    newReports.splice(index, 1);
    setReports(newReports);
  };

  const deleteField = (id) => {
    const newFields = deleteItem(fields, id);
    updateFields(newFields);
    setFields(newFields);
  };

  return (
    <div className='container'>
      <table className='mb'>
        <thead>
          <tr>
            {fields.length > 0 && <th>Field Name</th>}
            {reports.map((_, index) => (
              <th key={index}>
                <span>Report {index + 1}</span>
                <button onClick={() => deleteReport(index)} className='ml'>Delete</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields && fields.map((field, fieldIndex) => (
            <tr key={fieldIndex} style={{backgroundColor: field.color}}>
              <td style={{paddingLeft: `${16+(15 * field.nestmentLevel)}px` }}>
                <span>{field.name}</span>
                <div>
                  <button onClick={() => { setCurrentField(field); showFieldsBox(); }} className='ml'>Edit</button>
                  {/* On Delete its better to have modal with message confirmation */}
                  <button onClick={() => { deleteField(field.id) }} className='ml'>Delete</button>
                  <button onClick={() => addSubField(fieldIndex)} className='ml'>Add Subfield</button>
                </div>
              </td>
              {reports.map((report, reportIndex) => (
                <td key={reportIndex}>
                  <input
                    type="text"
                    value={report[field.name] || ''}
                    onChange={(e) => handleReportChange(reportIndex, field.name, e.target.value)}
                    placeholder="Data"
                  />
                </td>
              ))}
              <div>
                {field.subfields && field.subfields.map((subfield, subfieldIndex) => (
                  <div key={`${fieldIndex}-${subfieldIndex}`} style={{ paddingLeft: `${15 * subfield.nestmentLevel}px` }} className='text-left mb'>
                    <span>
                      <input
                          type="text"
                          value={subfield.name}
                          onChange={(e) => handleSubFieldChange(fieldIndex, subfieldIndex, 'name', e.target.value)}
                          placeholder="Subfield Name"
                      />
                    </span>
                    {reports.map((report, reportIndex) => (
                      <span key={reportIndex}>
                        <input
                          type="text"
                          value={report[subfield.name] || ''}
                          onChange={(e) => handleReportChange(reportIndex, subfield.name, e.target.value)}
                          placeholder="Data"
                        />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pos-left mb">
        <button onClick={showFieldsBox}>{openManageFieldBox ? 'Discard':'Add Field'}</button>
        <button className="ml" onClick={addReport}>Add Report</button>
      </div>
      { openManageFieldBox && 
        <ManageField 
          onCloseBox={showFieldsBox} 
          fields={fields} 
          setFields={setFields} 
          current={currentField}
          setCurrent={setCurrentField}
        />
      }
    </div>
  );
};

