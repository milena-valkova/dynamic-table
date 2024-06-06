import { updateItems, emptyField } from '../utils/common';
import { updateFields } from '../utils/storageModel';

const formFieldInputs = [
  { label: "Name: ", id: "name", type: "text" },
  { label: "Vertical Level: ", id: "verticalLevel", type: "number" },
  { label: "Color: ", id: "color", type: "color" },
  { label: "Nestment Level: ", id: "nestmentLevel", type: "number" },
];

export default function ManageField ({onCloseBox, setFields, fields, current, setCurrent}) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const verticalLevel = Number(data.get('verticalLevel'));
    const color = data.get('color');
    const nestmentLevel = Number(data.get('nestmentLevel'));
    let newFields = Array.from(fields);

    if(current.id){
      newFields = updateItems(fields, current.id, {name, verticalLevel, color, nestmentLevel});
    } else {
      const id = crypto.randomUUID();
      newFields.push({id, name, verticalLevel, color, nestmentLevel}); 
    }

    //Fields must be validated before submission to storage!!
    updateFields(newFields);
    setFields(newFields);
    onCloseBox();
    setCurrent(emptyField);
  };

  console.log(current);
  console.log(fields);

  return (
    <div className='fixed-box'>
      <h3 className='mb'>{`${current.id ? 'Edit' : 'Add'} Field`}</h3>
      <form onSubmit={handleSubmit} method='post'>
        {formFieldInputs.map((field) => (
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