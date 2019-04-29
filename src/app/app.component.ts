import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './shared/services/push-notification.service';
import { PushModel } from './shared/models/push-model';

import { uuidv4 } from 'uuid/v4';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = 'BAbb3DUbK_dUJeNLel2cA_4osDNzVHnFHCL5bw3PWgfBuJ6pkJj9mhARGKAkj28pCCGdK6xVRXeAM2aEC6NE0z4';

  pushModel = new PushModel('Input push title', 'Input push message');

  id = uuidv4();

  constructor(
    private swPush: SwPush,
    private pushService: PushNotificationService
  ) {
    this.swPush.subscription.subscribe(pushSubscription => {
      if (pushSubscription == null) {
        this.swPush.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(subscription => {
          const payload = {'ID': this.id, 'subscription': subscription}
          console.log('Will subscribe to server');
          this.pushService
            .sendSubscriptionToTheServer(payload)
            .subscribe();
        })
        .catch(console.error);
    } else {
        console.log('endpoint:', pushSubscription.toJSON().endpoint);
        console.log('publicKey:', pushSubscription.toJSON().keys.p256dh);
        console.log('authSecret:', pushSubscription.toJSON().keys.auth);
      }
    });
  }

  sendSubscribeRequest() {
    if (this.swPush.isEnabled) {
      console.log('Push is enabled');
      // this.swPush
      //   .requestSubscription({
      //     serverPublicKey: this.VAPID_PUBLIC_KEY
      //   })
      //   .then(subscription => {
      //     console.log('Will subscribe to server');
      //     this.pushService
      //       .sendSubscriptionToTheServer(subscription)
      //       .subscribe();
      //   })
      //   .catch(console.error);
      
    } else {
      console.log('Push is not enabled');
    }
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
