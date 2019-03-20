
import ActiveUser from './ActiveUser';
import { subscribe } from './artifactEmitter';

// jest.mock('./axios');

it('It can login a user',async done =>{
 let u = subscribe('login',(response)=>{
  console.dir(response);
  u();
 });
 let user = new ActiveUser({username:'genesis',password:'genesis'});
 try {
  await user.login();
  expect(user._id);
  done();
 } catch (error) {
  console.log(error);
 }
 
});
