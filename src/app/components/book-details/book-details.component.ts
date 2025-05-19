import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book: any;

constructor(
  private bookService: BookService,
  private route: ActivatedRoute,
  private router: Router

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

}
