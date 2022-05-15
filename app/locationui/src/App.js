import React,{ useEffect, useState, Fragment } from "react";
import "./App.css";
import NotFound from "pages/NotFound";
import { makeStyles } from "@material-ui/core/styles";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MasterPage from "pages/MasterPage";
import MapPage from "pages/MapPage"


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      marginLeft: theme.spacing(2)
    }
  }));

const App = () => {
    const classes = useStyles();

    
    const [viewSel, setViewSel] = useState(true);
    const handleViewMap = (event)=>{
        event.preventDefault();
        setViewSel(false);
    };
    const handleViewTable = (event)=>{
        event.preventDefault();
        setViewSel(true);
    };
  return (
    <div className="App full-height">
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          {"Sales"}
        </Typography>
        
       
        <Fragment>
                {viewSel ? (
                     <button  type="submit" style={{borderColor:'white',color: 'white',marginLeft:'70rem',backgroundColor: '#3f51b5'}} onClick={handleViewMap}>Locate in Map</button>
                     ): ( 
                    <button type="submit" style={{borderColor:'white',color: 'white',marginLeft:'70rem',backgroundColor: '#3f51b5'}} onClick={handleViewTable}>Sales Table</button>
                     ) }
             
            </Fragment>

      </Toolbar>
    </AppBar>
     
      
      <Fragment>
                {viewSel ? (
                     <MasterPage />
                     ): ( 
                        <MapPage />
                     ) }
             
            </Fragment>
     
    </div>
  );
};

export default App;
