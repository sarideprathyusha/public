import React, { useEffect, useState, Fragment } from "react";
import { Container, Box } from "@material-ui/core";
import { DataGrid, GRID_HEADER_CELL_SEPARATOR_RESIZABLE_CSS_CLASS } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { getTableData, getTableCount } from "api";
import axios from "axios";
import ReadOnlyRow from "components/ReadOnlyRow";
import EditableRow from "components/EditableRow";

const columns = [
  { field: "ID", headerName: "ID", width: 250 },
  { field: "cost", headerName: "cost", flex: 1 },
  { field: "name", headerName: "name", flex: 1 }
];

const baseURL = "maps_destination_srv/";

const instance = axios.create({
  baseURL
});

const PAGE_SIZE = 15;

export default function MasterPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);


  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    FilterButton: {
      marginRight: theme.spacing(5),
      marginBottom: theme.spacing(4)
    },
    title: {
      marginLeft: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  // Number of rows which exist on the service
  const [rowCount, setRowCount] = useState(0);

  const [addMenu, setAddMenu] = useState({
    ID : "",
    name  : "",
    cost  : "",
    location: "",
    lat:"",
    lng:""
});

  const [editItemId, setEditItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    ID : "",
    name  : "",
    cost  : "",
    location: ""  
  });

  const handleEditFormChange = (event) =>{
      event.preventDefault();
      setEditFormData({...editFormData,[event.target.name]: event.target.value});


  };
  
   

const {ID , name , cost , location , lat , lng} = addMenu;

  const onInputChange = e => {
    setAddMenu({...addMenu,[e.target.name]: e.target.value});
  };

  const loadData = async (isFirstLoad, skip = 0) => {
    try {
      setItems([]);
      setLoading(true);

      if (isFirstLoad) {
        const count = await getTableCount();
        setRowCount(count);
      }

      const _items = await getTableData({
        $top: PAGE_SIZE,
        $skip: skip
      });
      const itemsWithIds = _items.map((item, index) => {
        item.id = index;
        return item;
      });
      setItems(itemsWithIds);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async e => {

    // let query = String(addMenu.ID);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ID:addMenu.ID, cost:addMenu.cost, name:addMenu.name, location:addMenu.location, lat:addMenu.lat,lng:addMenu.lng})
    };
  
    fetch('maps_destination_srv/Items', requestOptions).then(response => response.json());
    // instance.get("/functionCall(param='"+ query +"')");
    setAddMenu({
        ID : "",
        name  : "",
        cost  : "",
        location: "",
        lat:"",
        lng:""
  });
  loadData(true);  
  
};

const deleteItem = async id => {
    await axios.delete('maps_destination_srv/Items/'+id);
    loadData(true);
  };

  const updateCost =(event, items) => {
      event.preventDefault();
      setEditItemId(items.ID);
      const formValues = {
        ID : items.ID,
        name  : items.name,
        cost  : items.cost,
        location: items.location 
      }

      setEditFormData(formValues);
    
  };

  const handleEditFormSubmit = (event)=>{
      event.preventDefault();
      const editedItem = {
        ID : editFormData.ID,
        name  : editFormData.name,
        cost  : editFormData.cost,
        location: editFormData.location  
      };
      instance.get("/functionEdit(ID='"+ editFormData.ID + "',cost='" + editFormData.cost+ "')");
      console.log(editedItem);
      setEditItemId(null);
      loadData(true);
      

  };

  

  useEffect(() => {
    // when component mounted
    loadData(true);
  }, []);

 
  



  return (
    <div className="container">
    <div className="py-4">
      <div>
         
      <input className={classes.FilterButton} type="value" onChange={e => onInputChange(e)} id="InputId" placeholder="enter ID" name="ID" value={ID}/>
      <input className={classes.FilterButton} type="value" onChange={e => onInputChange(e)} id="Inputname" placeholder="enter count" name="name" value={name}/>
      <input className={classes.FilterButton} type="value" onChange={e => onInputChange(e)} id="Inputcost" placeholder="revenue" name="cost" value={cost}/>
      <input className={classes.FilterButton} type="value" onChange={e => onInputChange(e)} name="location" value={location}  id="Inputloc" placeholder="Enter Location" />
     
      <input className={classes.FilterButton} type="number" onChange={e => onInputChange(e)} name="lat" value={lat}  id="Inputlat" placeholder="Latitude" />
      <input className={classes.FilterButton} type="number" onChange={e => onInputChange(e)} name="lng" value={lng}  id="Inputlng" placeholder="Longitude" />
      <button class="btn btn-outline-primary mr-2" onClick={e => onSubmit(e)} type="submit">+Add</button>
      
      </div>
      <form onSubmit={handleEditFormSubmit}>
      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Branch ID</th>
            <th scope="col">Count</th>
            <th scope="col">Revenue(USD)</th>
            <th scope="col">Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((items, index) => (
            <Fragment>
                {editItemId === items.ID ? (
                     <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange}/>
                     ): ( 
                     <ReadOnlyRow items = {items} updateCost={updateCost} deleteItem={deleteItem}/>) }
             
            </Fragment>
          ))}
        </tbody>
      </table>
      </form>
    </div>
  </div>
  );
}
