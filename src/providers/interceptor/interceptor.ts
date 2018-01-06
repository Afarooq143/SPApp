import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token_id = localStorage.getItem("token");
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded') });
    if (token_id) {
      req = req.clone({
        headers: req.headers.set("Authorization", 'token_ ' + token_id)
      });
      req = req.clone({
        headers: req.headers.append("token_id", token_id)
      });     
    }
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          localStorage.clear();          
        }
      }
    });


  }
}
