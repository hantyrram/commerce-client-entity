import Entity from './Entity';
import axios from './axios';

class User extends Entity{}

User.apiVersion = _ => 'apiv1'; //all actions