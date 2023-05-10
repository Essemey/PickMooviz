import { Either, makeLeft, makeRight } from "./either";

//Typer correctement data et error

export default async function request<Error, Res>(url: string, config?: {}): Promise<Either<Error, Res>> {

    try {
        const res = await fetch(url, config);
        if (!res.ok) throw { Error: 'Fetching error' };
        const data = await res.json() as any;
        if (data.Response === "False") throw data;
        return makeRight(data);
    }
    catch (err: any) {
        const error = new Error(err.Error, { cause: err }) as Error;
        return makeLeft(error);
    }
}