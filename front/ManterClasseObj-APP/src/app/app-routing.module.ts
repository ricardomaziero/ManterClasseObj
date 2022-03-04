import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ClasseObjetoComponent } from './Pages/classe-objeto/classe-objeto.component';

const routes: Routes = [

  {path: "", component: HomeComponent},
  {path: "app-home", component: HomeComponent},
  {path: "app-classe-objeto", component: ClasseObjetoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
