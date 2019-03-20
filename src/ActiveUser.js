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
   console.log(apis(action));
   let response = await axios.post(apis(action),this);
   console.log(response);
   let artifact = response.data.data;
   if(artifact.status === 'ok'){
    let user = artifact.entity;
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
   let response = axios.post(apis('logout'),this);
   let artifact = response.data.data;
   if(artifact.status === 'ok'){
    let user = artifact.entity;
    this._id = user._id;
    this.username = user.username;
    this.emit(action,response);
   }
  } catch (error) {
   console.log(error);
  }
 }
}

export default ActiveUser;