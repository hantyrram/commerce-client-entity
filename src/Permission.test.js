import axios from './axios';
import Permission from './Permission';

jest.mock('./axios');

it('Can save a valid permission',async ()=>{
 let response = {
  data: {
   status: 'ok',
   data: {
    entity: {_id: 1234, name:'test_permission',label:'test_label'}
   }
  }
 }
 axios.post.mockResolvedValue(response);
 let permission = new Permission({name:'test_permission',label:'test_label'});

 let p = await permission.save();
 expect(p._id).toEqual(1234);
});
