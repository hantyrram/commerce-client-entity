
import ActiveUser from './ActiveUser';
import { subscribe } from './artifactEmitter';
import Permission from './Permission';
require('dotenv').config();
// jest.mock('./axios');

let username = process.env.TEST_USERNAME;
let password = process.env.TEST_PASSWORD;
let user;

beforeAll(()=>{
 user = new ActiveUser({username,password});
 console.log(user);
 return user.login();
});

afterAll(()=>{
 return user.logout();
});

it('It can save permission',async done =>{
 let permission = new Permission({name:'test_permission',label:'test_label'});
 await permission.save();
 console.log(permission);
 expect(permission._id).toBeDefined();
});
