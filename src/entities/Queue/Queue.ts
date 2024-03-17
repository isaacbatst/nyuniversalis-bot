export class Queue<T> {
  items: T[] = [];

  size() {
    return this.items.length;
  }

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }
}