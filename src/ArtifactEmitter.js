
/**
 * Function returned by @see {ArtifactEmitter#on} that can be used to unsubsribe to an action.
 * 
 * @typedef {function} ArtifactEmitter~unsubscribe
 * 
 */

/**
 * Emits artifacts, based on the subscribed action.
 */
class ArtifactEmitter{
 constructor(){
  this.subscribers = [];
 }

 /**
  * Emits an Artifact that was produced by an action.
  * 
  * @param {string} action - The name of the action.
  * @param {Object} artifact - The Artifact that will be sent to the subscriber of the action.
  */
 emit(action,artifact){
  for(let i in this.subscribers){
   if(this.subscribers[i].action === action){
     this.subscribers[i].subscriber(artifact);
   }
  }
 }

 /**
  * @param {string} action - The action to subscribe to.
  * @param {function} callback - The listener.
  * @return {ArtifactEmitter~unsubscribe} - The function that can be used to unsubscribe.
  */
 on(action,callback){
  let index = this.subscribers.push({action:action,subscriber:callback}) - 1;
  let unsubscribe = (i)=>{
   this.subscribers.splice(i,1);
  }
  return unsubscribe.bind({},index);
  }
 } 

export default ArtifactEmitter;

//artifact


 