import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch,withRouter} from 'react-router-dom';
import Bread from './Bread';
import './App.css';
import {entityBrowserData} from './testdata';
class App extends Component {

  onSubmit(formData,e){
   e.preventDefault();
   console.log(formData);
  }

  render() {
    
    let breadProps = {
     entities:entityBrowserData,
     entityName:"Permission",
     routingParamKey:"name",
     reader:true,
     adder:true,
     editor:true,
     deleter:true //use user.hasPermission on feature
    }

    return (
     <Router>
      <div className="App">
       <Bread {...breadProps}/>        
      </div>
     </Router>
    );
  }
}

export default App;
