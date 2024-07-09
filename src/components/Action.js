const Action = ({handleClick = () => {}, name, className, type}) => {

  return(
    <button className={`${className} button`} onClick={handleClick} type={type}>
      {name}
    </button>
  )
}

export default Action;