import { CelebrationCalculator } from "./CelebrationCalculator";

export class MissingTenCelebrationCalculator implements CelebrationCalculator {
  next?: CelebrationCalculator | undefined;
  
  constructor(next?: CelebrationCalculator){
    this.next = next;
  }
  
  calculate(counter: number, number: number): string | undefined {
    const isDifferenceTen = (number - counter) === 10;

    if(isDifferenceTen) {
      return this.getMessage(number)
    }

    return this.next?.calculate(counter, number);
  }

  private getMessage(number: number) {
    return `A essa altura espero que o role dos ${number} já tenha data, local e atrações confirmadas`
  }

}