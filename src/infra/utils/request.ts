import { Either } from "./either";


export default async function request<Res>(url: string, config?: {}): Promise<Res> {

    const res = await fetch(url, config)
    const data = await res.json();

    return data as Res;
}