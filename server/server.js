const express = require("express");
const webpush = require("web-push");
const cors = require("cors");
const bodyParser = require("body-parser");

const PUBLIC_VAPID =
  "BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg";
const PRIVATE_VAPID = "_kRzHiscHBIGftfA7IehH9EA3RvBl8SBYhXBAMz6GrI";

const app = express();

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails("mailto:you@domain.com", PUBLIC_VAPID, PRIVATE_VAPID);
data = [];
app.post("/subscription", (req, res) => {
  data.push(req.body);
  //fakeDatabase=subscription;
  console.log("value is ", data[0]);
  res.send();
});

app.post("/sendNotification", (req, res) => {
  // console.log(res);

  const notificationPayload = {
    notification: {
      title: "New Notification",
      body: "This is the body of the notification",
      icon: "assets/icons/icon-512x512.png"
    }
  };
  //let promiseChain = Promise.resolve();

  webpush
    .sendNotification(data[0], JSON.stringify(notificationPayload))
    .then(e => {
      console.log(e);
    })
    .catch(err => {
      if (err.statusCode === 410) {
        return deleteSubscriptionFromDatabase(subscription._id);
      } else {
        console.log("Subscription is no longer valid: ", err);
      }
    });
  res.send();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
