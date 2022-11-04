import { CelebrationCalculator } from "./CelebrationCalculator";

export class MissingTenPercentCelebrationCalculator implements CelebrationCalculator {
  next?: CelebrationCalculator | undefined;
  
  constructor(next?: CelebrationCalculator){
    this.next = next;
  }
  
  calculate(counter: number, number: number): string | undefined {
    const isDifferenceTenPercent = (number - counter) === (number * 0.1);

    if(isDifferenceTenPercent) {
      return this.getMessage(number)
    }

    return this.next?.calculate(counter, number);
  }

  private getMessage(number: number) {
    return `Quase nos ${number}, podem começar a marcar o churrasco, vai ser na casa de quem?`
  }

}