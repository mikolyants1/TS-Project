import { Rec } from "../types";

export abstract class GenData {
  protected readonly winner:number[][] = [
    [0, 1, 2],[3, 4, 5],
    [6, 7, 8],[0, 3, 6],
    [1, 4, 7],[2, 5, 8],
    [0, 4, 8],[6, 4, 2]
  ];

  protected createWinData(combos:number[][]):Rec<string>[]{
    const data:Rec<string>[] = combos.map((el:number[])=>{
    const obj:Rec<string> = {};
     el.forEach((i:number)=>obj[i] = "");
     return obj
    });
    return data;
  };

  protected createCombos(combos:number[][]):number[][]{
    const date:string = JSON.stringify(combos);
    return [...JSON.parse(date)];
  };
  
}