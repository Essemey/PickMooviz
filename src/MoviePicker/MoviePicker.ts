import { MoviePickRepo } from "./MoviePickRepo";


export class MoviePickAlreadyExistError extends Error {

    constructor(message: string) {
        super(message);
        this.name = 'moviepicker'
    }
}

export class EmptyMovieTitleError {

    public message;
    public cause;

    constructor(message: string, cause?: unknown) {
        this.message = message;
        this.cause = cause;
    }
}

export class MoviePicker implements MoviePickRepo {

    private dataSource;

    constructor(dataSource: MoviePickRepo) {
        this.dataSource = dataSource;
    }

    async getByFirstLetter(firstLetter: string) {
        return this.dataSource.getByFirstLetter(firstLetter);
    }

    async getAll() {
        return this.dataSource.getAll();
    }

    async put(title: string) {
        try {
            await this.dataSource.put(title)
        } catch (err) {
            console.log('in block err: ' + err)
            throw err
        }
    }
}
