import { OnInit } from '@angular/core';
import { Fare } from './fare.model';
import { Deserializable } from "./deserializable.model";
export class Flight implements Deserializable, OnInit
{
    id: string;
    flightNumber: string;
    origin: string;
    destination: string;
    flightDate: string;
    fares: Fare;


    ngOnInit()
    {
    }


    deserialize(input: any)
    {
        Object.assign(this, input);
        this.fares = input.fares ? new Fare().deserialize(input.fares) : new Fare();
        return this;
    }
}
