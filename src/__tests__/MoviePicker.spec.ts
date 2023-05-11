import MoviePickRepo, { EmptyMovieTitleError, MoviePickAlreadyExistError } from "../domain/repositories/MoviePickRepo";
import MoviePickDataSource from "../infra/data/dataSource/MoviePickDataSource";
import { MemoryMoviePickRepo } from "../infra/data/dataSource/storage/moviePick/MemoryMoviePickRepo";
import MoviePickRepoImpl from "../infra/data/repositories/MoviePickRepoImpl";

//------------------------------------------------------------------------------
describe("MoviePicker", () => {
  let moviePicker: MoviePickRepo;
  let moviePickRepo: MoviePickDataSource;

  beforeEach(async () => {
    moviePickRepo = new MemoryMoviePickRepo();
    moviePicker = new MoviePickRepoImpl(moviePickRepo);
  });
  //----------------------------------------------------------------------------
  it(
    "should add given movie title to picks " +
    "on MoviePicker.pick " +
    "when given movie title is not empty " +
    "and no title already picked for first letter of given movie title",
    async () => {
      const title = "Bohemian Rhapsody";
      await moviePicker.pick(title);

      const result = await moviePickRepo.getByFirstLetter("B");
      const allPicks = await moviePickRepo.getAll();

      expect(result).toBe(title);
      expect(allPicks).toHaveLength(1);
    }
  );
  //----------------------------------------------------------------------------
  it(
    "should throw MoviePickAlreadyExistError " +
    "on MoviePicker.pick " +
    "when given movie title is not empty " +
    "and some title already picked for first letter of given movie title",
    async () => {
      const title = "Bohemian Rhapsody";
      await moviePicker.pick(title);

      await expect(async () => {
        await moviePicker.pick(title);
      }).rejects.toThrow(MoviePickAlreadyExistError);

      await expect(async () => {
        await moviePicker.pick("Barton Fink");
      }).rejects.toThrow(MoviePickAlreadyExistError);

      await expect(async () => {
        await moviePicker.pick("batman");
      }).rejects.toThrow(MoviePickAlreadyExistError);
    }
  );
  //----------------------------------------------------------------------------
  it(
    "should throw EmptyMovieTitleError " +
    "on MoviePicker.pick " +
    "when given movie title is empty",
    async () => {
      await expect(async () => {
        await moviePicker.pick("");
      }).rejects.toThrow(EmptyMovieTitleError);
    }
  );
});

