import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { ApplicationRoleComponent } from './application.role.component';

const routes: Routes = [
  { path: '', component: ApplicationComponent},
  { path: 'detail',  component : ApplicationComponent },
  { path: 'feature',  component : ApplicationRoleComponent },
  { path: 'role',  component : ApplicationRoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {}
