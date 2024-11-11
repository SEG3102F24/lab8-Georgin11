package seg3x02.booksapigraphql.resolvers

import org.springframework.stereotype.Controller
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.MutationMapping
import seg3x02.booksapigraphql.entity.Book
import seg3x02.booksapigraphql.repository.BookRepository

@Controller
class BooksController(
    private val bookRepository: BookRepository
) {
    @QueryMapping
    fun books(): List<Book> = bookRepository.findAll()

    @MutationMapping
    fun newBook(@Argument createBookInput: CreateBookInput): Book {
        val book = Book(
            createBookInput.bookNumber, 
            createBookInput.category, 
            createBookInput.title, 
            createBookInput.cost, 
            createBookInput.year, 
            createBookInput.description
        )
        return bookRepository.save(book)
    }
}
