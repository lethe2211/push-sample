import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = 'BBxV4ww4JSlETmuqOUp1U9Y9uDwYYnVW4IvAmHxBBjeGuD7wNqdbkVX2a2IggCCTZaUPiqb38XLUWE6uBELZ2tQ';

  constructor(
    private swPush: SwPush
  ) {
    if (this.swPush.isEnabled) {
      this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(subscription => {

      })
      .catch(console.error);
    }
  }

  subscribeToNotifications() {
    console.log('subscribeToNotifications');
  }
}
