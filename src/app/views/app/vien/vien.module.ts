import { NgModule } from '@angular/core';
import { StartComponent } from './start/start.component';
import { VienComponent } from './vien.component';
import { VienRoutingModule } from './vien.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
// import { DashboardsContainersModule } from 'src/app/containers/dashboards/dashboards.containers.module';

@NgModule({
  declarations: [VienComponent, StartComponent],
  imports: [
    SharedModule,
    LayoutContainersModule,
    VienRoutingModule
    // DashboardsContainersModule
  ]
})
export class VienModule { }
