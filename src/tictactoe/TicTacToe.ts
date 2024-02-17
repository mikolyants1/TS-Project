import { Rec, Und } from "../types";
import { GenData } from "./create";

export class TicTacToe extends GenData {
 static readonly td:NodeListOf<HTMLTableCellElement> = document.querySelectorAll("td");
 static readonly result = <HTMLDivElement> document.getElementById("result");

 private readonly combos:number[][];
 private readonly winData:Rec<string>[];
    
    constructor(){
      super();
      this.combos = this.createCombos(this.winner);
      this.winData = this.createWinData(this.combos);
    };

    private setNewValue(val:string,i:number):void{
      this.winData.forEach((el:Rec<string>):void=>{
        for (const key in el) {
          if (key == `${i}`){
            el[key] = val;
          };
        };
      });
    };
      
   setPlayerMove(i:number):void{
      let count:boolean = false;
      if (TicTacToe.result.textContent !== "") count = true;
      if (this.compare(i,"o")||this.compare(i,"x")||count){
        return;
      };
      TicTacToe.td[i].innerHTML = "x";
      this.setNewValue("x",i);
      this.combos.forEach((item:number[]):void=>{
        const idx:number = item.indexOf(i);
        if (idx !== -1) item.splice(idx,1); 
      });
      this.setBotMove();
    };
  
    private sortTable():void{
      const idxArr:number[] = [];
      TicTacToe.td.forEach((_:HTMLTableCellElement,i:number):void=>{
        if (this.compare(i,"o")) idxArr.push(i);
      });
      this.combos.forEach((item:number[]):void=>{
        idxArr.forEach((i:number):void=>{
          const idx:number = item.indexOf(i);
          if (idx !== -1) item.splice(idx,1);
        });
      });
    };

    private compare(idx:number,letter:string):boolean{
      return TicTacToe.td[idx].textContent == letter;
    };

    private checkedMove(arr:number[][]):Und<number[]>{
      return arr.find((i:number[])=> i.length !== 0);
    };

    private setResult(...args:boolean[]):void{
      const [win,lose,tie]:boolean[] = args;
      if (win) {
        TicTacToe.result.innerHTML = "win";
        return;
      };
      if (lose){
        TicTacToe.result.innerHTML = "lose";
        return;
      };
      if (!win && !lose && tie){
        TicTacToe.result.innerHTML = "tie";
        return;
      };
    };

    private setWin():void{
      let win:boolean = false;
      let lose:boolean = false;
      const tie:boolean = this.combos.every((i:number[])=>i.length == 0);
      this.winner.forEach((i:number[]):void=>{
        const player:boolean = i.every((x:number)=>this.compare(x,'x'));
        const bot:boolean = i.every((x:number)=>this.compare(x,'o'));
        if (player) win = true;
        if (bot) lose = true;
      });
      this.setResult(win,lose,tie);
    };
  
    private write(i:number):void{
      TicTacToe.td[i].innerHTML = "o";
      this.setNewValue("o",i);
      TicTacToe.td[i]
      .removeEventListener("click",()=>this.setPlayerMove(i));
    };
  
    private setBotMove():void{
      this.sortTable();
      const arr1:number[][] = [];
      const arr2:number[][] = [];
      const arr3:number[][] = [];
      this.combos.forEach((item:number[],i:number):void=>{
        const date:string[] = Object.values(this.winData[i]);
        const wait1:string[] = date.filter((i:string)=>i=="o");
        const wait2:string[] = date.filter((i:string)=>i=="x");
        if (wait1.length == 2) arr1.push(item);
        else if (wait2.length == 2) arr2.push(item);
        else arr3.push(item);
      });
      const newArr1:Und<number[]> = this.checkedMove(arr1);
      const newArr2:Und<number[]> = this.checkedMove(arr2);
      const newArr3:Und<number[]> = this.checkedMove(arr3);
      if (newArr1) this.write(newArr1[0]);
      else if (newArr2) this.write(newArr2[0]);
      else if (newArr3) this.write(newArr3[0]);
      this.setWin();
    };

    startGame(){
      TicTacToe.td.forEach((item:HTMLTableCellElement,i:number):void=>{
        item.addEventListener("click",()=>this.setPlayerMove(i));
      });
    }; 
  }
     