import LogHelper from "src/utils/logger/logHelper";
import { Arg, Query, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Movie, MovieInput } from "../schema/movie.schema";
import MovieService from "../services/movie.service";

@Service()
@Resolver(() => Movie)
export default class MovieResolver {
  constructor(
    private readonly movieService: MovieService,
    private readonly logger: LogHelper
  ) {}


  @Query(() => [Movie])
  async getMovies(): Promise<Movie[]> {
    try {
      return await this.movieService.getMovies();
    } catch (error: any) {
      throw error;
    }
  }

  @Mutation(() => Movie)
  async addMovie(
    @Arg('movieInput') movieInput: MovieInput,
  ): Promise<Movie> {
    try {
      return await this.movieService.addMovie(movieInput);
    } catch (error: any) {
      this.logger.createLog(error)
      throw error;
    }
  }
}

