import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const SERVER_URL = 'https://lethe2211.appspot.com';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
    private http: HttpClient
  ) { }

  public sendSubscriptionToTheServer(payload: any) {
    console.log(`Will send a subscription request: ${JSON.stringify(payload)}`);
    return this.http.post(`${SERVER_URL}/subscription`, payload);
  }

  public sendPushRequestToTheServer(id: string, title: string, body?: string) {
    console.log('Will send a push request');
    return this.http.post(`${SERVER_URL}/sendNotification`, {'ID': id, 'title': title, 'body': body}, {responseType: 'text'});
  }
}
