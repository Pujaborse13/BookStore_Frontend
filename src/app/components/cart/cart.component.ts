import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private bookService: BookService, private router: Router) {}
  books: any[] = [];
  book: any;


  ngOnInit() {
    this.getAllCart();
  }

  getAllCart() {
    this.bookService.getAllCartBooks().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.books = response.data.items || [];  
          console.log("Cart books:", this.books);
        } else {
          console.warn('Cart fetch returned no success:', response.message);
        }
      },
      error: (err) => {
        console.error('Failed to fetch cart books:', err);
      }
    });
  }
  

 
  
  getTotalPrice(): number {
    return this.books.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  getTotalQuantity(): number {
    return this.books.reduce((total, item) => total + item.quantity, 0);
  }

  
  // go to home page
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
