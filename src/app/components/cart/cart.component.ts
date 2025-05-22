import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';


interface CustomerDetailsModel {
  fullName: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  type: string;
  
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private bookService: BookService, private router: Router, private snackBar: MatSnackBar) {}
  
  books: any[] = [];
  book: any;
  showAddressSection: boolean = false;
  showOrderSummarySection: boolean = false;
  orderSuccess: boolean = false;
  orderId: string = '';



  customer = {
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    type: 'home'
  };
  

  ngOnInit() {
    this.getAllCart();
  }

  expandAddressSection() {
    this.showAddressSection = true;
  }
  
  expandSummarySection() {
    this.showOrderSummarySection = true;
  }
  
  
  getAllCart() {
    this.bookService.getAllCartBooks().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.books = response.data.items || [];  
          console.log("Cart books:", this.books);
        } else {
          console.log('Cart fetch returned no success:', response.message);
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

 //placeorder
  onPlaceOrder() {
    this.showAddressSection = true;
  }


  //add customer details 
  customerDetails() {
    this.showAddressSection = false;
    const customerDetails = {
      fullName: this.customer.name,
      mobile: this.customer.phone,
      address: this.customer.address,
      city: this.customer.city,
      state: this.customer.state,
      type: this.customer.type
    };
  
    this.bookService.addCustomerDetails(customerDetails).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.snackBar.open('Customer details added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });

          this.showOrderSummarySection = true; // Show Order Summary
        
        } else {
          this.snackBar.open(`Failed: ${response.message}`, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-warning']
          });
        }
      },
      error: (err) => {
        this.snackBar.open('Error adding customer details. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        console.error('Failed to add customer details:', err);
      }
    });
  }
  
//place order , order summry
  checkout() {
    this.bookService.placeOrder().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.orderId = response.data.orderId;
          this.orderSuccess = true;
          this.snackBar.open('Order placed successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
  
          this.books = []; //cart empty
        } else {
          this.snackBar.open(`Order failed: ${response.message}`, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      },
      error: (err) => {
        console.error('Checkout error:', err);
        this.snackBar.open('Error placing order. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  // remove book from cart
 removeFromCart(bookId: number) {
    this.bookService.removeFromCart(bookId).subscribe({
      next: (response: any) => {
        if (response.success || response.includes('removed')) {
          this.snackBar.open('Book removed from cart successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.books = this.books.filter(item => item.bookId !== bookId);
         // this.getAllCart();  // Refresh the cart
        } 
        else {
          this.snackBar.open(`Failed to remove: ${response.message || response}`, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-warning']
          });
        }
      },
      error: (err) => {
        console.error('Error removing book from cart:', err);
        this.snackBar.open('Error removing book. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
 
//update book quanity 
  updateQuantity(bookId: number, action: string) {
    this.bookService.updateQuantityCart(bookId, action).subscribe({
      next: (response: any) => {
        if (response?.message?.includes("removed")) {
          this.books = this.books.filter(item => item.bookId !== bookId);
        } 
        else if (response?.data) {
          const updatedItem = response.data;
          const index = this.books.findIndex(item => item.bookId === bookId);
          
          if (index !== -1) {
            this.books[index].quantity = updatedItem.quantity;
            this.books[index].price = updatedItem.price;
          }
        }
      },
      error: (error) => {
        console.error("Error updating quantity:", error);
      }
    });
  }
  
}
   
      












