import axios from 'axios';

export default axios.create({
 baseURL: 'http://localhost:1234',
 timeout: 1000,
 headers: {'X-Requested-With': 'XMLHttpRequest'}
});