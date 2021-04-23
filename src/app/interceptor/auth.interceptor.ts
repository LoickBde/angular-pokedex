import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('team')){
      const access_token: string | null =  this.authService.getAcessToken();

      if(!access_token || access_token == null){
        return next.handle(request);
      }

      const authReq = request.clone({
        headers: request.headers.set('Authorization', access_token)
      });
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
