import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanProductComponent } from './scan-product.component';

describe('ScanProductComponent', () => {
  let component: ScanProductComponent;
  let fixture: ComponentFixture<ScanProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanProductComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
