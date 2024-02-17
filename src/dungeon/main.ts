import { Dungeon } from "./Dungeon";

const top = <HTMLButtonElement> document.getElementById("top");
const bottom = <HTMLButtonElement> document.getElementById("bottom");
const left = <HTMLButtonElement> document.getElementById("left");
const right = <HTMLButtonElement> document.getElementById("right");
const fight = <HTMLButtonElement> document.getElementById("fight");

const dungeon:Dungeon = new Dungeon();

top.onclick = ():void => dungeon.heroMove(-30);
bottom.onclick = ():void => dungeon.heroMove(30);
left.onclick = ():void => dungeon.heroMove(-1);
right.onclick = ():void => dungeon.heroMove(1);
fight.onclick = ():void => dungeon.heroAttack();

dungeon.drawMap();