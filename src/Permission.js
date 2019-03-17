import axios from './axios';
import Entity from './Entity';

/**
 * @extends Entity
 */
class Permission extends Entity{}
Permission.browse = async () => await axios.get(`/apiv1/permissions/browse`);

/**
 * @type {Entity~apiversion}
 * @param {?string} breadActionName -  
 */
Permission.apiVersion 
 = breadActionName => 
  Permission.breadApiVersions && Permission.breadApiVersions.length > 0? Permission.breadApiVersions[breadActionName] :'apiv1';

  
export default Permission;