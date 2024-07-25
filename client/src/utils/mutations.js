import {gql} from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: $String){
        addUser(username: $username, email: $email, password: $password){
            token
            _id
            username
            email
            password
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: $password){
        login(email: $email, password: $password){
            token
            _id
            username
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookInfo: BookInfo!){
        saveBook(bookInfo: $bookInfo){
            _id
            username
            bookCount
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $bookId){
            _id 
            username
            booksCount
        }
    }
`;

