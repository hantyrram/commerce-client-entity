import pluralize from 'pluralize';
import axios from './axios';
import ArtifactEmitter from "./ArtifactEmitter";

/**
 * A function that returns the api version of the BREAD action. Entity Child classes MUST implement this function as static
 * function.
 * 
 * @typedef {function} Entity~apiVersion
 * @param {string} [action] - The BREAD action e.g. "add" 
 * @return {string} - The api version that'll be used as url prefix. Example, if action = "add" returned value will be used
 * as prefix for the add action url, e.g. /apiv1/<add path>
 */


 /**
 * A static string that an Entity subclass may provide. This string is used by Entity as path when saving the entity.
 * 
 * @typedef {string} Entity~addPath 
 */

/**
 * @classdesc Represents the base class of all entities. This class must be extended and not to be instantiated directly.
 * 
 * @constructor
 * @param {?object} object - If present initializes the entity with this object.
 */
class Entity extends ArtifactEmitter{
 constructor(object){
  super();
  if(object && typeof object !== 'object') throw new Error(`@Entity : ${object} is not of type object `);
  Object.assign(this,object);
 }

 /**
  * Saves the entity. Checks if the derived class has a static property @link{Entity~addPath} and uses it as
  * the path to the post request.
  * If instance has no _id, then this method will add the entity. If _id is present it will send an UPDATE 
  * request.
  */
 async save(){
  let artifact;
  if(!this._id){
   try {
     let response = await axios.post(this.addPath,this);
     let artifact = response.data;
     if(artifact.status === 'ok'){
      Object.assign(this,artifact.data.entity);
      this.emit(artifact);
      return this;
     }
      this.emit(artifact);
      return false;
   } catch (error) {
      console.log(error);
     this.emit(artifact);
     return false;
   }
  }

  try {
   let response = await axios.post(this.editPath,this);
   let artifact = response.data;
    if(artifact.status === 'ok'){
      Object.assign(this,artifact.data.entity);
      this.emit(artifact);
      return this;
    }
    this.emit(artifact);
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
  
 }

 async delete(){
  let artifact;
  try {
   let response = await axios.delete(this.deletePath,this);
   artifact = response.data;
   if(artifact.status === 'ok'){
     let id = this._id;
     Object.getOwnPropertyNames(this).forEach(p=>{
       delete this[p];
     });
     return id;
   }
   this.emit(artifact);
   return false;
  } catch (error) {
   console.log(error);
  }
  
 }

 /**
  * Constructs the default api url to be used when updating the entity. The generated url is comprised of, 1. the static 
  * apiVersion 2. The pluralize name of the childclass and in lowercase form. 3. The _id of the entity as a url parameter
  * 4. The suffix "edit".
  * 
  * To use a different editPath, the child class must override this getter.
  * @return {string} - The apis path to use when updating the entity.
  */
 get editPath(){
  let apiVersion = this.constructor.apiVersion("edit");
  let path = `/${apiVersion}/${pluralize(this.constructor.name.toLowerCase())}/${this._id}/edit`;
  return path;
 }

 /**
  * Constructs the default api url to be used when adding an entity. The generated url is comprised of, 1. the static 
  * apiVersion 2. The pluralize name of the childclass and in lowercase form.
  * 
  * To use a different addPath, the child class must override this getter.
  * 
  * @return {string} - The apis path to use when adding the entity.
  */
 get addPath(){
  let apiVersion = this.constructor.apiVersion("add");
  let path = `/${apiVersion}/${pluralize(this.constructor.name.toLowerCase())}`;
  return path;
 }
}



Object.defineProperty(Entity.prototype,'save',{writable:false,configurable:false});
Object.defineProperty(Entity.prototype,'delete',{writable:false,configurable:false});

export default Entity;




