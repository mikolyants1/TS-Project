
import { IVectors } from "../types";
import { Border } from "./create";
  
export class Snake extends Border {
  static readonly table = document.querySelector("table") as HTMLTableElement;
  static readonly result = document.getElementById("res") as HTMLDivElement;
  static tds:NodeListOf<HTMLTableCellElement>;
    
  private readonly tail:number[] = [64];
  private inter:null|NodeJS.Timer = null;
  private count:number = 0;
  private ran:number = -1;
  
  private readonly bord:number[];
  readonly vectors:IVectors[];
  private hard:number;

  constructor(hard:number){
    super();
    this.bord = this.createBorder();
    this.vectors = this.createVectors();
    this.hard = hard;
  };
    
  drawTable():void{
    for (let i:number = 0; i < 9; i++) {
      const tr:HTMLTableRowElement = document.createElement("tr");
      for (let i:number = 0; i < 9; i++) {
        const td:HTMLTableCellElement = document.createElement("td");
        td.style.cssText = `width:30px;height:30px;border:1px solid black;`;
        tr.append(td);
      };
      Snake.table.append(tr);
    };
    Snake.tds = document.querySelectorAll("td");
    const firstScreen:number[] = [];
    Snake.tds.forEach((_:HTMLTableCellElement,i:number):void=>{
      if (!this.bord.some((x:number)=> i == x) && i !== 64){
        firstScreen.push(i);
      };
    });
    this.createRandom(firstScreen);
  };
    
  drawMap():void{
    const {bord,tail,ran,count}:Snake = this;
    Snake.tds.forEach((_:HTMLTableCellElement,i:number):void=>{
      const isBord:boolean = bord.some((x:number)=> x == i);
      this.drawTd(i, isBord ? "brown" : "green");
    });
    this.drawTd(ran,'yellow');
    for (let i:number = tail.length-1-count; i < tail.length; i++) {
      const color:string = i == tail.length - 1 ? "grey" : "black";
      this.drawTd(tail[i],color);
    };
  };
          
  private drawApp():void{
    const screen:number[] = [];
    Snake.tds.forEach((_:HTMLTableCellElement,i:number):void=>{
      if (this.compare(i,'green')) screen.push(i);
    });
    this.createRandom(screen);
  };
  
  private createRandom(arr:number[]):void{
    const ran:number = Math.floor(Math.random()*arr.length);
    this.ran = arr[ran];
  };

  snakeMove(vector:number):void{
    if (this.inter) clearInterval(this.inter);
    this.inter = setInterval(():void=>{
      let idx:number = -1;
      Snake.tds.forEach((_:HTMLTableCellElement,i:number):void=>{
        if (this.compare(i,"grey")) idx = i;
      });
      this.tail.push(idx+vector);
      if ((idx + vector) == this.ran){
        this.count++;
        this.drawApp();
      };
      this.finishGame(idx + vector);
      this.drawMap();
    },1100 - this.hard * 100);
  };
  
  private drawTd(i:number,color:string):void{
   Snake.tds[i].style.backgroundColor = color;
  };
  
  private compare(i:number,color:string):boolean{
   return Snake.tds[i].style.backgroundColor == color;
  };

  private checkResult(lose:boolean,win:boolean):void{
     if (lose) Snake.result.innerHTML = "lose";
     if (win) Snake.result.innerHTML = "win";
     if ((lose || win) && this.inter ){
      clearInterval(this.inter);
      return;
     };
  };

  private finishGame(i:number):void{
    const lose1:boolean = this.bord.some((x:number)=> x == i);
    const lose2:boolean = this.compare(i,'black');
    let win:boolean = true;
    Snake.tds.forEach((_:HTMLTableCellElement,i:number):void=>{
      if (this.compare(i,'green')) win = false;
    });
    this.checkResult(lose1 || lose2, win);
  };
};