import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ScanProductComponent } from "./barcode-page/scan-product/scan-product.component";
import { ScanStaffComponent } from "./barcode-page/scan-staff/scan-staff.component";
import { ViewProductComponent } from "./scan-page/view-product/view-product.component";

const routes: Routes = [
  { path: "scan-staff", component: ScanStaffComponent },
  { path: "scan-product/:empNo", component: ScanProductComponent },
  { path: "products", component: ViewProductComponent },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: "",
    redirectTo: "scan-staff",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
