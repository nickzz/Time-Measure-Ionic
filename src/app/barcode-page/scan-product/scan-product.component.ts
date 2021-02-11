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
    console.log("ID", this.empno);

    this.getStaff();
  }

  ngOnInit() { }

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
        console.log("res :", this.details);
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
    this.barcodeScanner.scan().then(
      (barcodeData) => {
        this.data = barcodeData.text;
        this.product.barcode = this.data;
      },
      (err) => {
        this.toast.show(err, "5000", "center").subscribe((toast) => {
          console.log(toast);
        });
      }
    );
  }

  async submitForm() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    const alert = await this.alertCtrl.create({
      cssClass: "alertSave",
      message: "Data successfully saved.",
      buttons: ["OK"],
    });

    await loading.present();
    this.apiService.addProduct(this.product).subscribe((response) => {
      this.product.startTime = new Date();
      console.log(this.product.startTime);
      loading.dismiss();
      alert.present();
      this.clear();
      
    });
  }

  clear(){
    this.product.barcode = null;
    this.product.station = null;
  }
}
