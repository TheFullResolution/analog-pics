import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material/material.module'
import { LoginComponent } from './login/login.component'
import { CmsRoutingModule } from './cms-routing.module'
import { CmsComponent } from './cms.component'

@NgModule({
  imports: [MaterialModule, CommonModule, CmsRoutingModule],
  declarations: [LoginComponent, CmsComponent],
})
export class CmsModule {}
