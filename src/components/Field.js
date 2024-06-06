import { useState } from "react";
import useField from '../hooks/useField';
import useItems from '../hooks/useItems';
import useStorage from '../hooks/useStorage';
// import ManageField from './ManageField';

export default function Field ({fields, setFields, field, showInputBox, setCurrent, isSubitem}) {
  const { emptyField, emptySubField } = useField();
  const { deleteItem } = useItems();
  const { updateStorage } = useStorage();
  // const [ editField, setEditField ] = useState(false);
  // const [ showInput, setShowInput ] = useState(false);
  const [ expand, setExpand ] = useState(false);

  const deleteField = (id) => {
    const copiedFields = deleteItem(fields, id);
    updateStorage("fields", copiedFields);
    setFields(copiedFields);
  };

  const handleAddSubItem = () => {
    setCurrent({...emptySubField, isSubitem: true, parentId: field.id})
    showInputBox(); 
  }
    
  const handleEdit = () => {
    setCurrent({...field, isSubitem})
    showInputBox(); 
  }

  return ( 
    <>
      <td style={{paddingLeft: `${16+(15 * field.nestmentLevel)}px`, display: "flex", flexDirection: "column" }}>
        <div>
          <span>{field.name}</span>
          <span onClick={() => setExpand(!expand)} className="ml">{!expand ? "▼" : "▲"}</span>
          {expand &&
            <div style={{display: 'flex'}}>
              <button onClick={handleEdit}>Edit</button>
              {/* On Delete its better to have modal with message confirmation */}
              <button onClick={() => deleteField(field.id)} className='ml'>Delete</button>
              <button onClick={handleAddSubItem} className='ml'>Add Subfield</button>
            </div>
          }
        </div>
        { field.items && field.items.map(sub_field => (
            <Field key={sub_field.id}
              fields={fields}
              setFields={setFields}
              field={sub_field}
              showInputBox={showInputBox}
              setCurrent={setCurrent}
              isSubitem={true}
            />
          ))
        }
      </td>
    </>
  )
}
