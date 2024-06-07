const Action = ({handleClick, name, className, type}) => {

  return(
    handleClick ? 
    <button className={`${className} button`} onClick={handleClick} type={type}>
      {name}
    </button>
    :
    <button className={`${className} button`} type={type}>
      {name}
    </button>
  )
}

export default Action;