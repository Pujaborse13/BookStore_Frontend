import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';

const routes: Routes = [ { path:'register', component: RegisterLoginComponent},
                         { path:'dashboard', component: DashboardComponent},
                         { path:'books', component: BooksComponent},
                          { path: '', redirectTo: 'register', pathMatch: 'full' } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

