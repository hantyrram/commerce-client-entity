import axios from './axios';
import User from './User';
import apis from './apis';


class ActiveUser extends User{
 async authenticate(){
  const action = 'authenticate';
  try {
   let {data} = axios.get(apis('authenticate'));
   let artifact = data.data;
   if(artifact.status === 'ok'){
    let user = artifact.entity;
    this._id = user._id;
    this.username = user.username;
    this.emit(action,artifact);
    return this;
   }
  } catch (error) {
   
  }
 }

 async login(){
  const action = 'login';
  try {
   let response = await axios.post(apis(action),this);
   let artifact = response.data;
   if(artifact.status === 'ok'){
    let user = artifact.data.entity;
    this._id = user._id;
    this.username = user.username;
    this.emit(action,response);
   }
  } catch (error) {
   console.log(error);
  }
 }

 async logout(){
  const action = 'logout';
  try {
   let response = await axios.get(apis('logout'));
   let artifact = response.data;
   if(artifact.status === 'ok'){
    this.emit(action,artifact);
   }
  } catch (error) {
   console.log(error);
  }
 }
}

export default ActiveUser;