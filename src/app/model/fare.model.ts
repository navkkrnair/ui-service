import { Deserializable } from "./deserializable.model";
export class Fare implements Deserializable 
{
    id: string;
    fare: string;
    currency: string;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }

}