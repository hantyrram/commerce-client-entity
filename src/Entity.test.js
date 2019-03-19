import Entity from './Entity';
import axios from './axios';
jest.mock('./axios');

it('Saving returns instance of child',async done => {
 let response = {
  data : {
   status: 'ok',
   data : { entity : {_id : 1234, fieldOne: 'Field One Value', fieldTwo: 'field Two Value'} }
  }
 }
 axios.post.mockResolvedValue(response);
 class X extends Entity{ }
 X.apiVersion = ()=>'apiv1';
 let x = new X();
 expect(await x.save()).toBeInstanceOf(X);
 done();
})

it('Saving returns false when status is not ok', async done => {
 let response = {
  data : {
   status: 'nok',
  }
 }
 axios.post.mockResolvedValue(response);
 class X extends Entity{ }
 X.apiVersion = ()=>'apiv1';
 let x = new X();
 expect(await x.save()).toBe(false);
 done();
});

it('Deleting returns the _id of the entity', async done => {
 let response = {
  data : {
   status: 'ok',
  }
 }
 axios.delete.mockResolvedValue(response);
 class X extends Entity{ }

 X.apiVersion = ()=>'apiv1';
 let x = new X();
 x._id = 1234;
 expect(await x.delete()).toBe(1234);
 done();
});



