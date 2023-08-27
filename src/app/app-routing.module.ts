import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from "./component/employee/employee.component"; // Importe o RouterModule e Routes

const routes: Routes = [
  // Defina suas rotas aqui
  { path: 'employees', component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use forRoot para configuração inicial das rotas
  exports: [RouterModule]
})
export class AppRoutingModule { }
