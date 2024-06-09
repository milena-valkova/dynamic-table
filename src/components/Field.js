import { Fragment, useState } from "react";
import { returnNewItem, returnUpdatedItem } from '../utils/common';
import useField from '../hooks/useField';
import Action from "./Action";
import FormInput from "./FormInput";

export default function Field ({field, fields, handleUpdateField, isSubitem}) {
  const { insertNode, editNode, deleteNode, formFieldInputs } = useField();
  const [ expand, setExpand ] = useState(false);
  const [ editMode, setEditMode ] = useState(false);
  const [ showInput, setShowInput ] = useState(false);

  const handleInsertNode = (currentId, newItem) => {
    const finalStructure = insertNode(field, currentId, newItem);
    handleUpdateField(finalStructure);
  }

  const handleEditNode = (currentId, value) => {
    const finalStructure = editNode(field, currentId, value);
    handleUpdateField(finalStructure);
  }

  const handleDeleteNode = (currentId) => {
    const finalStructure = deleteNode(fields, currentId);
    const temp = {...finalStructure};
    handleUpdateField(temp);
  } 

  const handleCancel = () => {
    setEditMode(false);
    setShowInput(false);
  }

  const handleSubmit = (event) => {
    const newItem = returnNewItem(event, field);

    handleInsertNode(field.id, newItem);
    setShowInput(false);
    setExpand(false);
  }

  const handleEdit = (event) => {
    const updatedPart = isSubitem ? returnUpdatedItem(event, isSubitem, field) : returnUpdatedItem(event, isSubitem);
    handleEditNode(field.id, updatedPart)
    setEditMode(false);
    setShowInput(false);
    setExpand(false);
  }

  const handleDelete = () => {
    handleDeleteNode(field.id);
  };

  const handleNewField = () => {
    setEditMode(false);
    setShowInput(true);
  }

  return ( 
    <div style={{paddingLeft: `${16+(15 * field.nestmentLevel)}px`}} className="flex-column">
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
              <Action handleClick={handleDelete} className='ml' name="Delete"/>
              <Action handleClick={handleNewField} className='ml' name="Add Subfield"/>
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
            handleUpdateField={handleUpdateField}
            isSubitem={true}
          />
        ))}
      </>
    </div>
  )
};
