import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('token') ?? '';

    if (jwtToken) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${jwtToken}` }
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
  
}
