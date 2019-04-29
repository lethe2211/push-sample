import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './shared/services/push-notification.service';
import { PushModel } from './shared/models/push-model';

import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = 'BAbb3DUbK_dUJeNLel2cA_4osDNzVHnFHCL5bw3PWgfBuJ6pkJj9mhARGKAkj28pCCGdK6xVRXeAM2aEC6NE0z4';

  pushModel = new PushModel('Input push title', 'Input push message');

  id = null;

  constructor(
    private swPush: SwPush,
    private pushService: PushNotificationService
  ) {
    this.swPush.subscription.subscribe(pushSubscription => {
      this.id = UUID.UUID();
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(subscription => {
          const payload = { 'ID': this.id, 'subscription': subscription }
          console.log('Will subscribe to server');
          this.pushService
            .sendSubscriptionToTheServer(payload)
            .subscribe();
        })
        .catch(console.error);
      console.log('ID:', this.id);
      console.log('endpoint:', pushSubscription.toJSON().endpoint);
      console.log('publicKey:', pushSubscription.toJSON().keys.p256dh);
      console.log('authSecret:', pushSubscription.toJSON().keys.auth);
    });
  }

  sendPushRequest() {
    const title = this.pushModel.title;
    const body = this.pushModel.body;

    this.pushService
      .sendPushRequestToTheServer(this.id, title, body)
      .subscribe((res) => {
        console.log(`Push request succeeded: ${res}`);
      });
  }

  get diagnostic() { return JSON.stringify(this.pushModel); }
}
