import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Toast } from "@ionic-native/toast/ngx";
import { LoadingController } from "@ionic/angular";
import { Scanning } from "src/app/models/scanning.model";
import { Worker } from "src/app/models/staff.model";
import { ApiService } from "./../../api.service";

@Component({
  selector: "app-scan-product",
  templateUrl: "./scan-product.component.html",
  styleUrls: ["./scan-product.component.scss"],
})
export class ScanProductComponent implements OnInit {
  data: any;
  empno = null;
  details: Worker = new Worker();
  product: Scanning;

  constructor(private route: ActivatedRoute, 
              private barcodeScanner: BarcodeScanner,
              private toast: Toast,
              public apiService: ApiService,
              public loadingController: LoadingController) {

                this.product = new Scanning();

                this.empno = this.route.snapshot.paramMap.get('empNo')
                console.log("ID", this.empno);

                this.apiService.getStaff(this.empno).subscribe(res => {
                  this.details = res[0];
                  console.log("res :", this.details);
                })
              }

  ngOnInit() {}

  // async getStaffDetail() {
  //   const loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Please wait...',
  //     duration: 2000
  //   });
  //   await loading.present();
  //   console.log("empNo", this.empno);
  //   await this.apiService.getStaff(this.empno)
  //     .subscribe(res => {
  //       this.details = res[0];
  //       console.log("res :", this.details);
  //       loading.dismiss();
  //     }, err => {
  //       console.log(err);
  //       loading.dismiss();
  //     });
  // }

  async scan() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.data = null;
    this.barcodeScanner.scan().then((barcodeData) => {
      this.data = barcodeData;
      this.data.text = this.product.barcode;
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
    
  }

  submitForm() {
    this.apiService.addProduct(this.product).subscribe((response) => {
      this.toast.show('Barcode saved successfully', '5000', 'center')
      // this.toast.show('Barcode saved successfully', '5000', 'center').subscribe(
      //           toast => {
      //             console.log(toast);
      //           }
      //         );
    });

  }

 
}
