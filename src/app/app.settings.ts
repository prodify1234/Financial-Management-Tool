import { API_URL } from '../ennvironment';

export let API = {
  //person apis
  createPerson: () => API_URL + 'persons',
  getAllPersons: () => API_URL + 'persons',

  //client apis
  createClient: () => API_URL + 'clients/register',
  loginClient: () => API_URL + 'clients/login',
  getClientById : (clientId:string) => {
    return API_URL + `clients/${clientId}`
  },

  //family-member apis
  getFamilyMemberDetails: (clientId: string) => {
    return (
      API_URL +
      'clients' +
      `/${clientId}` +
      '/family-members/relationship-details'
    );
  },
  addFamilyMemberDetails: () => {
    return API_URL + 'family/members';
  },
  updateFamilyMemberDetails: (clientId: string) => {
    return API_URL + 'clients/' + `${clientId}/` + 'relationship-update';
  },
  deleteFamilyMemberDetails: (clientId: string, person_id: string)=>{
    return API_URL + `clients/` + `${clientId}` + `/family-members/` + `${person_id}`;
  },

  //categories apis
  getCategoriesList: (currentPage?: number,rowsOnPage?: number) => {
    return API_URL+ 'category/search';
  },

  //package apis
  getAllPackages: () => API_URL + 'packages',

  //persons apis
  CREATE_PERSON: API_URL + 'persons',
  //CLIENT APIS

  CREATE_CLIENT: API_URL + 'clients/register',
  LOGIN_CLIENT: API_URL + 'clients/login',
};
