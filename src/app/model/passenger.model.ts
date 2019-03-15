import { Deserializable } from '../model/deserializable.model';
export class Passenger implements Deserializable
{
    id: string;
    firstName: string;
    lastName: string;
    gender: string;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}