import { MoviePickRepo } from "../MoviePicker/MoviePickRepo";
import {
  MoviePicker,
  MoviePickAlreadyExistError,
  EmptyMovieTitleError,
} from "../MoviePicker/MoviePicker";
import { MemoryMoviePickRepo } from "../MoviePicker/MemoryMoviePickRepo";

//------------------------------------------------------------------------------
describe("MoviePicker", () => {
  let moviePicker: MoviePicker;
  let moviePickRepo: MoviePickRepo;

  beforeEach(async () => {
    moviePickRepo = new MemoryMoviePickRepo();
    moviePicker = new MoviePicker(moviePickRepo);
  });
  //----------------------------------------------------------------------------
  it(
    "should add given movie title to puts " +
    "on MoviePicker.put " +
    "when given movie title is not empty " +
    "and no title already puted for first letter of given movie title",
    async () => {
      const title = "Bohemian Rhapsody";
      await moviePicker.put(title);

      const result = await moviePickRepo.getByFirstLetter("B");
      const allPicks = await moviePickRepo.getAll();

      expect(result).toBe(title);
      expect(allPicks).toHaveLength(1);
    }
  );
  //----------------------------------------------------------------------------
  it(
    "should throw MoviePickAlreadyExistError " +
    "on MoviePicker.put " +
    "when given movie title is not empty " +
    "and some title already puted for first letter of given movie title",
    async () => {
      const title = "Bohemian Rhapsody";
      await moviePicker.put(title);

      await expect(async () => {
        await moviePicker.put(title);
      }).rejects.toThrow(MoviePickAlreadyExistError);

      await expect(async () => {
        await moviePicker.put("Barton Fink");
      }).rejects.toThrow(MoviePickAlreadyExistError);

      await expect(async () => {
        await moviePicker.put("batman");
      }).rejects.toThrow(MoviePickAlreadyExistError);
    }
  );
  //----------------------------------------------------------------------------
  it(
    "should throw EmptyMovieTitleError " +
    "on MoviePicker.put " +
    "when given movie title is empty",
    async () => {
      await expect(async () => {
        await moviePicker.put("");
      }).rejects.toThrow(EmptyMovieTitleError);
    }
  );
});
