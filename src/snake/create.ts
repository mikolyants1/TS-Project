import { IVectors } from "../types";

export abstract class Border {
    protected createLeft():number[]{
     const left:number[] = [9];
      for (let i:number = 0; i < 7; i++) {
        left.push(left[i]+9);
      };
      return left;
    };

    protected createRight(){
      const right:number[] = [17];
      for (let i:number = 0; i < 7; i++) {
        right.push(right[i]+9);
      };
      return right;
    };

    protected createTop():number[]{
      const top:number[] = [];
      for (let i:number = 0; i < 9; i++) {
        top.push(i)
      };
      return top;
    };

    protected createBottom():number[]{
      const bottom:number[] = [];
      for (let i:number = 73; i < 81; i++) {
        bottom.push(i);
      };
      return bottom;
    };
    protected createVectors():IVectors[]{
      const names:string[] = ['up','down','left','right'];
      const vectors:number[] = [-9,9,-1,1];
      return names.map((el:string,i:number)=>({name:el,vector:vectors[i]}));
    };
    
    protected createBorder():number[]{
       return [
         this.createLeft(),
         this.createRight(),
         this.createBottom(),
         this.createTop()
       ].flat();
    }
}