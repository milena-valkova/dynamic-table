import useStorage from '../hooks/useStorage';
import useField from '../hooks/useField';
import useItems from '../hooks/useItems';
import { useEffect, useState } from 'react';

const formFieldInputs = [
  { label: "Name: ", id: "name", type: "text" },
  { label: "Vertical Level: ", id: "verticalLevel", type: "number" },
  { label: "Color: ", id: "color", type: "color" },
  { label: "Nestment Level: ", id: "nestmentLevel", type: "number" },
];

export default function ManageField ({onCloseBox, setFields, fields, current, setCurrent }) {
  const { updateStorage } = useStorage();
  const { emptyField, addSubItem } = useField();
  const { updateItems } = useItems();
  
  const setSubFieldToStorage = (copiedFields, newItem) => {
    let tempData, final;

    if(current.id){
      debugger;
      final = updateItems(copiedFields, current.id, newItem);
    }else{
      tempData = addSubItem(copiedFields, current, {...newItem});
      final = updateItems(copiedFields, current.parentId, tempData);
    }
    
    updateStorage("fields", final);
    return final;
  }

  const setFieldToStorage = (copiedFields, newItem) => {
    if(current.id){
      copiedFields = updateItems(fields, current.id, newItem);
      debugger;
    } else {
      const id = crypto.randomUUID();
      copiedFields.push({id, ...newItem}); 
    }

    //Fields must be validated before submission to storage!!
    updateStorage("fields", copiedFields);
    return copiedFields;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const verticalLevel = Number(data.get('verticalLevel'));
    const color = data.get('color') || "transparent";
    const nestmentLevel = Number(data.get('nestmentLevel'));
    const newItem = {name, verticalLevel, color, nestmentLevel, items:[]};
    let copiedFields = [...fields];
    let finalArr = [];


    if(current.isSubitem){
      finalArr = setSubFieldToStorage(copiedFields, newItem);
    }else{
      finalArr = setFieldToStorage(copiedFields, newItem);
    }
    
    setFields(finalArr);  
    onCloseBox();
    setCurrent({...emptyField, isSubitem: false});
  };

  return (
    <div className='fixed-box'>
      <h3 className='mb'>{`${current.id ? 'Edit' : 'Add'} ${current.isSubitem ? 'Subfield' : 'Field'}`}</h3>
      <form onSubmit={handleSubmit} method='post'>
        {formFieldInputs.map((field) => (
          !(current.isSubitem && field.id === 'color') &&
          <p key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
              <input type={field.type} id={field.id} name={field.id} defaultValue={current[field.id]}/>
          </p>
        ))}
        <div>
          <button type='submit' style={{backgroundColor:'lightgreen'}}>Save</button>
          <button type='button' onClick={onCloseBox} className='ml'>Cancel</button>
        </div>
      </form>
    </div>
  )
}