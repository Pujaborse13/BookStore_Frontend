import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksComponent } from './components/books/books.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';


const routes: Routes = [  { path: '', redirectTo: 'register', pathMatch: 'full' },
                         { path:'register', component: RegisterLoginComponent},
                        //  { path:'cart', component: CartComponent},
                        //  { path:'dashboard', component: DashboardComponent},
                        //  { path:'books', component: BooksComponent},
                        // { path: 'book-details/:id', component: BookDetailsComponent },

                         {path: 'dashboard', component: DashboardComponent,
                          children: [{ path: '', redirectTo: 'books', pathMatch: 'full' }, // default child
                                     { path: 'books', component: BooksComponent },
                                     { path: 'book-details/:id', component: BookDetailsComponent },
                                     { path:'cart', component: CartComponent},
                                    
                                    ]},
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

