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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClienteComponent } from './clientes/cliente.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { InmuebleComponent } from './inmuebles/inmueble.component';
import { QuillModule } from 'ngx-quill';
import { ContratoEditorComponent } from './contratos/editor/contrato-editor/contrato-editor.component';
import { ContratoComponent } from './contratos/contrato.component';



@NgModule({
  declarations: [
    CoreMenuComponent,
    ClientesComponent,
    InmueblesComponent,
    ContratosComponent,
    ClienteComponent,
    InmuebleComponent,
    ContratoEditorComponent,
    ContratoComponent
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
    ModalModule.forRoot(),
    TabsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    QuillModule.forRoot()

  ]
})
export class CoreModule { }
