import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, pipe, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  // apiUrl = " http://192.168.8.101:8000/api";
  apiUrl = " http://10.111.99.6:80/api";

 

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error({
        "Backend returned code: ": error.status,
        "body was: ": error.error,
      });
    }
    return throwError("Something bad happened; please try again later.");
  }

  private extractData(res: Response) {
    let body = res;
    return body || [];
  }

  getDataUser(): Observable<any> {
    return this.http
      .get(this.apiUrl, this.httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  //Staff

  getAll(): Observable<any> {
    return this.http
      .get(this.apiUrl + "/staffs", this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getStaff(empNo:string): Observable<any> {
    const url = `${this.apiUrl}/check-staff/${empNo}`;
    return this.http
      .get<any>(url, this.httpOptions);
  }

  addProduct(data): Observable<any> {
    return this.http
      .post(this.apiUrl + "/scans", data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getProducts(empNo:string): Observable<any> {
    const url = `${this.apiUrl}/scans/${empNo}`;
    return this.http
      .get<any>(url, this.httpOptions);
  }

}
