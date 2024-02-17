import { Character } from "./character";

export class Enemy extends Character {
   id:number;
   health: number;
   strength: number;
   color: string = 'red';
   place: number;
   places:number[]
   current:number = 0;
   lose:boolean = false;

   constructor(id:number,health:number,strength:number,places:number[]){
    super();
    this.id = id;
    this.health = health;
    this.strength = strength;
    this.places = places;
    this.place = places[0]
   };

   damage(dam: number): void {
     super.damage(dam);
   };
}