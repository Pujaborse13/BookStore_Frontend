import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  token: any;
  constructor( private http: HttpService) 
  { 
    //to retrive token first from local storage
    this.token = localStorage.getItem('Token');
    //to check if token is present or not
    console.log('Token:', this.token);

    this.loadCartCount(); // Load initial cart count on service creation

  }

  //get all books
  getAllBooks()
  {
    let httpOption = 
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/books', httpOption.headers)as Observable<any[]>;
  }
  

  getBooksLowToHigh()
  {
    let httpOption = 
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/books/sortbookbypriceasc', httpOption.headers)as Observable<any[]>;
  }

  getBooksHighToLow()
  {
    let httpOption = 
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/books/searchbypricedesc', httpOption.headers)as Observable<any[]>;
  }



  getBookById(bookId: number)
  {
    let httpOption = 
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi(`/api/books/${bookId}`, httpOption.headers) as Observable<any>;
  }


   //add book to cart
   addToCart(bookId: number)
   {
     let httpOption = {
       headers: new HttpHeaders(
       {
         'Authorization': `Bearer ${this.token}`,
         'Content-Type': 'application/json'
       })
     };
     console.log('Headers:', httpOption);
     return this.http.postApi(`/api/cart?bookId=${bookId}`, {}, httpOption.headers)
      .pipe(tap(() => this.loadCartCount()));
   }


   //get cart books
  getAllCartBooks()
  {
    let httpOption = 
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/cart', httpOption.headers)
    .pipe(tap(() => this.loadCartCount()));
  }


  //update cart quantity
  updateQuantityCart(bookId: number, action: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.putApi(`/api/cart/updatequantity?bookId=${bookId}&action=${action}`, {}, httpOptions.headers);
  }


  //remove book from cart
  removeFromCart(bookId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.deleteApi(`/api/cart/${bookId}`, httpOptions.headers);
  }


  //customer details
  addCustomerDetails(customerDetails: any) {
    let httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.postApi(`/api/customer`, customerDetails, httpOption.headers);
  }
  

  //place order 
  placeOrder() {
    let httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.postApi(`/api/orders/placeorder`, {}, httpOption.headers);  
  }
  
  

  
  getAllOrders()
  {
    let httpOption = 
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/orders/userorders', httpOption.headers);
  }



// add book to wishlist
  addToWishlist(bookId: number)
   {
     let httpOption = {
       headers: new HttpHeaders(
       {
         'Authorization': `Bearer ${this.token}`,
         'Content-Type': 'application/json'
       })
     };
     console.log('Headers:', httpOption);
     return this.http.postApi(`/api/wishlist?bookId=${bookId}`, {}, httpOption.headers);
   }



  //wishlist books 
  getAllWishlistBooks()
  {
    let httpOption = 
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/wishlist', httpOption.headers);
  }


  //remove book from wishlist
  removeFromWishlist(bookId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.deleteApi(`/api/wishlist/${bookId}`, httpOptions.headers);
  }
  
  
  searchBooks(searchTerm: string) {
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.getApi(`/api/book/search?searchTerm=${searchTerm}`, httpOption.headers);
  }
  
  
  
   // Load and update the cart count BehaviorSubject
   loadCartCount() {
    this.getAllCartBooks().subscribe({
      next: (res: any) => {
        if (res.success && res.data?.items) {
          const count = res.data.items.length; // Only count distinct items
          this.cartCountSubject.next(count);
        } else {
          this.cartCountSubject.next(0);
        }
      },
      error: err => {
        console.error('Error loading cart count:', err);
        this.cartCountSubject.next(0);
      }
    });
  }
 
  
}
