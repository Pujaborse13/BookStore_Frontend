import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import {  OnInit } from '@angular/core';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit  {
  books: any[] = [];

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllWishList(); 
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }


  getAllWishList() {
    this.bookService.getAllWishlistBooks().subscribe({

      next: (response: any) => {
        if (response.success) {
            this.books = response.data?.items || [];

        if (this.books.length === 0) {
          this.snackBar.open("Your wishlist is empty", 'Close', {
            duration: 3000,
          });
        }
          console.log("Wishlist books fetched:", this.books);
        } else {
          this.snackBar.open(response.message || "Failed to fetch wishlist", 'Close', {
            duration: 3000,
          });
        }
      },
      error: (err) => {
        console.error("Error fetching wishlist:", err);
        this.snackBar.open("Failed to fetch wishlist", 'Close', {
          duration: 3000,
        });
      }
    });
  }

  

//remove book from wishlist
removeFromWishlist(bookId: number): void {
  this.bookService.removeFromWishlist(bookId).subscribe(
    (response: any) => {
      if (response.success) {
        this.books = this.books.filter(book => book.bookId !== bookId);
        this.snackBar.open(response.message, 'Close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Failed to remove from wishlist', 'Close', {
          duration: 3000
        });
      }
    },
    error => {
      this.snackBar.open('An error occurred', 'Close', {
        duration: 3000
      });
      console.error('Error:', error);
    }
  );
}

}


