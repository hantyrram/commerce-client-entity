import axios from 'axios';
import Permission from './Permission';
/**
 * A static function attached to an Entity derived class which provides browsing functionality of the BREAD construct.
 * This function must be bounded with an Entity derived class, that this function will be used on.
 * 
 * @param {number} [limit] - The number of record to fetch, this will be added as a url query.
 * @return {Artifact | null} - The artifact of this action, or null on failure. 
 */
async function browse(){
 let apiVersion = this.apiVersion("browse");
 let path = this.browsePath || `/${apiVersion}/${this.name}/browse`;
 try {
  let response = await axios(path);
  let artifact = response.data.data;
  return artifact;
 } catch (error) {
  console.log(error);
  return null;
 }
}

Permission.browse = browse.bind(Permission);