import { API_URL } from "./ennvironment";

export let API = {

  createPerson: () => API_URL + 'persons',
  getAllPersons: () => API_URL + 'persons',
  createClient: ()=> API_URL + 'clients/register',
  loginClient: ()=>API_URL + 'clients/login',


  //package apis 
  getAllPackages: () => API_URL + 'packages',



  //persons apis
  
  CREATE_PERSON: API_URL + 'persons',
  //CLIENT APIS
  
  CREATE_CLIENT: API_URL + 'clients/register',
  LOGIN_CLIENT : API_URL + 'clients/login'

}