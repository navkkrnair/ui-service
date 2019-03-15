import { OnInit } from "@angular/core";

export class CheckInRecord implements OnInit
{
    id: string;

    lastName: string;
    firstName: string;
    seatNumber: string;

    checkInTime: string;
    flightNumber: string;
    flightDate: string;
    fare: string;
    bookingId: string;

    constructor(flight?: any, passenger?: any)
    {
        this.lastName = passenger && passenger.lastName || null;
        this.firstName = passenger && passenger.firstName || null;
        this.seatNumber = this.randomInt(1, 50);
        this.checkInTime = new Date().toISOString();
        this.flightNumber = flight && flight.flightNumber || null;
        this.flightDate = flight && flight.flightDate || null;
        this.bookingId = flight && flight.id || null;
    }

    ngOnInit()
    {
    }

    randomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}