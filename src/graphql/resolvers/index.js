exports.resolvers = {
    Query: {
        hello: () => {
            return 'Hello world!';
        },
        area: (_, { _id }, { roles }) => {
            return {
                _id: "qwerty",
                name: "Area de fulano"
            }
        }
    }
}