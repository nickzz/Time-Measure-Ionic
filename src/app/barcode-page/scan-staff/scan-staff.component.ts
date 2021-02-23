import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { LoadingController, Platform, ToastController } from "@ionic/angular";
import { ApiService } from "./../../api.service";

@Component({
  selector: "app-scan-staff",
  templateUrl: "./scan-staff.component.html",
  styleUrls: ["./scan-staff.component.scss"],
})
export class ScanStaffComponent implements OnInit, OnDestroy, AfterViewInit {
  selectedProduct: any;
  staffs: any;
  backButtonSubscription;
  empno: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController,
    private apiService: ApiService,
    public loadingController: LoadingController
  ) {
    this.staffs = [];
  }

  ngOnInit() {
    this.getStaffList();
  }

  getStaffList() {
    this.apiService.getAll().subscribe((res) => {
      this.staffs = res;
    });
  }

  async scan() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    const toast = await this.toastCtrl.create({
      message: 'Id staff not found',
      duration: 3000,
      position: 'bottom'
    });
    
    await loading.present();
    this.selectedProduct = {};
    this.barcodeScanner.scan().then(
      (barcodeData) => {
        this.empno = barcodeData.text;
        this.selectedProduct = this.staffs.find((x) => x.empNo === this.empno);
        if (this.selectedProduct !== undefined) {
          console.log(this.selectedProduct);
          this.router.navigate(["scan-product", this.empno]);
        } 
        else 
        {
          toast.present();
        }
      }).catch(err => {
        console.log('Error', err);
    });
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
