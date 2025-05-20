import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders: any[] = [];
  isLoading: boolean = true;

  constructor(private bookService: BookService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.bookService.getAllOrders().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.orders = response.data;
        } else {
          this.snackBar.open(response.message || 'No orders found.', 'Close', {
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
