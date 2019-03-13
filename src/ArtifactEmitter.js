class ArtifactEmitter{
 constructor(){
  this.subscribers = [];
 }

 emit(action,artifact){
  for(let i in this.subscribers){
   if(this.subscribers[i].action === action){
     this.subscribers[i].subscriber(artifact);
   }
  }
 }

 on(action,callback){
  let index = this.subscribers.push({action:action,subscriber:callback}) - 1;
  let unsubscribe = (i)=>{
   this.subscribers.splice(i,1);
  }
  return unsubscribe.bind({},index);
  }
 } 
/**
 * Used to provide features with capability to emit actions, and other components to subscribe to these
 * actions.
 * 
 * 
 */

export default ArtifactEmitter;


 