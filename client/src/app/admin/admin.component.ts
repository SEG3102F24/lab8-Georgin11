import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BooksService } from '../books/service/books.service';
import { Book, Author } from '../books/model/book';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService
  ) {
    // Initialize the form with controls and validators
    this.bookForm = this.fb.group({
      bookNumber: ['', [Validators.required, Validators.pattern('[1-9]\\d{3}')]],
      category: ['', Validators.required],
      title: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern('\\d+(\\.\\d{1,2})?')]],
      year: [''],
      description: [''],
      authors: this.fb.array([])
    });
  }

  // Getters for easy access to form controls and validation
  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor(): void {
    // Add a new author control group to the authors form array
    this.authors.push(
      this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      })
    );
  }

  removeAuthor(index: number): void {
    // Remove an author control group from the authors form array by index
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    // Build a Book instance from form values
    const book = new Book(
      0,
      Number(this.bookForm.value.bookNumber),
      this.bookForm.value.category,
      this.bookForm.value.title,
      Number(this.bookForm.value.cost),
      this.bookForm.value.authors.map((author: any) => new Author(book.bookNumber, author.firstName, author.lastName)),
      this.bookForm.value.year,
      this.bookForm.value.description
    );

    // Use BooksService to add the book
    this.booksService.addBook(book).subscribe(response => {
      console.log('Book added:', response);
      this.bookForm.reset();
      this.authors.clear();
    });
  }
}
