import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { ContratosComponent } from './contratos/contratos.component';
import { CoreMenuComponent } from './core-menu.component';


const routes: Routes = [
  {
    path: '', component: CoreMenuComponent,
    children: [
      { path: '', redirectTo: 'core', pathMatch: 'full' },
      { path: 'clientes', component: ClientesComponent },
      { path: 'inmuebles', component: InmueblesComponent },
      { path: 'contratos', component: ContratosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
