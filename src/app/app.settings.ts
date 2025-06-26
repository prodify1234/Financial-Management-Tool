import { API_URL } from '../ennvironment';

export let API = {
  //person apis
  createPerson: () => API_URL + 'persons',
  getAllPersons: () => API_URL + 'persons',

  //client apis
  createClient: () => API_URL + 'clients/register',
  loginClient: () => API_URL + 'clients/login',
  getClientById: (clientId: string) => {
    return API_URL + `clients/${clientId}`;
  },

  //family-member apis¯
  getFamilyMemberDetails: (clientId: string) => {
    return (
      API_URL +
      'clients' +
      `/${clientId}` +
      '/family-members/relationship-details'
    );
  },
  addFamilyMemberDetails: () => {
    return API_URL + 'family-members';
  },
  updateFamilyMemberDetails: (clientId: string, person_id: string) => {
    return API_URL + `persons/${person_id}/clients/${clientId}/family-members`
  },
  deleteFamilyMemberDetails: (clientId: string, person_id: string) => {
    return (
      API_URL + `persons/${person_id}/clients/${clientId}/family-members`
    );
  },

  //accounts apis
  getAccountDetails:(clientId:string) => {
    return (
      API_URL + `clients/${clientId}/accounts`
    );
  },

  getLinkedAccountDetails:(clientId:string)=>{
    return (
      API_URL + `clients/${clientId}/linked-accounts`
    )
  },

  updateAccountDetails: (account_id:string)=>{
    return (
      API_URL +`accounts/${account_id}`
    )
  },

  deleteAccountDetails:(account_id:string)=>{
    return (
      API_URL + `accounts/${account_id}`
    )
  },

  getAccountHolderDetails:(clientId:string)=>{
    return (
      API_URL + `clients/${clientId}/account-holders`
    )
  },

  createAccount(){
    return (
      API_URL + `accounts`
    )
  },

  //categories apis
  getCategoriesList: (client_id: string ) => {
    return API_URL + `clients/${client_id}/category/search`;
  },
  postCategory: (client_id: string) => {
    return API_URL + `clients/${client_id}/categories`;
  },
  updateCategory: (client_id: string,category_id: string) => {
    return API_URL + `clients/${client_id}/categories/${category_id}`
  },
  deleteCategory: (client_id: string, category_id: string) => {
    return API_URL + `clients/${client_id}/categories/${category_id}`
  },

  //package apis
  getAllPackages: () => API_URL + 'packages',

  //file upload
  uploadFile: () => API_URL + 'generate-upload-url',

  validateFile: () => API_URL + 'validate-uploaded-file',

  //transaction details apis
  getTransactionDetails: (personId: string)=>{
    return API_URL + `persons/${personId}/statement-uploads`
  },
  getTransactionDetailsById: () => {
    return API_URL + `transactions/search`;
  },
  getStatementDetailsById:(personId: string, transactionId: string) => {
    return API_URL + `persons/${personId}/statement-uploads/${transactionId}`;
  },
  getTransactionsByStatementId:(accountId: string, statementId: string) => {
    return API_URL + `analyze/account/${accountId}/transactions/${statementId}`;
  },
  viewTransactionAnalaysis:()=>{
    return API_URL + `transactions-analysis/search`;
  },
  addTransaction: () => {
    return API_URL + `transactions`;
  },
  updateTransaction: (transactionId: string) => {
    return API_URL + `transactions/${transactionId}`;
  },
  deleteTransaction: (transactionId: string) => {
    return API_URL + `transactions/${transactionId}`;
  },

  //financial items APIs.
  getFinancialItems:()=>{
    return API_URL + `financial-items/search`
  },

  getAssets:()=>{
    const personId = sessionStorage.getItem('personId');
    return API_URL + `persons/${personId}/assets`
  },

  getLiabilities: ()=>{
    const personId = sessionStorage.getItem('personId');
    return API_URL + `persons/${personId}/liabilities`
  },

  getGenericCategories: ()=>{
    const clientId = sessionStorage.getItem('clientId');
    return API_URL + `clients/${clientId}/generic-category/search`
  },

  createFinancialItem:()=>{
    const personId = sessionStorage.getItem('personId');
    return API_URL + `persons/${personId}/assets`
  },

  createLiabilityItem:()=>{
    const personId = sessionStorage.getItem('personId');
    return API_URL + `persons/${personId}/liabilities`
  },

  //new
  getItemHeads:()=>{
    return API_URL + `class-based-analysis/heads/summary`;
  },

  getItemHeadDetails:()=>{
    return API_URL + `class-based-analysis/head/details`;
  },

  getClassificationItems:()=>{
    return API_URL + `class-based-analysis/items/cumulative`;
  },

  getItemDetails:()=>{
    return API_URL + `class-based-analysis/items/details`;
  },


  //dashboard APIs
  getCashFlow:()=>{
    const personId = sessionStorage.getItem('personId');
    return API_URL + `persons/${personId}/cashflow`
  },
};
