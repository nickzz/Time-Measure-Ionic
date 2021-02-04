import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { ApiService } from "src/app/api.service";

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.scss"],
})
export class ViewProductComponent implements OnInit {
  product: any;

  constructor(
    private apiService: ApiService,
    public loadingController: LoadingController
  ) {
    this.product = [];
  }

  ngOnInit() {
    this.getAllBarcode();
  }

  async getAllBarcode() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    await loading.present();
    await this.apiService.getProducts().subscribe(
      (res) => {
        console.log(res);
        this.product = res;
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
}
