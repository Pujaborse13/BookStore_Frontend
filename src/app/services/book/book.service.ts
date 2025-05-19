import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  token: any;
  constructor( private http: HttpService) 
  { 
    //to retrive token first from local storage
    this.token = localStorage.getItem('Token');
    //to check if token is present or not
    console.log('Token:', this.token);
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
     return this.http.postApi(`/api/cart?bookId=${bookId}`, {}, httpOption.headers);
   }




}
