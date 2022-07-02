import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import modules from './modules';
import { upperDirectiveTransformer } from './common/directives/upper-case-directive';
import * as GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    ...modules,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
      playground: true,
      resolvers: { JSON: GraphQLJSON },
    }),
  ],
})
export class AppModule {}
