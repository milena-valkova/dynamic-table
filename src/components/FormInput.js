const FormInput = ({item, field, editMode, disabled}) => {
  const isColor = item.id === "color";
  return (
    <p key={item.id}>
      <label htmlFor={item.id}>{item.label}</label>
      <input type={item.type} id={item.id} name={item.id} defaultValue={editMode ? field[item.id] : (isColor ? field[item.id] : "")} disabled={disabled}/>
    </p>
  )
}

export default FormInput;