import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders: any[] = [];
  isLoading: boolean = true;

  constructor(private bookService: BookService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.fetchOrders();
  }


   // go to home page
   goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  fetchOrders() {
    this.bookService.getAllOrders().subscribe({
      next: (response: any) => {
        if (response.success && response.data && response.data.length > 0) {
          this.orders = response.data;
          this.snackBar.open(response.message || 'Orders loaded successfully.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        } 
      else {
        this.orders = []; //clear orders if none found
         this.snackBar.open(response.message || "You haven't placed any orders yet.", 'Close', {
            duration: 3000,
            panelClass: ['snackbar-warning']
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.snackBar.open('Error fetching order history.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.isLoading = false;
      }
    });
  }

  

}
