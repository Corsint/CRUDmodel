export interface Game{
    id: string | number;
    name:string;
    category:string;
    description:string;
    price: number;
    onSale: boolean;
}

export type GameData = Omit<Game,'id'>
