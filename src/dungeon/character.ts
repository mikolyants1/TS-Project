import { IPerson } from "../types";

export abstract class Character implements IPerson {
   health: number = 0;
   strength: number = 0;
   color:string = 'red';
   place:number = 0;
   lose:boolean = false;
   inter?:NodeJS.Timer;

   protected damage(dam: number):void{
     this.health -= dam;
     if (this.health <= 60){
      this.color = 'rgb(209, 23, 23)';
     };
     if (this.health <=30){
      this.color = 'rgb(170, 41, 41)';
     };
     if (this.health <= 0){
      this.lose = true;
      clearInterval(this.inter);
     };
   };
}