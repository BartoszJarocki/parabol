import {GraphQLNonNull, GraphQLObjectType} from 'graphql'
import {GQLContext} from '../graphql'
import StandardMutationError from './StandardMutationError'

const ErrorPayload = new GraphQLObjectType<any, GQLContext>({
  name: 'ErrorPayload',
  fields: () => ({
    error: {
      type: GraphQLNonNull(StandardMutationError)
    }
  })
})

export default ErrorPayload
