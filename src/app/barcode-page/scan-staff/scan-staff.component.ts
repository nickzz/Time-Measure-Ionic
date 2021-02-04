import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from "@ionic-native/barcode-scanner/ngx";
import { LoadingController, Platform } from "@ionic/angular";
import { ApiService } from "./../../api.service";
import { Toast } from "@ionic-native/toast/ngx";

@Component({
  selector: "app-scan-staff",
  templateUrl: "./scan-staff.component.html",
  styleUrls: ["./scan-staff.component.scss"],
})
export class ScanStaffComponent implements OnInit, OnDestroy, AfterViewInit {
  selectedProduct: any;
  staffs: Worker[] = [];
  backButtonSubscription;
  empno:any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private platform: Platform,
    private toast: Toast,
    private apiService: ApiService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    // this.apiService
    //   .getAll()
    //   .pipe()
    //   .subscribe((response) => {
    //     this.staffs = response;
    //     console.log(this.staffs);
    //   });
  }

  // scan() {
  //   this.selectedProduct = {};
  //   this.barcodeScanner.scan().then((barcodeData) => {
  //     this.selectedProduct = this.staffs.find(product => product.plu === barcodeData.text);
  //     if(this.selectedProduct !== undefined) {
  //       this.productFound = true;
  //       console.log(this.selectedProduct);
  //     } else {
  //       this.selectedProduct = {};
  //       this.productFound = false;
  //       this.toast.show('Product not found', '5000', 'center').subscribe(
  //         toast => {
  //           console.log(toast);
  //         }
  //       );
  //     }
  //   }, (err) => {
  //     this.toast.show(err, '5000', 'center').subscribe(
  //       toast => {
  //         console.log(toast);
  //       }
  //     );
  //   });
  // }

  async scan(empno) {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    await loading.present();
    this.selectedProduct = {};
    this.barcodeScanner.scan().then(
      (barcodeData) => {
        this.empno = barcodeData.text;
        this.router.navigate(["scan-product", this.empno]);
        // this.selectedProduct = {};
        // this.toast
        //   .show("Product not found", "5000", "center")
        //   .subscribe((toast) => {
        //     console.log(toast);
        //   });
      },
      (err) => {
        this.toast.show(err, "5000", "center").subscribe((toast) => {
          console.log(toast);
        });
      }
    );
  }

  jom(){
    this.router.navigate(["scan-product", "70002"]);
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
