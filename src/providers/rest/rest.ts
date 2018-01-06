
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

/*
* import configuration service
*/
import { ConfigurationProvider } from '../configuration/configuration';
import { UtilsProvider } from '../../providers/utils/utils';

@Injectable()
export class RestProvider {
  private actionUrl: string;
  public format: '.json';
  constructor(public http: HttpClient,
    private _configuration: ConfigurationProvider
  ) {
    this.actionUrl = _configuration.serverApi;
  }



  public login<T>(page, data: any): Observable<T> {

    return this.http.post<T>(this.actionUrl + page, data);
  }


  public signup<T>(page, data: any): Observable<T> {
    return this.http.post<T>(this.actionUrl + page, data);
  }

  //get data from server
  public getAll<T>(page): Observable<T> {
    // let headers = new HttpHeaders();
    // headers.append('Authorization', 'token '+localStorage.getItem("token"));
    return this.http.get<T>(this.actionUrl + page);
  }


  //post(insert) data to server
  public add<T>(page, data: any): Observable<T> {

    return this.http.post<T>(this.actionUrl + page, data);
  }


  //get data from server by id
  public getSingle<T>(page, id: string): Observable<T> {
    return this.http.get<T>(this.actionUrl + page + '/' + id);
  }


  //post(update) data to server for update
  public update<T>(page, id: number, data: any): Observable<T> {
    return this.http
      .put<T>(this.actionUrl + page + '/' + id, data);
  }

  //post(update) data to server for update
  public delete<T>(page, id: number): Observable<T> {
    return this.http.delete<T>(this.actionUrl + page + '/' + id);
  }

}

/*
* Use Interceptor to handle next requests
*/
// @Injectable()
// export class CustomInterceptor implements HttpInterceptor {
//   constructor(){}
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token_id = localStorage.getItem("token");
//     req = req.clone({ headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded') });
//     if (token_id != null) {
//       //  alert(token_id);
//       req = req.clone({
//         headers: req.headers.set("Authorization", 'token ' + token_id)
//       });
//       console.log(req);
//       console.log(req.body);
//       return next.handle(req).do((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           // do stuff with response if you want
//         }
//       }, (err: any) => {
//         if (err instanceof HttpErrorResponse) {
//           alert('Not connected');
//           if (err.status === 401) {
//             localStorage.clear();
//            // console.log(err);
           
//           }
//         }
//       });
//     } else {
//       console.log(req);
//       return next.handle(req).do((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           // do stuff with response if you want
//         }
//       }, (err: any) => {
//         if (err instanceof HttpErrorResponse) {
          
//           if (err.status === 401) {
//             //console.log(err);
//             localStorage.clear();
//           }
//         }
//       });
//     }


//   }
// }
