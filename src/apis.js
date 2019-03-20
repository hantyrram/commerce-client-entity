const API_VERSION = 'apiv1';

export default (action,params) =>{
 switch(action){
  case 'authenticate': return `/${API_VERSION}/authenticate`;
  case 'login': return `/${API_VERSION}/login`;
  case 'logout': return `/${API_VERSION}/logout`;
  //where params[0] = user._id
  case 'user_permissions_read': return `/${API_VERSION}/users/${params[0]}/permissions`;
  case 'user_create': return `/${API_VERSION}/users/create`;
  //where params[0] = user._id
  case 'user_update': return `/${API_VERSION}/users/${params[0]}`;
  case 'user_delete': return `/${API_VERSION}/users/${params[0]}`;
  //where params[0] = user._id
  case 'user_roles_add' : return `/${API_VERSION}/users/${params[0]}/roles/add`;
  case 'user_roles_delete' : return `/${API_VERSION}/users/${params[0]}/roles/delete`;
  case 'permission_browse' : return `/${API_VERSION}/permissions`;
  default : return null;
 }
}