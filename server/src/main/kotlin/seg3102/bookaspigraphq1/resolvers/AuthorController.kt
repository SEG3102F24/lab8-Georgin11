package seg3x02.booksapigraphql.resolvers

import org.springframework.stereotype.Controller
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.MutationMapping
import seg3x02.booksapigraphql.entity.Author
import seg3x02.booksapigraphql.repository.AuthorRepository

@Controller
class AuthorController(
    private val authorRepository: AuthorRepository
) {
    @QueryMapping
    fun authors(@Argument bookNumber: Int): List<Author> =
        authorRepository.findAll().filter { it.bookNumber == bookNumber }

    @MutationMapping
    fun newAuthor(@Argument createAuthorInput: CreateAuthorInput): Author {
        val author = Author(
            createAuthorInput.bookNumber,
            createAuthorInput.firstName,
            createAuthorInput.lastName
        )
        return authorRepository.save(author)
    }
}
