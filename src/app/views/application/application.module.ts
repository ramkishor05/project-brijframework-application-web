import { NgModule } from '@angular/core';

import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'ngx-easy-table';
import { CommonModule } from '@angular/common';
import { ApplicationRoleComponent } from './application.role.component';
@NgModule({
  imports: [
    FormsModule,
    NgbModule,
    TableModule,
    ReactiveFormsModule,
    CommonModule,
    ApplicationRoutingModule
  ],
  declarations: [ ApplicationComponent , ApplicationRoleComponent]
})
export class ApplicationModule {

}
