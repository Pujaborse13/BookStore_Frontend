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
  

  checkout() {
    this.bookService.placeOrder().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.orderId = response.data.orderId; // Replace with actual field
          this.orderSuccess = true;
          this.snackBar.open('Order placed successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
  
          // Optionally clear the cart view
          this.books = [];
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
  


}
   
      












