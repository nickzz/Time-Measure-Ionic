import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoadingController, ModalController } from "@ionic/angular";
import { ApiService } from "src/app/api.service";
import { Scanning } from "src/app/models/scanning.model";
import { DetailProductComponent } from "../detail-product/detail-product.component";

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.scss"],
})
export class ViewProductComponent implements OnInit {
  product: any;
  empno = null;

  constructor(
    private apiService: ApiService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private route: ActivatedRoute,
  ) {
    this.product = [];
    this.empno = this.route.snapshot.paramMap.get("empNo");
    console.log(this.empno)
  }

  ngOnInit() {
    this.getAllBarcode();
  }

  async getAllBarcode() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
    await this.apiService.getProducts(this.empno).subscribe(
      (res) => {
        this.product = res;
        console.log(this.product)
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async onRowSelected(x: Scanning){
    const modal = await this.modalController.create({
      component: DetailProductComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'data': x
      }
    });
    return await modal.present();
  }
}
