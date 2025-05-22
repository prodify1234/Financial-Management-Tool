import { Injectable } from '@angular/core';

interface Credentials {
  access_token: string;
  token_type: string;
  clientId: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private client_id!: string;
  clientDetails!: Credentials;

  constructor() {
    let token = sessionStorage.getItem('access_token');
    if (token) {
      let credentials: Credentials = {
        access_token: token,
        token_type: sessionStorage.getItem('token_type') as string,
        clientId: sessionStorage.getItem('clientId') as string,
      };
      this.setCredentials(credentials);
    }
  }

  setCredentials(credentials: Credentials): void {
    console.log(credentials)
    this.clientDetails = { ...credentials };
    console.log(credentials , "credentials")
    sessionStorage.setItem('clientId', credentials.clientId);
    sessionStorage.setItem('access_token', credentials.access_token);
    sessionStorage.setItem('token_type', credentials.token_type);
    this.client_id = credentials.clientId;
  }

  get client() {
    return this.clientDetails;
  }

  get clientId() {
    return this.client_id;
  }
}
