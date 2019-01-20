import { Component } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { PushNotificationService } from "./pushNotification.service";

const VAPID_PUBLIC =
  "BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "angular-push-notifications";
  pushService: PushNotificationService;
  subscription: any;
  constructor(swPush: SwPush, pushService: PushNotificationService) {
    this.pushService = pushService;
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC
        })
        .then(subscription => {
          this.subscription = subscription;
          console.log("yes subscribed sucessfully");
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);
    }
  }
  sendNotification() {
    console.log("sending notification");
    this.pushService.sendNotification(this.subscription).subscribe();
  }
}
