
export interface IPerson {
    health:number,
    strength:number,
    color:string,
    place:number,
};

export interface IVectors {
    name:string,
    vector:number,
}
export type Rec<T> = Record<string,T>;

export type Und<T> = T | undefined;