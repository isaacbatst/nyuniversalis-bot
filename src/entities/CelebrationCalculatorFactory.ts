import { CelebrationCalculator } from "./CelebrationCalculator";
import { MissingTenCelebrationCalculator } from "./MissingTenCelebrationCalculator";
import { MissingTenPercentCelebrationCalculator } from "./MissingTenPercentCelebrationCalculator";

export class CelebrationCalculatorFactory {
  static make(): CelebrationCalculator {
    const missingTenCelebrationCalculator = new MissingTenCelebrationCalculator();
    const missingTenPercentCelebrationCalculator = new MissingTenPercentCelebrationCalculator(missingTenCelebrationCalculator)
  
    return missingTenPercentCelebrationCalculator;
  }
}