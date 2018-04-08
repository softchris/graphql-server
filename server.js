var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors')

const {people} = require('./db1');
const {humans, addHuman } = require('./db2');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    humans: [String],
    sendArgs(arr: Int): String,
  }

  type Mutation {
    addHuman(name: String): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  humans: () => {
    // select * from humans;
    console.log(people);

    return [...humans, ...people];
  },
  sendArgs: ({arr}) => {
    return `You sent arg: ${args.arr}`;
  },
  addHuman: ({name}) => {
    // insert into humans(name) values(arg.name);
    addHuman(name);
    return `Created ${name}`;
  }
};

var app = express();
app.use('/graphql', cors() ,graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
