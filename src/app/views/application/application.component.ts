
import { Component , OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultConfig , Columns, Config, } from 'ngx-easy-table';
import { ApplicationService } from '../../service/application.service';


@Component({
  templateUrl: 'application.component.html'
})
export class ApplicationComponent implements OnInit, OnDestroy {
    public configuration: Config;
    public columns: Columns[];
    public applications: any[];
    public modelData = {
      id: null,
      appId: null,
      appName: null,
      appURL: null,
      appLogo: null,
      status : null,
      appDetail : {
       id : null,
       displayOrder: null,
       internalHost: null,
       externalHost: null,
       internalPort: null,
       externalPort: null
      },
      appEdition : {
        id: null,
        displayOrder: 1,
        description: null,
        monthlyRate: 0.0,
        startPayDay: 15,
        trail: true,
        version: 1.0,
      }
    };
    form: FormGroup;

    constructor(private modService: NgbModal ,
      private config: NgbModalConfig ,
      private fb: FormBuilder ,
      private applicationService: ApplicationService) {
    }

   ngOnInit(): void {
     this.applications = [     ];
     this.configuration = { ...DefaultConfig };
     this.configuration.orderEnabled = false;
     this.form = this.fb.group({
        id: [0],
        appId: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        appName: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        appURL: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        appLogo: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        status: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appDetail.id':  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(1)])],
        'appDetail.displayOrder':  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appDetail.internalHost': ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appDetail.internalPort': ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appDetail.externalHost': ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appDetail.externalPort': ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appEdition.id':  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(1)])],
        'appEdition.displayOrder':  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appEdition.description':  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appEdition.monthlyRate':  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appEdition.startPayDay':  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appEdition.trail':  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])],
        'appEdition.version':  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])]
      });
      this.columns = [
        { key: 'appLogo', title: 'App Logo', orderEnabled: false },
        { key: 'appId', title: 'App Id', orderEnabled: false },
        { key: 'appName', title: 'App Name', orderEnabled: false },
        { key: 'appURL', title: 'App URL', orderEnabled: false },
        { key: 'status', title: 'App status', orderEnabled: false }
      ];
      this.loadApplications();
   }
  loadApplications() {
    this.applicationService.getApplicationList().subscribe(
      applicationList => {
        this.applications = applicationList;
      },
    );
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
  }

  addApplication( content: any ) {
    this.modService.open(content, { size: 'lg', backdrop: 'static' });
  }

  updateApplication(content: any, application: any) {
    if ( application['appDetail'] == null) {
      application['appDetail'] = this.modelData.appDetail;
    }
    if ( application['appEdition'] == null) {
      application['appEdition'] = this.modelData.appEdition;
    }
    console.log('values=', application);
    this.modelData = application;
    this.modService.open(content, { size: 'lg', backdrop: 'static' });
  }

  saveApplication(values: any) {
      const application = this.buildRequest(values);
      if ( application['id'] != null) {
        this.applicationService.editApplication(application).subscribe(
          success => {
            this.loadApplications();
            this.modService.dismissAll();
          },
        );
      } else {
        this.applicationService.addApplication(application).subscribe(
          success => {
            this.loadApplications();
            this.modService.dismissAll();
          },
        );
      }
  }

  deleteApplication(values: any) {
    this.applicationService.deleteApplication(values.id).subscribe(
      success => {
        this.loadApplications();
        this.modService.dismissAll();
      },
    );
 }


  buildRequest(values){
    console.log('values=', values);
    const requstJson = {};
    requstJson['id'] = values.id;
    requstJson['appId'] = values.appId;
    requstJson['appName'] = values.appName;
    requstJson['appURL'] = values.appURL;
    requstJson['status'] = values.status;
    requstJson['appDetail'] = {};
    requstJson['appDetail']['id'] = values['appDetail.id'];
    requstJson['appDetail']['displayOrder'] = values['appDetail.displayOrder'];
    requstJson['appDetail']['internalHost'] = values['appDetail.internalHost'];
    requstJson['appDetail']['internalPort'] = values['appDetail.internalPort'];
    requstJson['appDetail']['externalHost'] = values['appDetail.externalHost'];
    requstJson['appDetail']['externalPort'] = values['appDetail.externalPort'];
    requstJson['appEdition'] = {
      id: values['appEdition.id'],
      displayOrder: values['appEdition.displayOrder'],
      description: values['appEdition.description'],
      monthlyRate: values['appEdition.monthlyRate'],
      startPayDay: values['appEdition.startPayDay'],
      trail: values['appEdition.trail'],
      version: values['appEdition.version']
    };
    console.log('requstJson=', requstJson);
    return requstJson;
  }

}
