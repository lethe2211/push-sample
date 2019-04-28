import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './shared/services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = 'BAbb3DUbK_dUJeNLel2cA_4osDNzVHnFHCL5bw3PWgfBuJ6pkJj9mhARGKAkj28pCCGdK6xVRXeAM2aEC6NE0z4';

  constructor(
    private swPush: SwPush,
    private pushService: PushNotificationService
  ) {
  }

  sendSubscribeRequest() {
    if (this.swPush.isEnabled) {
      console.log('Push is enabled');
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(subscription => {
          console.log('Will subscribe to server');
          this.pushService
            .sendSubscriptionToTheServer(subscription)
            .subscribe();
        })
        .catch(console.error);
    } else {
      console.log('Push is not enabled');
    }
  }

  sendPushRequest() {
    this.pushService
      .sendPushRequestToTheServer()
      .subscribe((res) => {
        console.log(`Push request succeeded: ${res}`);
      });
  }
}
