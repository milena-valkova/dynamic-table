import { Fragment, useState } from "react";
import { returnNewItem, returnUpdatedItem } from '../utils/common';
import useField from '../hooks/useField';
import useReport from '../hooks/useReport';
import useStorage from '../hooks/useStorage';
import Action from "./Action";
import FormInput from "./FormInput";

export default function Field ({field, fields, reports, setReports, handleUpdateField, isSubitem}) {
  const { insertField, editField, deleteField, formFieldInputs } = useField();
  const { deleteCorrespondingReport, updateCorrespondingSubReports } = useReport();
  const { updateStorage } = useStorage();

  const [ expand, setExpand ] = useState(false);
  const [ editMode, setEditMode ] = useState(false);
  const [ showInput, setShowInput ] = useState(false);

  const keyName = field.name.toLowerCase().replace(" ","_");

  // const onChangeFieldReports = (reports, currentId, newItem, oldKey) => {
  //   const reportsCopy = [...reports];
  //   reportsCopy.forEach(report => {
  //     updateCorrespondingSubReports(report[oldKey ? oldKey : keyName], currentId, newItem, keyName);
  //   });
  //   debugger;
  //   setReports(reportsCopy);
  //   updateStorage("reports", reportsCopy);
  // }

  const handleUpdate = (currentId, value) => {
    console.log("old: ", field.name)
    const oldKey = field.name.toLowerCase().replace(" ","_");

    const finalStructure = editField(field, currentId, value);
    handleUpdateField(finalStructure);
    // onChangeFieldReports(reports, currentId, finalStructure, oldKey);
  }

  const handleDelete = (currentId) => {
    const finalStructure = deleteField(fields, currentId);
    const temp = {...finalStructure};
    handleUpdateField(temp);

    const reportsCopy = [...reports];
    reportsCopy.forEach(report => 
      deleteCorrespondingReport(report, currentId)
    );
    setReports(reportsCopy);
    updateStorage("reports", reportsCopy);
  } 

  const handleCancel = () => {
    setEditMode(false);
    setShowInput(false);
  }

  const handleAdd = (currentId, newItem) => {
    const finalStructure = insertField(field, currentId, newItem);
    handleUpdateField(finalStructure);

    const reportsCopy = [...reports];
    reportsCopy.forEach(report => {
      updateCorrespondingSubReports(report, currentId, newItem);
    });

    setReports(reportsCopy);
    updateStorage("reports", reportsCopy);
  }

  const handleSubmit = (event) => {
    const newItem = returnNewItem(event, field);

    handleAdd(field.id, newItem);
    setShowInput(false);
    setExpand(false);
  }

  const handleEdit = (event) => {
    const updatedPart = isSubitem ? returnUpdatedItem(event, isSubitem, field) : returnUpdatedItem(event, isSubitem);
    handleUpdate(field.id, updatedPart)
    setEditMode(false);
    setShowInput(false);
    setExpand(false);
  }

  const handleAddSubField = () => {
    setEditMode(false);
    setShowInput(true);
  }

  return ( 
    field && <div style={{paddingLeft: `${16+(15 * field.nestmentLevel)}px`}} className="flex-column">
      <div className="mb">
        <span>{field.name}</span>
        {(!editMode || !showInput) && <span onClick={() => setExpand(!expand)} className="ml mb">{!expand ? "▼" : "▲"}</span>}
        {expand &&
          ((!editMode || !showInput) && 
            <div className="buttons-row">
              <Action handleClick={() => {
                setEditMode(true);
                setShowInput(true);
              }} name="Edit"/>
              {/* On Delete its better to have modal with message confirmation */}
              <Action handleClick={()=>handleDelete(field.id)} className='ml' name="Delete"/>
              <Action handleClick={handleAddSubField} className='ml' name="Add Subfield"/>
            </div>
          )
        }
      </div>
      <>
        { (showInput || editMode) && 
          <form onSubmit={editMode ? handleEdit : handleSubmit} method='post' style={{backgroundColor: "linen", padding: '1rem', marginTop: '1rem'}}>
            <h4 className="text-center">{editMode ? 'Edit' : 'Add SubField'}</h4>
            {formFieldInputs.map((item) => {
              const props = {item, field, editMode, showInput};
              return <Fragment key={item.id}>
                {
                  (isSubitem && item.id !== "color") ?
                    <FormInput key={item.id} {...props} disabled={isSubitem && item.id === "color" && !editMode}/>
                  :
                  (!isSubitem && showInput) ?
                    <FormInput key={item.id} {...props} disabled={!isSubitem && item.id === "color" && !editMode}/>
                    :
                    (!isSubitem && editMode) &&
                    <FormInput key={item.id} {...props} disabled={false}/>
                }
              </Fragment>
            })}
            <div className="buttons-row">
              <Action type='submit' name="Save"/>
              <Action handleClick={handleCancel} className='ml' name="Cancel"/>
            </div>
          </form>
        }
        { field.items && field.items.map(sub_field => (
          <Field key={sub_field.id}
            field={sub_field}
            fields={fields}
            reports={reports}
            setReports={setReports}
            handleUpdateField={handleUpdateField}
            isSubitem={true}
          />
        ))}
      </>
    </div>
  )
};
