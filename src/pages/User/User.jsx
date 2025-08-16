import "./User.css"

function UserComponent({isOpen, setIsOpen, info}){

  if(!isOpen){
    return null;
  }
  return(
      <div className="userInfo-wrapper">
        
      </div>
    );
}

export default UserComponent;