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

  apiUrl = " http://localhost:80/api";

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

  // getAll(): Observable<any> {
  //   return this.http
  //     .get(this.apiUrl + "/staffs", this.httpOptions)
  //     .pipe(map(this.extractData), catchError(this.handleError));
  // }

  getAll(): Observable<any> {
    return this.http
      .get(this.apiUrl + "/staffs", this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // getStaff(empNo: string): Observable<any> {
  //   const url = `${this.apiUrl}/check-staff/${empNo}`;
  //   return this.http.get(url, this.httpOptions);
  //   // .pipe(
  //   //   map(this.extractData),
  //   //   catchError(this.handleError));
  // }

  getStaff(empNo:string): Observable<any> {
    const url = `${this.apiUrl}/check-staff/${empNo}`;
    return this.http
      .get<any>(url, this.httpOptions);
  }

  createStaff(data): Observable<any> {
    const url = `${this.apiUrl}/add_with_staff`;
    return this.http
      .post(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateStaff(empNo: string, data): Observable<any> {
    const url = `${this.apiUrl}/${empNo}`;
    return this.http
      .put(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteStaff(empNo: string): Observable<{}> {
    const url = `${this.apiUrl}/${empNo}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // create(staff:Staff): Observable<Staff> {
  //   return this.http
  //     .post<Staff>(
  //       this.apiUrl + "/staff",
  //       JSON.stringify(staff),
  //       this.httpOptions
  //     )
  //     .pipe(catchError(this.handleError));
  // }

  // update(empNo:string, staff:Staff): Observable<Staff> {
  //   return this.http
  //     .put<Staff>(
  //       this.apiUrl + "/posts/" + empNo,
  //       JSON.stringify(staff),
  //       this.httpOptions
  //     )
  //     .pipe(catchError(this.handleError));
  // }

  // delete(empNo:string) {
  //   return this.http
  //     .delete<Staff>(this.apiUrl + "/staffs/" + empNo, this.httpOptions)

  //     .pipe(catchError(this.handleError));
  // }

  addProduct(data): Observable<any> {
    const url = `${this.apiUrl}/staff/scans`;
    return this.http
      .post(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getProducts(): Observable<any> {
    return this.http
      .get(this.apiUrl + "/staff/scans", this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
