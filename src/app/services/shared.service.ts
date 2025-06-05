import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {



  /** Dependencies */
  private http = inject(HttpClient)
  constructor() {}
  downloadFileFromS3(s3Url: string, fileName: string) {
   this.http.get(s3Url,{ 
    responseType: 'blob'  ,
    headers: new HttpHeaders({ 'X-Skip-Interceptor': 'true' })
   }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }


}
