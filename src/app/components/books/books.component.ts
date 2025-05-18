import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  books: any[] = [];
  selectedSort: string = 'relevance';
  isDropdownOpen: boolean = false;



  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.books = response.data;
        }
      },
      error: (err) => {
        console.error('Failed to fetch books:', err);
      }
    });
  }



  // sortBooks() {
  //   switch (this.selectedSort) {
  //     case 'lowToHigh':
  //       this.books.sort((a, b) => a.discountPrice - b.discountPrice);
  //       break;

  //     case 'highToLow':
  //       this.books.sort((a, b) => b.discountPrice - a.discountPrice);
  //       break;

  //     case 'newest':
  //       this.books.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  //       break;

  //     case 'relevance':
  //     default:
  //       this.books = [...this.books];
  //       break;
  //   }
  // }

  sortBooks() {
  switch (this.selectedSort) {
    case 'lowToHigh':
      this.bookService.getBooksLowToHigh().subscribe({
        next: (response: any) => {
          if (response.success) {
            this.books = response.data;
          }
        },
        error: (err) => {
          console.error('Failed to fetch low to high sorted books:', err);
        }
      });
      break;

    case 'highToLow':
      this.bookService.getBooksHighToLow().subscribe({
        next: (response: any) => {
          if (response.success) {
            this.books = response.data;
          }
        },
        error: (err) => {
          console.error('Failed to fetch high to low sorted books:', err);
        }
      });
      break;

    case 'newest':
      // Ideally, add a new backend API like `/api/books/sortbynewest`
      this.books.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;

    case 'relevance':
    default:
      this.fetchBooks(); // re-fetch default order
      break;
  }
}


}
