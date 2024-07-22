import {gql} from '@apollo/client';

export const GET_ME = gql`
    query me($userId: ID!){
        me(userId: $userId){
            _id
            username
            bookCount
            savedBooks
        }
    }
`;

export const QUERY_GOOGLE_BOOk = gql`
    query searchGoogleBooks($query: String!){
        searchGoogleBooks(query: $query){
            items {
                id
                volumeInfo {
                    title
                    authors
                    description
                    publishedDate
                }
            }
        }
    }
`;