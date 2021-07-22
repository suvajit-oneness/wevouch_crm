import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _api:ApiService,private _loader : NgxUiLoaderService,private _router:Router) {
    this._loader.startLoader('loader');
  }
  public errorMessage = '';
  ngOnInit(): void {
    // if(this._api.isAuthenticated()){
    //   this._router.navigate(['/dashboard']);
    // }
    this._loader.stopLoader('loader');
  }

  userLoginSubmit(formData){
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      this._loader.startLoader('loader');
      this._api.userLoginAPI(mainForm).subscribe(
        res => {
          if(res.error == false){
            // this._api.storeUserLocally(res);
            console.log(res);
            // return false;
          }else{
            this.errorMessage = res.message;
          }
          console.log(res);
          this._loader.stopLoader('loader');
        },
        err => {
          console.log(err.message)
          this.errorMessage = err.message;
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
    // console.log('Form Data SUbmitted');
  }

}
