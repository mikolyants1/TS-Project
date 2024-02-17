import { Border } from "./border"
import { Und } from "../types";
import { Hero } from "./Hero";
import { Enemy } from "./Enemy";

export class Dungeon extends Border {
 static readonly body = <HTMLDivElement> document.getElementById("app");
 static readonly res = <HTMLDivElement> document.getElementById("result");
 static readonly meter = <HTMLMeterElement> document.querySelector('meter');
 static readonly proc = <HTMLDivElement> document.getElementById("procent");
 static tds:NodeListOf<HTMLTableCellElement>;

 private readonly Hero:Hero = new Hero();
 private readonly Enemy1:Enemy = new Enemy(1,150,45,[157,158,159,160,161]);
 private readonly Enemy2:Enemy = new Enemy(2,150,45,[317,316,315,314,313]);
 private readonly Boss:Enemy = new Enemy(3,270,90,[175,205,235,265,295]);

 private readonly AllEnemies:Enemy[];
 private readonly border:number[];
 private readonly door:number[];

   constructor(){
    super();
    this.AllEnemies = this.createAllEnemies();
    this.border = this.createAllBorders();
    this.door = this.createDoor();
   };
   
   private createAllEnemies():Enemy[]{
    return [this.Enemy1,this.Enemy2,this.Boss];
   };

   drawMap():void {
    for (let i:number = 0; i < 15; i++) {
      const tr = <HTMLTableRowElement> document.createElement("tr");
      for (let j:number = 0; j < 30; j++) {
        const td = <HTMLTableCellElement> document.createElement("td");
        tr.append(td);
      };
      Dungeon.body.append(tr);
    };
    Dungeon.tds = document.querySelectorAll('td');
    Dungeon.tds.forEach(({style}:HTMLTableCellElement,i:number):void=>{
      if (this.border.some((idx:number)=>idx==i)){
         style.backgroundColor = 'grey';
      };
    });
    Dungeon.tds[this.Hero.place].style.backgroundColor = this.Hero.color;
    Dungeon.tds[this.Hero.place].style.borderRadius = '50%';
    Dungeon.tds[40].innerHTML = 'X';
    Dungeon.tds[405].innerHTML = 'H';
    Dungeon.tds[50].innerHTML = 'H';
    this.AllEnemies.forEach((i:Enemy):void=>{
      let current = 0;
      let back:boolean = false;
      i.inter = setInterval(():void=>{
      i.place = i.places[current];
      i.places.forEach((el:number)=>{
        const bg:string = el == this.Hero.place ? "gold" : "black";
        Dungeon.tds[el].style.backgroundColor = bg;
        Dungeon.tds[el].style.border = '1px solid grey'
      });
      const idx:number = i.places[current];
      Dungeon.tds[idx].style.backgroundColor = i.color;
      if (i.id == 3){
       Dungeon.tds[idx].style.border = '1px solid gold';
      };
      if (current === 0) back = false;
      if (current === 4) back = true;
      if (back) current -=1;
      else current += 1;
      if (idx == this.Hero.place) this.enemyAttack(i.id);
      },600);
    });
  };

  private updateMap():void {
    const Next:HTMLTableCellElement = Dungeon.tds[this.Hero.place];
    const Prev:HTMLTableCellElement = Dungeon.tds[this.Hero.previous];
    Next.style.backgroundColor = this.Hero.color;
    Prev.style.backgroundColor = 'black';
    Prev.style.borderRadius = '0%';
    Next.style.borderRadius = '50%';
    if (Next.textContent == "X"){
      this.Hero.updateStrength();
      Next.textContent = "";
    };
    if (Next.textContent == "H"){
      this.Hero.updateHealth();
      this.updateMeter();
      Next.innerHTML = "";
    };
    this.setWin();  
  };
  
  private setWin():void{
    const {AllEnemies,door}:Dungeon = this;
    const def:boolean = AllEnemies.every((i:Enemy)=>i.lose == true);
    const open:boolean = door.some((i:number)=> i == this.Hero.place);
    if (def && open){
      Dungeon.res.innerHTML = "win";
      this.Hero.win = true;
    };
  };
  
  private createVariants(place:number):number[]{
    const vars:number[] = [1,29,30,31];
    const antiVars:number[] = vars.map((i:number)=>i * -1);
    return vars.concat(antiVars).map((i:number)=>place + i);
  };
  
  heroMove(vector:number):void {
    if (this.Hero.lose && this.Hero.win) return;
    const idx:number = this.Hero.place + vector;
    if (Dungeon.tds[idx].style.backgroundColor !== "grey"){
      this.Hero.previous = this.Hero.place;
      this.Hero.place += vector;
    };
    this.updateMap();
  };
  
  heroAttack():void{
    if (this.Hero.lose && this.Hero.win) return;
    const {Hero:{place},AllEnemies}:Dungeon = this;
    const variants:number[] = this.createVariants(place);
    AllEnemies.forEach((item:Enemy)=>{
    if (variants.some((i:number)=>i == item.place)){
        item.damage(this.Hero.strength);
      };
    });
    if (AllEnemies.every((i:Enemy)=>i.lose === true)){
       this.showDoor();
    };
  };
  
  private updateMeter(){
    Dungeon.meter.value = this.Hero.health;
    Dungeon.proc.innerHTML = `${this.Hero.health < 0 ? 0 : this.Hero.health}%`
    Dungeon.proc.style.color = this.Hero.health < 40 ? "red" : 'green';
    Dungeon.meter.style.accentColor = this.Hero.health < 40 ? "red" : 'green';
  };

  private enemyAttack(id:number):void{
   const enemy:Und<Enemy> = this.AllEnemies
   .find((i:Enemy)=>i.id == id);
    if (enemy && enemy.health > 0 && !this.Hero.lose){
      this.Hero.damage(enemy.strength);
      this.updateMeter();
    };
    if (this.Hero.lose){
     Dungeon.res.innerHTML = 'lose';
    };
  };

  private showDoor():void{
    this.door.forEach((i:number):void=>{
    Dungeon.tds[i].style.backgroundColor = 'blueviolet';
    });
  }
}
