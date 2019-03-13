import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch,withRouter} from 'react-router-dom';
import _ from 'lodash';
import pluralize from 'pluralize';
import './App.css';
import EntityForm from './EntityForm';
import EntityBrowser from './EntityBrowser';

let UISchema = {
 name : {
  el : "input",//element tag
  label: "Permission Name",//label of the element
  attributes : {//element attributes
   name : "name",//currently required,see ?? improvement comment on EntityForm
   id:"permission-name",
   type: "text",
   minLength: 1,
   maxLength: 30
  }
 },
 label : {
  el : "input",
  label: "Permission Label",
  attributes : {
   name : "label",
   id:"permission-label",
   type:"text",
   minLength: 1,
   maxLength: 35
  }
 },
 category : {
  el: "select",
  label: "Category",
  attributes: {
   name: "category",
   id: "product_category",
   defaultValue:"WineID" //default selected value
  },
  
  options: [ //required if el = "select"
   {value: "SpiritID",text:"Spirit"},
   {value: "BeerID",text:"Beer"},
   {value: "WineID",text:"Wine"}
  ]
 }
}

let defaultReader = function(props){
 return (
 <EntityForm mode="read" edit delete onSubmit={this.onSubmit} entityName={this.props.entityName} {...props} uischema={UISchema} entity={props.location.state.entity} />
 )
}

let defaultAdder = function(props){
 return(
  <EntityForm mode="add" entityName={this.props.entityName} {...props} uischema={UISchema}  onSubmit={this.onSubmit} />
 )
}

let defaultEditor = function(props){
 return(
  <EntityForm mode="edit"  entityName={this.props.entityName} {...props} onSubmit={this.onSubmit} uischema={UISchema} entity={props.location.state.entity}  />
 )
}

//User must have at least READ permission to use BREAD ADD,EDIT,DELETE can be specified
//reader = boolean/object REQUIRED if object use object as reader,if boolean use defaultReader
//adder = boolean/object if object use object as adder,if boolean use defaultAdder
//editor = boolean/object if object use object as editor if boolean use defaultEditor
//delete = boolean if true,enables delete button on reader and entitybrowser
class Bread extends Component {




 constructor(props){
  super(props);
  this.onSubmit = this.onSubmit.bind(this);
  this.onEntityBrowserDelete = this.onEntityBrowserDelete.bind(this);
  this._init = this._init.bind(this);
  this._init();
  this.state = {
   entities : this.props.entities
  }
 }

 //init reader editor deleter adder
 _init(){
  switch(typeof this.props.reader){
   case 'boolean':
    if(this.props.reader === true){
     //use default reader
     this.reader = defaultReader.bind(this);
    }    
    break;
   case 'object'://note typeof null is also object
    if(this.props.reader === null){
     this.reader = defaultReader.bind(this);
    }else{
     this.reader = this.props.reader.ui;
    }
    break;
   case 'undefined':
    throw new Error('BREAD Exception: Must pass a reader prop to use BREAD');    
   default:
    let msg = `BREAD Exception: Invalid reader type. Reader MAY be null, true or object. If Reader is null or true,
     this indicates reader is enabled but lets Bread use the default reader. If Reader is an object, Bread will
     use the ui property of the object as reader.
    `;
    throw new Error(msg);
  }

  switch(typeof this.props.editor){
   case 'boolean':
    this.editor = defaultEditor.bind(this);
   break;
   case 'object':
    this.editor = this.props.editor;
   break;
   default:
    this.editor = null;
  }

  switch(typeof this.props.adder){
   case 'boolean':
    this.adder = defaultAdder.bind(this);
   break;
   case 'object':
    this.adder = this.props.adder;
   break;
   default:
    this.adder = null;
  }
  
  this.deleter = this.props.deleter; //not necessary but 
 }

  //adder,editor,reader forms action handler
  onSubmit(formdata,action){
   if(action === 'edit'){
    let path = `/${pluralize(this.props.entityName.toLowerCase())}/${formdata[this.props.routingParamKey]}/edit`;
    this.props.history.push(path,{state:formdata});
   }
   if(action === 'delete'){//delete action on entity form,not entity browser
    console.log('deleting',formdata);
    //delete 
   }
  }

  //delete button was sclicked on entitybrowser
  onEntityBrowserDelete(entity){
   
   let entities = Object.assign([],this.state.entities);
   let i = entities.findIndex(e=>e._id === entity._id);
   if(i !== -1){
    console.log('Deleting',entity);
    entities.splice(i,1);
    this.setState({entities});
   }

   //delete test scenario

   let l = setTimeout(()=>{
    console.log('Error Deleting');
    entities.splice(i,0,entity);//insert back on unsuccessful delete
    this.setState({entities});
   },6000);

  }


  get addPath(){
   return `/${pluralize(this.props.entityName.toLowerCase())}/:${this.props.routingParamKey}(add)`
  }

  get readPath(){
   return `/${pluralize(this.props.entityName.toLowerCase())}/:${this.props.routingParamKey}`
  }

  get editPath(){
   return `/${pluralize(this.props.entityName.toLowerCase())}/:${this.props.routingParamKey}/edit`
  }

  render() {
    let { routingParamKey, entityName } = this.props;
    let { reader,editor,adder,deleter } = this;
    let { entities } = this.state;
    let onEdit = this.onEntityBrowserEdit;
    let onDelete = this.onEntityBrowserDelete;
    let entityBrowserProps = { routingParamKey, entities, entityName, reader, editor, adder, deleter ,onEdit, onDelete};
    return (
        <Router>
         <React.Fragment>
          <Switch>
           <Route exact path={this.addPath} render={this.adder} />
           <Route exact path={this.readPath} render={this.reader} />
           <Route exact path={this.editPath} render={this.editor} />
          </Switch>
          <EntityBrowser {...entityBrowserProps}/> 
         </React.Fragment>
        </Router>
    );
  }
}



export default withRouter(Bread);

