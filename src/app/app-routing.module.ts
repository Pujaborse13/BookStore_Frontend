import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksComponent } from './components/books/books.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';


const routes: Routes = [  { path: '', redirectTo: 'register', pathMatch: 'full' },
                         { path:'register', component: RegisterLoginComponent},
                        
                         {path: 'dashboard', component: DashboardComponent,
                          children: [{ path: '', redirectTo: 'books', pathMatch: 'full' }, // default child
                                     { path: 'books', component: BooksComponent },
                                     { path: 'book-details/:id', component: BookDetailsComponent },
                                     { path:'cart', component: CartComponent},
                                     { path: 'orders', component: OrdersComponent },
                                     { path:'wishlist', component: WishlistComponent},
                                     
                                    ]},
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

