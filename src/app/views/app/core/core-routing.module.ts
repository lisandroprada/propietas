import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientesComponent } from "./clientes/clientes.component";
import { InmueblesComponent } from "./inmuebles/inmuebles.component";
import { ContratosComponent } from "./contratos/contratos.component";
import { CoreMenuComponent } from "./core-menu.component";
import { ClienteComponent } from "./clientes/cliente.component";
import { InmuebleComponent } from "./inmuebles/inmueble.component";
import { ContratoEditorComponent } from "./contratos/editor/contrato-editor/contrato-editor.component";
import { ContratoComponent } from "./contratos/contrato.component";
import { ContratosSgComponent } from "./contratos-sg/contratos-sg.component";

const routes: Routes = [
  {
    path: "",
    component: CoreMenuComponent,
    children: [
      { path: "", redirectTo: "clientes", pathMatch: "full" },
      { path: "clientes", component: ClientesComponent },
      { path: "cliente/:id", component: ClienteComponent },
      { path: "inmuebles", component: InmueblesComponent },
      { path: "inmueble/:id", component: InmuebleComponent },
      { path: "contratos", component: ContratosComponent },
      { path: "contratos-sg", component: ContratosSgComponent },
      { path: "contrato-editor/:id", component: ContratoEditorComponent },
      { path: "contrato/:id", component: ContratoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
