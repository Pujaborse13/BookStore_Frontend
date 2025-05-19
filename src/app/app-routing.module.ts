import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksComponent } from './components/books/books.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';

const routes: Routes = [  { path: '', redirectTo: 'register', pathMatch: 'full' },
                         { path:'register', component: RegisterLoginComponent},
                        //  { path:'dashboard', component: DashboardComponent},
                        //  { path:'books', component: BooksComponent},

                         {path: 'dashboard', component: DashboardComponent,
                          children: [{ path: '', redirectTo: 'books', pathMatch: 'full' }, // default child
                                     { path: 'books', component: BooksComponent },
                                     { path: 'book-details/:id', component: BookDetailsComponent } ]},
                         { path: 'book-details/:id', component: BookDetailsComponent },
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

