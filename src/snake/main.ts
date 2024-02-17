import { IVectors } from "../types";
import { Snake } from "./Snake";

const input = document.querySelector("input") as HTMLInputElement;

input.onkeyup = (e:KeyboardEvent):void => {
  if (e.key == "Enter" && e.target && 'value' in e.target){
    const hard:unknown = e.target.value;
    if (!Number.isNaN(hard)){
    const ButtonBlock = document.querySelector(".buttons") as HTMLDivElement;
    const snake:Snake = new Snake(Number(hard));
    snake.drawTable()
    snake.drawMap()
    snake.vectors.forEach(({name,vector}:IVectors):void=>{
      const button:HTMLButtonElement = document.createElement("button");
      button.classList.add("move");
      button.innerHTML = name;
      button.onclick = ():void => snake.snakeMove(vector);
      ButtonBlock.append(button);
     });
   };
  };
};