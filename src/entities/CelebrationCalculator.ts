export interface CelebrationCalculator {
  next?: CelebrationCalculator,
  calculate(counter: number, number: number): string | undefined
}