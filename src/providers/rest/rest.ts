
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

/*
* import configuration service
*/
import { ConfigurationProvider } from '../configuration/configuration';

@Injectable()
export class RestProvider {
  private actionUrl: string;
  constructor(
    public http: HttpClient,
    private _configuration: ConfigurationProvider
  ) {
    this.actionUrl = _configuration.serverApi;
  }

   //login
  public login<T>(controller, data: any): Observable<T> {
    return this.http.post<T>(this.actionUrl + controller, data);
  }

 //signup
  public signup<T>(controller, data: any): Observable<T> {
    return this.http.post<T>(this.actionUrl + controller, data);
  }

  //get data from server
  public getAll<T>(controller): Observable<T> {
    return this.http.get<T>(this.actionUrl + controller);
  }


  //post(insert) data to server
  public add<T>(controller, data: any): Observable<T> {

    return this.http.post<T>(this.actionUrl + controller, data);
  }


  //get data from server by id
  public getSingle<T>(controller, id: string): Observable<T> {
    return this.http.get<T>(this.actionUrl + controller + '/' + id);
  }


  //post(update) data to server for update
  public update<T>(controller, id: number, data: any): Observable<T> {
    return this.http
      .put<T>(this.actionUrl + controller + '/' + id, data);
  }

  //post(update) data to server for update
  public delete<T>(controller, id: number): Observable<T> {
    return this.http.delete<T>(this.actionUrl + controller + '/' + id);
  }

}