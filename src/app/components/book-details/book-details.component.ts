import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book: any;
  isInCart: boolean = false;
  quantity: number = 1;

constructor(
  private bookService: BookService,
  private route: ActivatedRoute,
  private router: Router,
  private snackBar: MatSnackBar,

) {}

ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.getBookByBookId(id);
}

getBookByBookId(id: number) {
  this.bookService.getBookById(id).subscribe({
    next: (response: any) => {
      if (response.success) {
        this.book = response.data;
        console.log("Book:", this.book);
      }
    },
    error: (err) => {
      console.error('Failed to fetch book:', err);
    }
  });

}


    goToDashboard() {
      this.router.navigate(['/dashboard']);
    }


    //add book to cart
    addToCart(bookId: number) {
      this.bookService.addToCart(bookId).subscribe({
        next: (response: any) => {
          console.log("Add to Cart Response:", response);
          this.snackBar.open('Book added to cart successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success']
          });

          this.isInCart = true;   //  Change to quantity view
          this.quantity = 1;      // Start from 1
          
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          this.snackBar.open('Failed to add book to cart.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-error']
          });
        }
      });
    }
    
    //update cart book quantity 
    updateQuantity(action: 'inc' | 'dec') {
      if (action === 'dec' && this.quantity === 1) {
        this.snackBar.open('Quantity cannot be less than 1.', 'Close', {
          duration: 2000,
          verticalPosition: 'bottom',
          panelClass: ['snackbar-warning']
        });
        return;
      }
    
      this.bookService.updateQuantityCart(this.book.id, action).subscribe({
        next: (response: any) => {
          if (response?.data) {
            this.quantity = response.data.quantity;
    
            const actionText = action === 'inc' ? 'increased' : 'decreased';
            this.snackBar.open(`Quantity ${actionText}.`, 'Close', {
              duration: 2000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-success']
            });
          }
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
          this.snackBar.open('Failed to update quantity. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  
     //add book to wishlist
     addToWishlist(bookId: number) {
      this.bookService.addToWishlist(bookId).subscribe({
        next: (response: any) => {
          console.log("Add to wishlist Response:", response);
          this.snackBar.open('Book added to Wishlist successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success']
          });
        },
        error: (err) => {
          console.error('Error adding to wishlist:', err);
          if (err.status === 409 && err.error?.message?.includes('already exists')) {
            this.snackBar.open('Book already exists in wishlist.', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-warning']
            });
          } else {
            this.snackBar.open('Failed to add book to wishlist.', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-error']
            });
          }
        }
      });
    }
    
    

}
