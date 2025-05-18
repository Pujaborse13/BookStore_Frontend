import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  books: any[] = [];

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

}
