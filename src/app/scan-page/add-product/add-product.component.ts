import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  form: FormGroup;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      station: new FormControl('', [Validators.required]),
      barcode: new FormControl('', Validators.required)
    });

  }

  submit(){
    console.log(this.form.value);
    this.apiService.addProduct(this.form.value).subscribe(res => {
         console.log('Barcode added successfully!');
    })

  }

}
