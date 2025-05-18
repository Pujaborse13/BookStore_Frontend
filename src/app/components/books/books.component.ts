import { Component, EventEmitter, OnChanges,Input, Output, SimpleChanges } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnChanges{
  
  books: any[] = []; 
  filteredBooks: any[] = []; //search books

  selectedSort: string = 'relevance';
  isDropdownOpen: boolean = false; 

  //for pagination
  currentPage = 1;
  pageSize = 6;
  originalBooks: any[] = [];

  //search
  @Input() searchTerm: string = '';


  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.applyFilters();
    }
  }

  //get all books
  fetchBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.books = response.data;
          this.applyFilters();
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

  
      //sort books by price and date
      sortBooks() {
      switch (this.selectedSort) {
        case 'lowToHigh':
          this.bookService.getBooksLowToHigh().subscribe({
            next: (response: any) => {
              if (response.success) {
                this.books = response.data;
                this.applyFilters();
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
                this.applyFilters();
              }
            },
            error: (err) => {
              console.error('Failed to fetch high to low sorted books:', err);
            }
          });
          break;

        case 'newest':
          this.books.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          this.applyFilters();
          break;

        case 'relevance':
        default:
          this.fetchBooks(); 
          break;
      }
    }

    //pagination 
    get totalPages(): number 
    {
      return Math.ceil(this.books.length / this.pageSize);
    }

    get pages(): number[] 
    {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    changePage(page: number): void 
    {
      if (page >= 1 && page <= this.totalPages) 
      {
        this.currentPage = page;
      }
    }

    prevPage(): void 
    {
      if (this.currentPage > 1) 
      {
        this.currentPage--;
      }
    }

    nextPage(): void 
    {
      if (this.currentPage < this.totalPages) 
      {
        this.currentPage++;
      }
    }

    
    

    //serching 
    applyFilters(): void {
      const term = this.searchTerm.trim().toLowerCase();
  
      if (term) {
        this.filteredBooks = this.books.filter(book =>
          book.bookName.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        );
      } else {
        this.filteredBooks = [...this.books];
      }
  
      this.currentPage = 1; // reset to first page
    }
}
