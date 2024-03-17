import { Queue } from "./Queue";

export class CircularQueue<T> {
  private queue: Queue<T>;
  private maxSize: number;

  constructor(size: number) {
    this.queue = new Queue<T>();
    this.maxSize = size;
  }

  public enqueue(item: T): void {
    if (this.queue.size() === this.maxSize) {
      this.queue.dequeue();
    }
    this.queue.enqueue(item);
  }

  public dequeue(): T | undefined {
    return this.queue.dequeue();
  }

  public items(): T[] {
    return this.queue.items;
  }
}