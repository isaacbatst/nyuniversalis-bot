import { AtNumberCelebrationCalculator } from "./AtNumberCelebrationCalculator";
import { CelebrationCalculator } from "./CelebrationCalculator";
import { MissingTenCelebrationCalculator } from "./MissingTenCelebrationCalculator";
import { MissingTenPercentCelebrationCalculator } from "./MissingTenPercentCelebrationCalculator";

export class CelebrationCalculatorFactory {
  static make(): CelebrationCalculator {
    const atNumberCelebrationCalculator = new AtNumberCelebrationCalculator();
    const missingTenCelebrationCalculator = new MissingTenCelebrationCalculator(atNumberCelebrationCalculator);
    const missingTenPercentCelebrationCalculator = new MissingTenPercentCelebrationCalculator(missingTenCelebrationCalculator)
  
    return missingTenPercentCelebrationCalculator;
  }
}