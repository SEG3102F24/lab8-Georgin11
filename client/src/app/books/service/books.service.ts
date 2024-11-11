import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const GET_BOOKS = gql`
    query {
        books {
            bookNumber
            title
            authors { lastName }
        }
    }
`;

@Injectable({ providedIn: 'root' })
export class BooksService {
    constructor(private apollo: Apollo) {}
    
    public getBooks(): Observable<any> {
        return this.apollo.watchQuery<any>({ query: GET_BOOKS }).valueChanges;
    }
}
