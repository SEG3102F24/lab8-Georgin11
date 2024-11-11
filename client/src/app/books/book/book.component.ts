import { Component, OnInit } from '@angular/core';
import { BooksService } from '../service/books.service';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
    books: any;

    constructor(private booksService: BooksService) {}

    ngOnInit(): void {
        this.booksService.getBooks().subscribe(result => {
            this.books = result.data.books;
        });
    }
}
