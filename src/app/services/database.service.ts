import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';

export interface Staff {
  staffId: number;
  staffName: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    staff = new BehaviorSubject([]);

    apiUrl = 'https://localhost:44302/api';
    constructor(public  http: HttpClient) {
      console.log('Hello RestPorvider Provider');
     }

    getModel(){
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/testing').subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
}
