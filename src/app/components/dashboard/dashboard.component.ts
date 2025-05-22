import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchServiceService } from 'src/app/services/search/search.service';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  searchTerm: string = '';
  userName: string = ''; 
  cartItemCount: number = 0;
  private cartCountSub!: Subscription;

  constructor(private router: Router,private searchService: SearchServiceService, private bookService: BookService,) {}

  ngOnInit() {
    this.userName = localStorage.getItem('fullName')?.split(' ')[0] || '';

    this.bookService.loadCartCount();

    this.cartCountSub = this.bookService.cartCount$.subscribe(count => 
      {
        this.cartItemCount = count;
      });
  }



  goToProfile() {
    this.router.navigate(['/dashboard/profile']);
  }

  goToOrders() {
    this.router.navigate(['/dashboard/orders']);
  }

  goToCart() {
    this.router.navigate(['/dashboard/cart']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/register']);
  }

  goToWishlist()
  {
    this.router.navigate(['/dashboard/wishlist']);

  }

  onSearchChange(term: string) {
    this.searchService.setSearchTerm(term);

  }

  ngOnDestroy(): void 
  {
    if (this.cartCountSub) 
    {
      this.cartCountSub.unsubscribe();
    }
  }

  //to get cart count
  // This method can be called when the cart is updated
  getCartCount() 
  {
    this.bookService.getAllCartBooks().subscribe((cartItems: any) => 
    {
      this.cartItemCount = cartItems.length;
    });
  }

  // Fetch cart count
  // This method can be called when the cart is updated 
  fetchCartCount() 
  {
    this.bookService.getAllCartBooks().subscribe({
      next: (res: any) => 
      {
        if (res.success) 
        {
          this.cartItemCount = res.data.items.reduce(
            (total: number, item: any) => total + item.quantity,0 );
        }
      },
      error: (err) => {
        console.error('Error fetching cart count:', err);
      }
    });
  }

}