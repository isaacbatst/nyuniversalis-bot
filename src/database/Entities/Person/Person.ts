import { Model, Schema, model } from "mongoose";
import { DB_COLLECTION } from "../../../env";

export interface Person {
  name: string,
  nicknames: string[],
  counter: number,
  counterAmourant?: number
}

export interface IPersonModel extends Model<Person> {
  getNicknames(this: IPersonModel, name: string): Promise<string[]>,
  getCounter(this: IPersonModel, name: string, amouranth?: boolean): Promise<number>,
  getCounterAmouranth(this: IPersonModel, name: string): Promise<number>,
  incrementCounterAmouranth(this: IPersonModel, name: string): Promise<void>,
  incrementCounter(this: IPersonModel, name: string, amouranth?: boolean): Promise<void>,
}

const schema = new Schema<Person, IPersonModel>({
  name: String,
  nicknames: [String],
  counter: Number,
  counterAmourant: Number
}, {
  collection: DB_COLLECTION
})

schema.statics.getNicknames = async function getNicknames(this: IPersonModel, name: string): Promise<string[]> {
  const person = await this.findOne({ name });

  if (person) {
    return person.nicknames;
  }

  throw new Error('not found')
};

schema.statics.getCounter = async function getCounter(this: IPersonModel, name: string): Promise<number> {
  const person = await this.findOne({ name });

  if (person) {
    return person.counter;
  }

  throw new Error('not found');
}

schema.statics.incrementCounter = async function incrementCounter(this: IPersonModel, name: string): Promise<void> {
  const person = await this.findOne({ name });

  if (person) {
    await this.updateOne({ name }, { counter: person.counter + 1 });
    return;
  }

  throw new Error('not found');
}

schema.statics.getCounterAmouranth = async function getCounterAmouranth(this: IPersonModel, name: string): Promise<number> {
  const person = await this.findOne({ name });

  if (person && person.counterAmourant) {
    return person.counterAmourant
  }

  throw new Error('not found');
}

schema.statics.incrementCounterAmouranth = async function incrementCounterAmouranth(this: IPersonModel, name: string): Promise<void> {
  const person = await this.findOne({ name });

  if (person && person.counterAmourant) {
    await this.updateOne({ name }, { counterAmourant: person.counterAmourant + 1 });
    return;
  }

  throw new Error('not found');
}

export const PersonModel = model<Person, IPersonModel>('Person', schema);
