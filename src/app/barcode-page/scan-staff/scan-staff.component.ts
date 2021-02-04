import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { DatabaseService } from '../../services/database.service'

@Component({
  selector: 'app-scan-staff',
  templateUrl: './scan-staff.component.html',
  styleUrls: ['./scan-staff.component.scss'],
})
export class ScanStaffComponent implements OnInit {

  data: any;
  dataa: [];
  encodeData: string;
  encodedData: {};

  datas: Observable<any>;

  testing: any;

  constructor(private barcodeScanner: BarcodeScanner, private router: Router, public http: HttpClient,
              private nativeHttp: HTTP, private plt: Platform, private loadingCtrl: LoadingController,
              public navCtrl: NavController, public databaseService: DatabaseService) {

                this.getModel();
              }

  ngOnInit() {}

  getModel(){
    this.databaseService.getModel()
    .then(data => {
      this.testing = data;
      console.log(this.testing);
    });
  }
  

  scan() {
    this.data = null;
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        console.log("Barcode data", barcodeData);
        this.data = barcodeData;
        this.router.navigate(['second'], {state: {data: this.data}});
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  encodeText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        (encodedData) => {
          console.log(encodedData);
          this.encodedData = encodedData;
          console.log(this.encodeData);
        },
        (err) => {
          console.log("Error occured : " + err);
        }
      );
  }

  async getDataStandard(){
    let loading = await this.loadingCtrl.create();
    await loading.present();

    this.http.get('https://localhost:44362/api/staff').pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(dataa => {
      this.dataa = dataa['result'];

    }, err => {
      console.log('JS Call error:', err);
    });

    // var url = 'https://localhost:44362/api/staff';
    // this.datas = this.http.get(url);
    // this.datas.subscribe(data =>{
    //   console.log(data);
    // });

  }

  async getDataNativeHttp(){

    let loading = await this.loadingCtrl.create();
    await loading.present();

    let nativeCall = this.nativeHttp.get('https://localhost:44362/api/staff', {}, {
      'Content-Type': 'application/json'
    });

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(dataa => {
      console.log('native data:', dataa);

      this.data = JSON.parse(dataa.data);
    }, err => {
      console.log('JS Call error:', err);
    });
  }

  getDataEverywhere(){
    this.plt.is('cordova') ?  this.getDataNativeHttp() : this.getDataStandard();
  }

  gotoHomePage() {
    this.navCtrl.navigateForward('home');
  }

  gotonextpage(){
    this.router.navigate(['other']);
  }

}
