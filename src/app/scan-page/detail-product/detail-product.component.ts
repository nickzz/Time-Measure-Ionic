import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-detail-product",
  templateUrl: "./detail-product.component.html",
  styleUrls: ["./detail-product.component.scss"],
})
export class DetailProductComponent implements OnInit {

  product = null;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController
  ) {
    this.product = this.navParams.get("data");
  }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
