import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Service } from "typedi";
import { Movie, MovieInput } from "../schema/movie.schema";
import MovieResolver from "../services/movie.service";
import Context from "../types/context";
import Logger from "../utils/logger/logger";

@Service()
@Resolver(() => Movie)
export default class MovieBaseResolver {
  constructor(
    private readonly movieResolver: MovieResolver,
    private readonly logger: Logger,
  ) {}

  @Query(() => [Movie])
  async getMovies(
    @Ctx() context: Context
  ): Promise<Movie[]> {
    try {
      this.logger.createLog('STARTED', 'MOVIES', 'getMovies', context, undefined, 'New');
      const res = await this.movieResolver.getMovies();
      this.logger.createLog('SUCCESS', 'MOVIES', 'getMovies', context, undefined, 'New');
      return res;
    } catch (error: any) {
      this.logger.createLog('FAILED', 'MOVIES', 'getMovies', context, { error: error.message }, 'New', 'error');
      throw error;
    }
  }

  @Mutation(() => Movie)
  async addMovie(
    @Arg('movieInput') movieInput: MovieInput,
    @Ctx() context: Context
  ): Promise<Movie> {
    try {
      this.logger.createLog('STARTED', 'MOVIES', 'addMovie', context, movieInput, 'New');
      const res = await this.movieResolver.addMovie(movieInput);
      this.logger.createLog('SUCCESS', 'MOVIES', 'addMovie', context, movieInput, 'New');
      return res;
    } catch (error: any) {
      this.logger.createLog('FAILED', 'MOVIES', 'addMovie', context, { error: error.message }, 'New', 'error');
      throw error;
    }
  }
}

