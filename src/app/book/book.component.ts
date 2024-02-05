import { Component, OnInit, inject } from '@angular/core';
import { BookService } from './book.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet,HttpClientModule,FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{

  bookService:BookService=inject(BookService);
  bookList:any=[];

  authorList:any=[];

  bookForm!:FormGroup;
  isUpdatebtn!:boolean;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.getAuthors();
    this.getBooks();
    this.bookForm=this.fb.group({
      id:[,Validators.required],
      name:[,Validators.required],
      price:[,Validators.required],
      authorId:[,Validators.required]
    });
    this.isUpdatebtn=false;
    
  }
  get id(){
    return this.bookForm.get('id');
  }
  get name(){
    return this.bookForm.get('name');
  }
  get price(){
    return this.bookForm.get('price');
  }
  get authorId(){
    return this.bookForm.get('authorId');
  }

  getBooks(){
    this.bookService.getBooks().subscribe(result=>{
      this.bookList=result;
      console.log(this.bookList);
    })
  }
  getAuthors(){
    this.bookService.getAuthors().subscribe(result=>{
      this.authorList=result;
      console.log(this.authorList);
    })
  }

  saveBooks(){
    let book=this.bookForm.value;
    if(!this.isUpdatebtn){
        this.bookService.saveBooks(book).subscribe(result=>{
        });
      
    }
    else{
      let id=parseInt(this.bookForm.value.id);
      this.bookService.updateBook(id,book).subscribe(result=>{

      });
    }
    this.getBooks();
    this.bookForm.reset();
    this.isUpdatebtn=false;
  }
  editBook(b:any){
    this.isUpdatebtn=true;
  
  
    this.bookForm.setValue({
      id:b.id,
      name:b.name,
      price:b.price,
      authorId:b.authorId
    });
  }
  deleteBook(id:any){
    let response=confirm('Do you want to delete '+id +' ?');
    if(response==true){
      this.bookService.deleteBook(id).subscribe(result=>{
        this.getBooks();
      })
    }
  }

  clearForm()
{
  this.bookForm.reset();
  this.isUpdatebtn=false;
}

  

}
