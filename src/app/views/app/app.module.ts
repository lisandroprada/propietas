import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContextMenuModule } from 'ngx-contextmenu';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuillModule } from 'ngx-quill';
import { WizardsContainersModule } from 'src/app/containers/wizard/wizards.containers.module';

@NgModule({
  declarations: [BlankPageComponent, AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LayoutContainersModule,
    HotkeyModule.forRoot(),
    NgSelectModule,
    PagesContainersModule,
    WizardsContainersModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
    PaginationModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    QuillModule.forRoot()
  ]
})
export class AppModule { }

