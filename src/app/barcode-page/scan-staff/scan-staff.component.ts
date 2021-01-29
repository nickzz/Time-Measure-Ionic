import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from "@ionic-native/barcode-scanner/ngx";
import { LoadingController, Platform } from "@ionic/angular";
import { Staff } from "src/app/models/staff.model";
import { ApiService } from "./../../api.service";
import { Toast } from "@ionic-native/toast/ngx";

@Component({
  selector: "app-scan-staff",
  templateUrl: "./scan-staff.component.html",
  styleUrls: ["./scan-staff.component.scss"],
})
export class ScanStaffComponent implements OnInit, OnDestroy, AfterViewInit {
  data: any;
  encodeData: string;
  staffs: any[] = [];
  scanData: {};
  encodedData: {};
  backButtonSubscription;
  productFound:boolean = false;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private platform: Platform,
    private toast: Toast,
    public apiService: ApiService,
    public loadingController: LoadingController) {}


  ngOnInit() {
    this.getAllStaff();
  }

  async getAllStaff() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    await this.apiService.getAll()
      .subscribe(res => {
        console.log(res);
        this.data = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async scan() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.data = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.data = barcodeData.text;
      this.router.navigate(["scan-product", this.data]);
      // this.selectedProduct = this.staffs.find(res => res.EmpNo === barcodeData.text);
      // if(this.selectedProduct !== undefined) {
      //   this.productFound = true;
      //   console.log(this.productFound);
      //   console.log(this.selectedProduct);
      // } else {
      //   this.selectedProduct = {};
      //   this.productFound = false;
      //   console.log(this.productFound);
      //   this.toast.show('Product not found', '5000', 'center').subscribe(
      //     toast => {
      //       console.log(toast);
      //     }
      //   );
      // }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
    
  }

  // scan() {
  //   this.data = {};
  //   this.barcodeScanner.scan().then((barcodeData) => {
  //     this.data = barcodeData.text;
  //     this.router.navigate(["scan-product", this.data]);
      // this.selectedProduct = this.staffs.find(res => res.EmpNo === barcodeData.text);
      // if(this.selectedProduct !== undefined) {
      //   this.productFound = true;
      //   console.log(this.productFound);
      //   console.log(this.selectedProduct);
      // } else {
      //   this.selectedProduct = {};
      //   this.productFound = false;
      //   console.log(this.productFound);
      //   this.toast.show('Product not found', '5000', 'center').subscribe(
      //     toast => {
      //       console.log(toast);
      //     }
      //   );
      // }
  //   }, (err) => {
  //     this.toast.show(err, '5000', 'center').subscribe(
  //       toast => {
  //         console.log(toast);
  //       }
  //     );
  //   });
  // }

  // scan() {
  //   // this.selectedProduct = {};
  //   this.barcodeScanner.scan().then(
  //     (barcodeData) => {
  //       console.log("Barcode data", barcodeData.text);
  //       console.log("data", this.staffs);
  //       this.selectedProduct =  this.staffs.find(x => x.EmpNo == barcodeData.text);
  //       console.log("Selected Product",this.selectedProduct);

  //       if (this.selectedProduct) {
  //         this.router.navigate(["scan-product", barcodeData.text]);
  //       } else {
  //         this.selectedProduct = {};
  //         this.toast
  //           .show("Product not found", "5000", "center")
  //           .subscribe((toast) => {
  //             console.log(toast);
  //           });
  //       }
  //     },
  //     (err) => {
  //       this.toast.show(err, "5000", "center").subscribe((toast) => {
  //         console.log(toast);
  //       });
  //     }
  //   );
  // }

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

  // submit(info){
  //   console.log(info.value);
  //   this.router.navigate(["scan-product", info.value]);
  // }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
