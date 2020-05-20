import React,{useContext} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Navbarcomponent() {

  const {state,dispatch} = useContext(AuthContext)
  const history = useHistory()



  const renderList = ()=>{
    if(state){
        return [
          <li className="nav-item " key={1}>
          <Link className="nav-link text-white font-weight-bold" to="/"
            >Home </Link>
        </li>,
<li className="nav-item active" key={2}>
<Link className="nav-link font-weight-bolder" to="/login"
onClick={()=>{
  localStorage.clear()
  dispatch({type:"CLEAR"})
  history.push('/login')
  window.location.reload()
}}
  >Logout</Link>
</li>
        ]
    }else{
      return [
        <li className="nav-item active" key={3}>
              <Link className="nav-link font-weight-bolder" to="/register"
                >Register</Link>
            </li>,
            <li className="nav-item active" key={4}>
              <Link className="nav-link font-weight-bolder" to="/login"
                >Login</Link>
            </li>
      ]
    }
  }



    return (

        <div className="container-fluid pb-5">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-sm-start  fixed-top"
      >
        <Link className="navbar-brand order-1 font-weight-bold order-lg-0 ml-3" to="/">BOILERPLATE</Link>
        <div className="order-1">
          <span className="navbar-brand" ><i className="fas fa-cart-plus"></i></span>
        </div>
  
        {/* --mr-3 for left sidebar-- */}
        <button className="navbar-toggler align-self-start" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse bg-dark d-flex flex-column justify-content-lg-end flex-xl-row p-3 p-lg-0 mt-5 mt-lg-0 mobilemenu"
        id="navbarSupportedContent">
          {/* --add on-right class--  */}
          <ul className="navbar-nav navbar-left ml-auto ml-sm-0 ">

          {renderList()}
            {/* <li className="nav-item ">
              <Link className="nav-link text-white font-weight-bold" to="/"
                >Home </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white font-weight-bold" to="/">Link</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link text-white font-weight-bold dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/">Action</Link>
                <Link className="dropdown-item" to="/">Another action</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/">Something else here</Link>
              </div>
            </li> */}



          </ul> 
          {/* <ul className="navbar-nav ml-auto  ">
            <li className="nav-item active">
              <Link className="nav-link font-weight-bolder" to="/register"
                >Register</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link font-weight-bolder" to="/login"
                >Login</Link>
            </li>
          </ul>          */}
        </div>
      </nav>
      <div className="overlay"></div>
      </div>

    )
}
