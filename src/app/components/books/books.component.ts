import { Component, EventEmitter, OnChanges,Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { SearchServiceService } from 'src/app/services/search/search.service';

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
  pageSize = 8;
  originalBooks: any[] = [];

  //search
  @Input() searchTerm: string = '';


  constructor(private bookService: BookService, private router: Router,private searchService: SearchServiceService) {}
  

  ngOnInit(): void {
    console.log('BooksComponent initialized'); 
    this.fetchBooks();
    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.applyFilters();
    });
  }

  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.applyFilters();
    }
  }

  //book description
  onBookClick(bookId: number) {
    console.log("Navigating to book with ID:", bookId); 
    // this.router.navigate(['/book-details', bookId]);
    this.router.navigate(['dashboard/book-details',bookId]);

  }

  //get all books
  fetchBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.books = response.data;
          this.applyFilters();
          //this.filteredBooks = [...this.books];
          console.log("Filtered books:", this.filteredBooks);

        }
      },
      error: (err) => {
        console.error('Failed to fetch books:', err);
      }
    });
  }


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

    applyFilters(): void {
      const term = this.searchTerm.trim().toLowerCase();
      console.log('Searching for:', term);
    
      if (term) {
        this.filteredBooks = this.books.filter(book =>
          book.bookName.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        );
      } else {
        this.filteredBooks = [...this.books];
      }
    
      this.currentPage = 1; // Reset to first page on new search
    }
    
    
}
