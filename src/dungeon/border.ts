
export abstract class Border {
  protected createTopBord():number[]{
    return Array.from(Array(30).keys());
  };

  protected createLeftBord():number[]{
    const left:number[] = [30];
    for (let i:number = 0; i < 13; i++) {
      left.push(left[i]+30);
    };
    return left;
  };

  protected createRightBord():number[]{
    const right:number[] = this.createLeftBord();
    return right.map((i:number)=>i+29);
  };

  protected createBottomBord():number[]{
     const bottom:number[] = this.createTopBord();
     return bottom.map((i:number)=>i+420)
  };
  
  protected createTopWalls():number[]{
    const top:number[] = this.createTopBord();
    return top.map((i:number)=>i*6)
  };

  protected createBottomWalls():number[]{
    const coloumns:number[] = [306];
    for (let i:number = 0; i < 18; i++) {
      coloumns.push(coloumns[i] + 6);
    };
    return coloumns;
  };

  protected createDoor():number[]{
    const door:number[] = [178];
    for (let i:number = 0; i < 4; i++) {
      door.push(door[i] + 30)
    };
    return door;
  };

  protected createAllBorders():number[]{
    return [
      this.createRightBord(),
      this.createBottomBord(),
      this.createLeftBord(),
      this.createTopBord(),
      this.createBottomWalls(),
      this.createTopWalls(),
    ].flat();
   };
}