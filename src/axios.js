import axios from 'axios';

export default axios.create({
 baseURL: 'http://localhost:1234',
 timeout: 1000,
 headers: {'X-Requested-With': 'XMLHttpRequest'},
 transformResponse : [
  data => {
   console.log('Logging Data on Transform Response');
   console.log(data);
   return data;
  }
 ]
});
