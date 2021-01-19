import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scan-staff',
  templateUrl: './scan-staff.component.html',
  styleUrls: ['./scan-staff.component.scss'],
})
export class ScanStaffComponent implements OnInit {

  data: any;
  encodeData: string;
  encodedData: {};

  constructor(private barcodeScanner: BarcodeScanner, private router: Router) {}

  ngOnInit() {}

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

}
