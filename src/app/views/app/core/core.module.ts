import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { ContratosComponent } from './contratos/contratos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { CoreMenuComponent } from './core-menu.component';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';
import { ContextMenuModule } from 'ngx-contextmenu';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    CoreMenuComponent,
    ClientesComponent,
    InmueblesComponent,
    ContratosComponent,

  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    LayoutContainersModule,
    PagesContainersModule,
    PaginationModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class CoreModule { }
