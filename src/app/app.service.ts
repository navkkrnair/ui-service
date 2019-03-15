import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Flight } from './model/flight.model';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { BookingRecord } from './model/bookingrecord.model';
import { CheckInRecord } from './model/checkinrecord.model';

@Injectable({
  providedIn: 'root'
})
export class AppService
{
  authenticated = false

  constructor(private http: HttpClient) { }

  authenticate(credentials, callback)
  {

    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('user', { headers: headers }).subscribe(response =>
    {
      if (response['name'])
      {
        this.authenticated = true;
      } else
      {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

  search(searchquery): Observable<Flight[]>
  {
    return this.http.post('/search-service/search/get', searchquery)
      .pipe(map(response =>
      {
        return (<Flight[]>response).map(flight => new Flight().deserialize(flight))
      }));

  }

  book(bookingRecord: BookingRecord): Observable<Object>
  {
    return this.http.post('/booking-service/booking/create', bookingRecord);
  }

  getBookingRecord(id: number): Observable<BookingRecord>
  {
    return this.http.get<BookingRecord>(`/booking-service/booking/get/${id}`);
  }

  checkIn(checkinRecord: CheckInRecord): Observable<Object>
  {
    return this.http.post('/checkin-service/checkin/create', checkinRecord);
  }
}

