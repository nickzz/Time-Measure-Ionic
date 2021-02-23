import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Toast } from "@ionic-native/toast/ngx";
import { AlertController, LoadingController } from "@ionic/angular";
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
  startDate = new Date();
  endDate = new Date();
  isDisabled: boolean = true;
  btnDisable: boolean = false;
  rest: string = "REST";

  constructor(
    private route: ActivatedRoute,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public alertCtrl: AlertController,
    public apiService: ApiService,
    public loadingController: LoadingController
  ) {
    this.product = new Scanning();

    this.empno = this.route.snapshot.paramMap.get("empNo");
  }

  ngOnInit() {
    this.getStaff();
  }

  async getStaff() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    await loading.present();
    await this.apiService.getStaff(this.empno).subscribe(
      (res) => {
        this.details = res[0];
        this.product.empNo = this.details.empNo;
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async scan() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    await loading.present();
    this.data = null;
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.data = barcodeData.text;
        this.product.barcode = this.data;
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  async submitForm() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 3000,
    });
    const alert = await this.alertCtrl.create({
      cssClass: "alertSave",
      message: "Data successfully saved.",
      buttons: ["OK"],
    });

    await loading.present();
    this.apiService.addProduct(this.product).subscribe((response) => {
      this.product.endTime = new Date();
      console.log("Semua sekali ", this.product);

      loading.dismiss();
      alert.present();
      this.clear();
    });
  }

  clear() {
    this.product.barcode = null;
    this.product.station = null;
    this.btnDisable = false;
    this.isDisabled = true;
  }

  isValid(): boolean {
    return (
      this.product.barcode != null &&
      this.product.empNo != null &&
      this.product.startTime != null &&
      this.product.station != null
    );
  }

  getStartDate() {
    this.product.startTime = new Date();
    console.log(this.product.startTime);
    this.btnDisable = true;
    this.isDisabled = false;
    this.toast
      .show("Barcode scanning has started.", "3000", "center")
      .subscribe((toast) => {
      });
  }

  getEndDate() {
    this.product.endTime = new Date();
    console.log(this.product.endTime);
    this.toast
      .show("Barcode scanning has ended.", "3000", "center")
      .subscribe((toast) => {
      });
  }

  getRestPeriod() {
    if (
      this.product.startRestTime == null &&
      this.product.endRestTime == null
    ) {
      this.product.startRestTime = new Date();
      this.rest = "CONTINUE";
      this.isDisabled = true;
      console.log(this.product.startRestTime);
      this.toast
        .show("Pause the process.", "3000", "center")
        .subscribe((toast) => {
          console.log(toast);
        });
    } else {
      this.product.endRestTime = new Date();
      this.rest = "REST";
      this.isDisabled = false;
      console.log(this.product.endRestTime);
      this.toast
        .show("Continue scanning.", "3000", "center")
        .subscribe((toast) => {
        });
    }
  }
}
