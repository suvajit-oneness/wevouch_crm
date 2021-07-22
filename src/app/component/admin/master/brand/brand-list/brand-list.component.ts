import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }
  public brandList: any = [];

  ngOnInit(): void {
    this.getBrandList();
  }

  getBrandList() {
    this._loader.startLoader('loader');
    this._api.brandList().subscribe(
      res => {
        console.log(res);
        this.brandList = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }

}
