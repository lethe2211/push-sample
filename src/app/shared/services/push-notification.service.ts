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

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    console.log(`Will send a subscription request: ${JSON.stringify(subscription)}`);
    return this.http.post(`${SERVER_URL}/subscription`, subscription);
  }

  public sendPushRequestToTheServer(title: string, body?: string) {
    console.log('Will send a push request');
    return this.http.post(`${SERVER_URL}/sendNotification`, {'title': title, 'body': body}, {responseType: 'text'});
  }
}
