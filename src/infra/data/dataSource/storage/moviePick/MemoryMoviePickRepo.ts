import { MoviePickRepo } from "./MoviePickRepo";
import { MoviePickAlreadyExistError } from "./MoviePicker";

/**
 *
 */
export class MemoryMoviePickRepo implements MoviePickRepo {
  /**
   *
   */
  private readonly byFirstLetter = new Map<string, string>();

  /**
   *
   */
  constructor() {
    this.put = this.put.bind(this);
  }

  /**
   *
   */
  async getByFirstLetter(firstLetter: string) {
    return this.byFirstLetter.get(firstLetter.toUpperCase()) ?? null;
  }

  /**
   *
   */
  async getAll() {
    return [...this.byFirstLetter.values()];
  }

  /**
   *
   */
  async put(title: string) {

    if (title.length) {
      console.log(title)
      if (this.byFirstLetter.has(title[0].toUpperCase())) throw new MoviePickAlreadyExistError('deja')
      console.log(`Skirt the error: ${title}`)
      this.byFirstLetter.set([...title][0].toUpperCase(), title);
    }
    //console.log(`Return correctly the error : ${title}`)
  }
}
