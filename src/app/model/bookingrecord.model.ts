import { OnInit } from "@angular/core";
import { Passenger } from "./passenger.model";
import { Deserializable } from "./deserializable.model";

export class BookingRecord implements OnInit, Deserializable
{
    id: string;
    flightNumber: string;
    origin: string;
    destination: string;
    flightDate: string;
    fare: string;
    bookingDate: string;
    passengers: Passenger[];
    status: string;
    ngOnInit()
    {
        this.passengers = [];
    }

    deserialize(input: BookingRecord)
    {
        Object.assign(this, input);
        this.passengers = input.passengers ? input.passengers.map(passenger => new Passenger().deserialize(passenger)) : [];
        return this;
    }

}
