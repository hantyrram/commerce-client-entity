import React, { Component } from 'react';
import _ from 'lodash';
import pluralize from 'pluralize';



/**
 * If no entity is prop the form is said to be in ADD mode, it means the form can be used in adding an entity.
 * If there is an entity prop but the entity has no _id property, the form is in READ mode.
 * If there is an entity prop AND the entity HAS _id property, the form is in EDIT mode.
 */
export const MODE = {
 ADD : "add",
 READ: "read",
 EDIT: "edit"
} 

/**
 * props
 *  uischema - The UI schema, describing the element to use for each input element on the form.
 *  entity - Entity Instance. The value object, with property names maps to the property names of the UI Schema. The value of each
 *           property of this object will be the value of the input elements with the same name.
 *  edit - Enable the Edit button on MODE.EDIT
 *  delete - Enable the Delete button on MODE.DELETE
 */
class EntityForm extends Component {
 constructor(props) {
  super(props);
  this.resetFields = this.resetFields.bind(this);
  this.getData = this.getData.bind(this);
  this.onChange = this.onChange.bind(this);
  this.onEdit = this.onEdit.bind(this);
  this.onDelete = this.onDelete.bind(this);
  this.onSave = this.onSave.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  let mode;
  let data = null;
  data = this.getData(this.props.uischema,this.props.entity);
  this.state = {data,mode};
 }


 //set the default values of state data based on the entity AND uischema defaultValue attributes
 //return data with default values
 //
 getData(uischema,entity){
  let data = {};
  if(!entity || !entity._id){//!entity or with entity but no ._id MODE = ADD
   //no entity,get structure of data from uischema,to initialize data properties
   //para we can still use this.state.data[p] as value of controlled component on "add" mode
   data = {};
   Object.getOwnPropertyNames(uischema).forEach(p=>{
    let attr = uischema[p].attributes; 
    data[p] = attr && attr.defaultValue ? attr.defaultValue : "";//use defaultValue on add if present
   });
   return data;
  }

  let copy = Object.assign({},entity);
   //check if one of the entity field/which is defined on the uischema is null or undefined
   //use the defaultValue set on the uischema attributes
   Object.getOwnPropertyNames(uischema).forEach(p=>{
    let attr = uischema[p].attributes; 
    if(!copy[p]){//property has no value, use default 
     copy[p] = attr && attr.defaultValue ? attr.defaultValue : "";//use defaultValue on add if present
    }
   });
   data = Object.assign({},copy);
  return data;
 }

 componentWillReceiveProps(nextProps){
  if(!nextProps.entity){
   this.resetFields();
   return;
  }

  if(!_.isEqual(nextProps.entity,this.state.data)){
   this.setState({data:this.getData(this.props.uischema,nextProps.entity)});
   return;
  }
 }


 /**
  * Clears the input fields and use the defaultValue from uischema.
  */
 resetFields(){
  let data = {};
  Object.getOwnPropertyNames(this.props.uischema).forEach(p=>{
   let attr = this.props.uischema[p].attributes; 
     data[p] = attr && attr.defaultValue ? attr.defaultValue : "";
  });
  console.log(data);
  this.setState({data});
 }


 componentDidMount(){
  //Update the state data when there are option elements with default values.
  //Get the option elements with "selected" attribute set,Get its parent select element using its name as property of data
  //then the value = to the selected options value.
  let optionElements = document.getElementsByTagName("option");
  if(optionElements.length > 0){
   let data = Object.assign({},this.state.data || {});
   for(let option of optionElements){
    if(option.attributes.selected){
     data[option.parentNode.name] = option.value; //
     this.setState({data});
    }
   }
  }


  
 }

 onChange(e){
  let data = Object.assign({},this.state.data || {});
  data[e.target.name] = e.target.value;
  this.setState({data,mode:this.state.mode});
 }

 onEdit(e){
  console.log(e);
  this.props.onSubmit(this.state.data,'edit');
 }

 onDelete(e){
  this.props.onSubmit(this.state.data,'delete');
 }

 onSave(e){
  this.props.onSubmit(this.state.data,'save');
 }

 onSubmit(e){
  e.preventDefault();
 }

 render() { 
  return( 
     <form action="" onSubmit={this.onSubmit} className="ht-ef-form">
      {
       Object.getOwnPropertyNames(this.props.uischema).map(p=>{
        let elAttributes = Object.assign({},this.props.uischema[p].attributes);
        //set value if present
        let element = null;
      
        switch(this.props.uischema[p].el){//??improvement: if no name attribute choose the uischema prop name as name of element
         case 'input':
          // let value = this.props.mode !== 'add'?this.state.data[p]:"";
          element = <input {...elAttributes} onChange={this.onChange} value={this.state.data[p]}/>
          break;
         case 'select':
          element = <select {...elAttributes} onChange={this.onChange}>{this.props.uischema[p].options.map(opt=><option key={opt.value} value={opt.value}>{opt.text}</option>)}</select>
          break;
         default:{
          elAttributes.onChange = this.onChange;
          element = React.createElement(this.props.uischema[p].el,elAttributes);//can add children as 3rd param
         }
        }
        return (
         <React.Fragment>
          <div className="ht-ef-form-inputgroup">
           {this.props.uischema[p].label?<label htmlFor={elAttributes.id}>{this.props.uischema[p].label}</label>:null}
           {element}
          </div>
         </React.Fragment>
        )
       })
      }
      <div className="ht-ef-form-actiongroup">
        {this.props.mode === MODE.READ && this.props.edit?<button name="ht-ef-form-action-edit" onClick={this.onEdit}>Edit</button>:null}
        {this.props.mode === MODE.READ && this.props.delete?<button name="ht-ef-form-action-delete" onClick={this.onDelete}>Delete</button>:null}
        {this.props.mode === MODE.ADD || this.props.mode === MODE.EDIT?<button name="ht-ef-form-action-save" onClick={this.onSave}>Save</button>:null}
      </div>
      {
       this.props.children
      }
     </form>
  );
 }
}
 
export default EntityForm;

//add no entity
//if pathname = ends with add, mode = add
//if pathname = endds with match.param