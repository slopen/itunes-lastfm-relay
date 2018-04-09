// @flow

declare module 'express-graphql' {
  // See https://github.com/flowtype/flow-typed/issues/16
  // $FlowFixMe: Flow library definitions currently don't support type dependencies between libraries.
  import type {DocumentNode, GraphQLError, GraphQLSchema} from 'graphql';
  import type {$Request, $Response} from 'express';

  /**
   * Used to configure the graphqlHTTP middleware by providing a schema
   * and other configuration options.
   *
   * Options can be provided as an Object, a Promise for an Object, or a Function
   * that returns an Object or a Promise for an Object.
   */
  declare export type Options =
    | ((
        request: $Request,
        response: $Response,
        params?: GraphQLParams,
      ) => OptionsResult)
    | OptionsResult;
  declare export type OptionsResult = OptionsData | Promise<OptionsData>;

  declare export type OptionsData = {

    /**
     * A GraphQL schema from graphql-js.
     */
    schema: GraphQLSchema,

    /**
     * A value to pass as the context to the graphql() function.
     */
    context?: ?mixed,

    /**
     * An object to pass as the rootValue to the graphql() function.
     */
    rootValue?: ?mixed,

    /**
     * A boolean to configure whether the output should be pretty-printed.
     */
    pretty?: ?boolean,

    /**
     * An optional function which will be used to format any errors produced by
     * fulfilling a GraphQL operation. If no function is provided, GraphQL's
     * default spec-compliant `formatError` function will be used.
     */
    formatError?: ?(error: GraphQLError) => mixed,

    /**
     * An optional array of validation rules that will be applied on the document
     * in additional to those defined by the GraphQL spec.
     */
    validationRules?: ?Array<mixed>,

    /**
     * An optional function for adding additional metadata to the GraphQL response
     * as a key-value object. The result will be added to "extensions" field in
     * the resulting JSON. This is often a useful place to add development time
     * info such as the runtime of a query or the amount of resources consumed.
     *
     * Information about the request is provided to be used.
     *
     * This function may be async.
     */
    extensions?: ?(info: RequestInfo) => { [key: string]: mixed },

    /**
     * A boolean to optionally enable GraphiQL mode.
     */
    graphiql?: ?boolean,
  };

  /**
   * All information about a GraphQL request.
   */
  declare export type RequestInfo = {

    /**
     * The parsed GraphQL document.
     */
    document: ?DocumentNode,

    /**
     * The variable values used at runtime.
     */
    variables: ?{ [name: string]: mixed },

    /**
     * The (optional) operation name requested.
     */
    operationName: ?string,

    /**
     * The result of executing the operation.
     */
    result: ?mixed,
  };

  declare type Middleware = (request: $Request, response: $Response) => Promise<void>;

  /**
   * Middleware for express; takes an options object or function as input to
   * configure behavior, and returns an express middleware.
   */
  declare export default function graphqlHTTP (options: Options): Middleware;

  declare export type GraphQLParams = {
    query: ?string,
    variables: ?{ [name: string]: mixed },
    operationName: ?string,
    raw: ?boolean,
  };

  /**
   * Provided a "Request" provided by express or connect (typically a node style
   * HTTPClientRequest), Promise the GraphQL request parameters.
   */
  declare export function getGraphQLParams(request: $Request): Promise<GraphQLParams>;


}