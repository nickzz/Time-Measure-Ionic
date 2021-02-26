import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { HTTP } from '@ionic-native/http/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { CommonModule } from "@angular/common";
import { ScanStaffComponent } from "./barcode-page/scan-staff/scan-staff.component";
import { ApiService } from "./api.service";
import { Toast } from "@ionic-native/toast/ngx";
import { ScanProductComponent } from "./barcode-page/scan-product/scan-product.component";
import { ViewProductComponent } from "./scan-page/view-product/view-product.component";
import { FormsModule } from "@angular/forms";
import { DetailProductComponent } from "./scan-page/detail-product/detail-product.component";

@NgModule({
  declarations: [
    AppComponent,
    ScanStaffComponent,
    ScanProductComponent,
    ViewProductComponent,
    DetailProductComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    BarcodeScanner,
    ApiService,
    Toast,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
