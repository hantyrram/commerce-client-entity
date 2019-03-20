/**
 * @namespace ArtifactEmitter
 */

/**
 * Function returned by @see {ArtifactEmitter#on} that can be used to unsubsribe to an action.
 * 
 * @typedef {function} ArtifactEmitter~unsubscribe
 * 
 */


 /**
  * Contains the list of subscribers.
  * @const
  * @inner  
  * @prop {Array} subsribers
  */
 const subscribers = [];

 /**
  * @func
  * @param {string} action - The action to subscribe to.
  * @param {function} callback - The listener.
  * @return {ArtifactEmitter~unsubscribe} - The function that can be used to unsubscribe.
  */
 export const subscribe = (action,callback) => {
  let index = subscribers.push({action:action,subscriber:callback}) - 1;
  let unsubscribe = (i)=>{
   this.subscribers.splice(i,1);
  }
  return unsubscribe.bind({},index);
 }

 /**
  * Emits an Artifact that was produced by an action.
  * @func
  * @param {string} action - The name of the action.
  * @param {Object} artifact - The Artifact that will be sent to the subscriber of the action.
  */
 export const emit = (action,artifact) => {
  for(let i in subscribers){
   if(subscribers[i].action === action){
     subscribers[i].subscriber(artifact);
   }
  }
 }


//artifact


 