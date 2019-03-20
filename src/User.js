import Entity from './Entity';
import axios from './axios';
import Role from './Role';
import apis from './apis';

/**
 * @extends Entity
 */
class User extends Entity{
 constructor(object){
  super(object);
  Object.defineProperty(this,'roles',{value:[],writable:false,configurable:false});
 }
 /**
  * Adds a @see {Role}
  * @param {Role} role 
  */
 async addRole(role){
  let action = 'user_roles_add';
  if(!(role instanceof Role)){
   throw new Error('Invalid Role');
  }
  try {
   let response = axios.post(apis(action),[this._id]);
   let artifact = response.data;
   if(artifact.status === 'ok'){
    this.roles.push(artifact.entity); //entity = the added role
   }
   this.emit(action,artifact);
  } catch (error) {
   console.log(error);
  }
 }

 /**
  * @override 
  */
 addActionName(){
  return 'user_add';
 }

 /**
  * @override 
  */
 updateActionName(){
  return 'user_update';
 }
 
 /**
  * @override 
  */
 deleteActionName(){
  return 'user_delete';
 }
}

User.apiVersion = _ => 'apiv1'; //all actions

export default User;