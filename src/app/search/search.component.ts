import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Flight } from '../model/flight.model';
import { Passenger } from '../model/passenger.model';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BookingRecord } from '../model/bookingrecord.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit
{
  searchquery = { origin: '', destination: '', flightDate: '' };
  flights: Flight[];
  bookingRecord: BookingRecord;
  showFlightList: boolean = false;
  showPassengerForm: boolean = false;
  showPassengerDetails: boolean = false;
  passengers: Passenger[];
  passengerForm: FormGroup;
  data: Object;
  bookingConfirmed: boolean = false;


  constructor(private appService: AppService, fb: FormBuilder)
  {
    this.passengerForm = fb.group({
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'gender': new FormControl()
    });

    this.flights = [];
    this.passengers = [];
    this.bookingRecord = new BookingRecord();
    this.data = {};
  }

  ngOnInit()
  {
  }

  onSearchQuerySubmit(): void
  {
    this.showFlightList = false;
    this.bookingConfirmed = false;
    this.bookingRecord = new BookingRecord();
    this.flights = [];
    this.passengers = [];
    this.appService
      .search(this.searchquery).subscribe(response =>
      {
        this.searchquery = { origin: '', destination: '', flightDate: '' };
        this.showFlightList = true;
        this.flights = response.map(flight => new Flight().deserialize(flight));
        console.log(this.flights);
      });
  }

  flightSelected(flight: Flight): void
  {
    this.showPassengerForm = true;
    this.bookingRecord.flightNumber = flight.flightNumber;
    this.bookingRecord.flightDate = flight.flightDate;
    this.bookingRecord.origin = flight.origin;
    this.bookingRecord.destination = flight.destination;
    this.bookingRecord.fare = flight.fares.fare;
    console.log('Productclicked: ', this.bookingRecord);
  }

  addPassenger()
  {
    this.passengers.push(this.passengerForm.value);
    console.log(this.passengers);
    this.passengerForm.reset();
    this.showPassengerDetails = true;
  }

  confirmBooking()
  {
    this.bookingRecord.passengers = this.passengers;
    this.appService.book(this.bookingRecord).subscribe(object => 
    {
      this.data = object;
      this.showFlightList = false;
      this.showPassengerDetails = false;
      if (this.data == 0)
      {
        this.bookingConfirmed = false;
      } else
      {
        this.bookingConfirmed = true;
        this.showPassengerForm = false;
      }


      console.log(this.data);
    });
  }
}

