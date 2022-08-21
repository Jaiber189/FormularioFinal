import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from "./index/index.component";

const routes: Routes = [
  {path: '', redirectTo: 'estudiantes/register', pathMatch: 'full'},
  {path: 'estudiantes/register', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
