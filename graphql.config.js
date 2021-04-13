module.exports = {
  name: 'Untitled GraphQL Schema',
  schemaPath: 'schema.graphql',
  extensions: {
    endpoints: {
      'Default GraphQL Endpoint': {
        url: 'https://frozen-river-77426.herokuapp.com/query',
        headers: {
          'user-agent': 'JS GraphQL',
        },
        introspect: false,
      },
    },
  },
};
