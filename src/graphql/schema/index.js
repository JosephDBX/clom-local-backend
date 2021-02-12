import { gql } from 'apollo-server-express';

exports.typeDefs = gql`
scalar DateTime

input PaginateInput {
    page: Int!
    limit: Int!
}

type Paginate {
    total: Int!
    limit: Int!
    page: Int!
    pages: Int!
}

type Query {
    hello: String!
}
`;