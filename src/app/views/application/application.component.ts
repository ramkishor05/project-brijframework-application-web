
import { Component , OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultConfig , Columns, Config, } from 'ngx-easy-table';


@Component({
  templateUrl: 'application.component.html'
})
export class ApplicationComponent implements OnInit, OnDestroy {
    public configuration: Config;
    public columns: Columns[];
    public applications: any[];
    form: FormGroup;

    constructor( private modService: NgbModal, private config: NgbModalConfig, private fb: FormBuilder ) {
    }

   ngOnInit(): void {
     this.applications = [
        {
            appId: '+1 (934) 551-2224',
            appName: 20,
            appUrl: { street: 'North street', number: 12 },
            appLogo: 'ZILLANET',
            status: false
          }, {
            appId: '+1 (948) 460-3627',
            appName: 31,
            appUrl: { street: 'South street', number: 12 },
            appLogo: 'KNOWLYSIS',
            status: true
          }
     ];
     this.configuration = { ...DefaultConfig };
     this.configuration.orderEnabled = false;
     this.form = this.fb.group({
        appId: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        appName: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        appUrl: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        appLogo: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        status: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])]
      });
      this.columns = [
        { key: 'appId', title: 'App Logo', orderEnabled: false },
        { key: 'appId', title: 'App Id', orderEnabled: false },
        { key: 'appName', title: 'App Name', orderEnabled: false },
        { key: 'appUrl', title: 'App URL', orderEnabled: false },
        { key: 'status', title: 'App status', orderEnabled: false } 
      ];
   }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
  }

  addApplication( content ) {
    this.modService.open(content, { size: 'lg', backdrop: 'static' });
  }

  saveApplication(values) {
      console.log("values=",values);
    this.modService.dismissAll();
  }

}
