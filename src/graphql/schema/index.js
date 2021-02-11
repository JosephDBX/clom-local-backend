const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
type Area {
    _id: ID!
    name: String!
}

type AreaPage {
    areas: [Area!]
    pageInfo: PageInfo
}

type Query {
    hello: String!
    area(_id: ID!): Area
    areas(AreaInput: areaInput) AreaPage
}
`;