import { API_URL } from "./ennvironment";

export let API = {
  //persons apis
  CREATE_PERSON: API_URL + 'persons',


  //CLIENT APIS
  CREATE_CLIENT: API_URL + 'clients/register',
  LOGIN_CLIENT : API_URL + 'clients/login'

}