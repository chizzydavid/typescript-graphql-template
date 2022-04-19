import { Arg } from "type-graphql";
import { Service } from "typedi";
import { Movie, MovieInput } from "../schema/movie.schema";
import MovieService from "../services/movie.service";

@Service()
export default class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  async getMovies(): Promise<Movie[]> {
    return await this.movieService.getMovies();
  }

  async addMovie(
    @Arg('movieInput') movieInput: MovieInput,
  ): Promise<Movie> {
    return await this.movieService.addMovie(movieInput);
  }
}

