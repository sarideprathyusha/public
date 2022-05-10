import React, { useEffect, useState, Fragment } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import NotFound from "pages/NotFound";
import AppBar from "components/AppBar";
import {NavLink} from "react-router-dom"
import MasterPage from "pages/MasterPage";
import Create from "pages/Create";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";



  
const App = () => {

    const [createForm, setcreateForm] = useState(null);
    const [homeSel, setHomeSel]=useState(true);
    const [createSel, setCreateSel]=useState(false);

const onHomePage = async () => {
   
    setHomeSel(true);
    setCreateSel(false);
   
    setcreateForm(null);
  };
  const onCreatePage = async () => {
  
    setHomeSel(false);
    setCreateSel(true); 
    setcreateForm(true);
  };  
  const [editFormData, setEditFormData] = useState(
    {
        "vendor_id":"",
        "req_name":"",
        "pur_grp":"",
        "exp_date":"",
        "mat_id":"",
        "mat_grp":"",
        "qty":"",
        "uom":"",
        "price":"",
        "cur":"",
        "plant":"",
        "ven_name":"",
        "mat_desc":"",
        "approved": false 
     }
  );
  const handleEditFormChange = (event) =>{
    event.preventDefault();
    setEditFormData({...editFormData,[event.target.name]: event.target.value});


};
const handleEditFormSubmit = (event)=>{
      event.preventDefault();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendor_id:editFormData.vendor_id,
        req_name:editFormData.req_name,
        pur_grp:editFormData.pur_grp,
        exp_date:editFormData.exp_date,
        mat_id:editFormData.mat_id,
        mat_grp:editFormData.mat_grp,
        qty:editFormData.qty,
        uom:editFormData.uom,
        price:editFormData.price,
        cur:editFormData.cur,
        plant:editFormData.plant,
        approved: false })
    };
  
    fetch('purchasereq_destination_srv/Requests', requestOptions).then(response => response.json());
    
  
      console.log(editFormData);
      setEditFormData(
        {
            "vendor_id":"",
            "req_name":"",
            "pur_grp":"",
            "exp_date":"",
            "mat_id":"",
            "mat_grp":"",
            "qty":"",
            "uom":"",
            "price":"",
            "cur":"",
            "plant":"",
            "ven_name":"",
            "mat_desc":"",
            "approved": false 
         }
      );
  
  };
   

  return (
  
          <div className="App">
              <nav className="navbar navbar-expand-lg" style={{ color: "white" , backgroundColor:"#354a5f"}}>
      <div>
       

        <div className="collapse navbar-collapse">
        
        <h3 style={{marginLeft:"1rem"}}>Purchase Requisition</h3>
        <Fragment>
            {homeSel ?(
            <a style={{marginLeft:"2rem",color:"#78859f"}}>
            <span onClick={onHomePage} >Request Status</span>
            </a>
            ):(
                <a style={{marginLeft:"2rem", color:"white"}}>
                <span onClick={onHomePage} >Request Status</span>
                </a>
            )}
            </Fragment>
            
               <Fragment>
            {createSel ?(
            <a style={{marginLeft:"2rem",color:"#78859f"}}>
              <span onClick={onCreatePage} >Create</span>
              </a>
            ):(
               <a style={{marginLeft:"2rem",color:"white"}}>
              <span onClick={onCreatePage} >Create</span>
              </a>
            )}
            </Fragment>
              
             
          
        </div>
      </div>
    </nav>

    <div>
 
    <form onSubmit={handleEditFormSubmit}>
    <Fragment>
                {createForm ? (
                     <Create editFormData={editFormData} handleEditFormChange={handleEditFormChange}/>
                     ): ( 
                     <MasterPage/>) }
             
            </Fragment>

    </form>
    </div>
            
    </div>
   
      
    
  );
};

export default App;
