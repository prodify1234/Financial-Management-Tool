import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, private httpBackend: HttpBackend) { }

  uploadFile(body:any) {
    return this.http.post(API.uploadFile(), body)
  }

  uploadToS3(presigned_url:any, selectedFile:any){
    console.log('Selected Type: ', selectedFile.type)
    const http = new HttpClient(this.httpBackend);
    const headers = new HttpHeaders({'Content-Type': selectedFile.type});

    return http.put(presigned_url, selectedFile, {headers});
  }

  validateFile(body:any) {
    return this.http.post(API.validateFile(), body)
  }


}
