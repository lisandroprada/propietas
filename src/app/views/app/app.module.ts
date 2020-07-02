import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientesComponent } from './clientes/clientes.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';


@NgModule({
  declarations: [BlankPageComponent, AppComponent, ClientesComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LayoutContainersModule,
    HotkeyModule.forRoot(),
    NgSelectModule,
    PagesContainersModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    })
  ]
})
export class AppModule { }

