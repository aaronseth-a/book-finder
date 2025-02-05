const typeDefs =`
    type User {
        _id: ID!
        username: String
        email: String
        booksCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInfo{
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Query {
        me(userId: ID!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookInfo: BookInfo!): User
        removeBook(bookId: String!): User
    }
`

module.exports = typeDefs;