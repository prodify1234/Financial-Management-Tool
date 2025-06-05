// auth.interceptor.ts
import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const router = inject(Router)
  const authToken = sessionStorage.getItem('access_token'); // You can inject a service if needed
  
  if (req.headers.has('X-Skip-Interceptor')) {
    const newHeaders = req.headers.delete('X-Skip-Interceptor');
    const cleanReq = req.clone({ headers: newHeaders });
    return next(cleanReq);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(cloned).pipe(catchError((error)=>{
    console.log(error)
    if(error.status === 401 || error.status === 403) {
      sessionStorage.clear()
      router.navigate(['/login'])
      return throwError(() => error);
    }else{
      return throwError(() => error);
    }

  }));
};
