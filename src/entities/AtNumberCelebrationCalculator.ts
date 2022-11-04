import { CelebrationCalculator } from "./CelebrationCalculator";

export class AtNumberCelebrationCalculator implements CelebrationCalculator {
  next?: CelebrationCalculator | undefined;
  
  constructor(next?: CelebrationCalculator){
    this.next = next;
  }
  
  calculate(counter: number, number: number): string | undefined {
    const isAtNumber = counter === number;

    if(isAtNumber) {
      return this.getMessage(number)
    }

    return this.next?.calculate(counter, number);
  }

  private getMessage(number: number) {
    return `${number}!!!! \n TA NA HORA TA NA HORA \n 🎃 TA NA HORA DE MAMAR 🎃`
  }

}