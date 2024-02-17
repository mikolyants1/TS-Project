import { Character } from "./character";

export class Hero extends Character {
    health: number = 100;
    strength: number = 30;
    color: string = 'gold';
    place:number = 241;
    lose:boolean = false;
    win:boolean = false;
    previous:number = 241;
 
    damage(dam: number): void {
      this.health -= dam;
      if (this.health <= 0) this.lose = true;
    };
 
    updateHealth():void{
     this.health += 30;
    };
 
    updateStrength():void{
     this.strength = 60;
    };
 }