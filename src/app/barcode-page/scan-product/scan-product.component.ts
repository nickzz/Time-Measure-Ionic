import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Toast } from "@ionic-native/toast/ngx";
import { LoadingController } from "@ionic/angular";
import { Staff } from "src/app/models/staff.model";
import { ApiService } from "./../../api.service";

@Component({
  selector: "app-scan-product",
  templateUrl: "./scan-product.component.html",
  styleUrls: ["./scan-product.component.scss"],
})
export class ScanProductComponent implements OnInit {
  data: any = {};
  empno = "";

  constructor(private route: ActivatedRoute, 
              private barcodeScanner: BarcodeScanner,
              private toast: Toast,
              public apiService: ApiService,
              public loadingController: LoadingController) {

                this.empno = this.route.snapshot.paramMap.get('empNo')
                console.log("ID", this.empno);
              }

  ngOnInit() {
    this.getStaffDetail();
  }

  async getStaffDetail() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    console.log("empNo", this.empno);
    await this.apiService.getStaff(this.empno)
      .subscribe(res => {
        this.data = res;
        console.log("res :",this.data);
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
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
    
  }

 
}
