const express = require("express");
const { stringify } = require("uuid");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51H0PBdDthXXzKqsl0VeeWWGtycmhb2LFx7f5MddNGLnFAG7qua2oxqTVzkxHcA6SnGzg2TOy4tXxEcfUFFAYM2R000oCUoCbDL"
);

const calcAmount = async (items) => {
  console.log(items);
  let sum = 0;
  await items.forEach((item) => {
    sum += item.amount * item.quantity;
  });
};

router.post("/create-payment-intent", async (req, res) => {
  const { item } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    setup_future_usage: "off_session",
    amount: calcAmount(items),
    currency: "inr",
  });

  res.send({
    publishableKey:
      "pk_test_51H0PBdDthXXzKqsl3psOYIoc42uPTYMmUpNhN6sKvyav0HiA9RmQ8RnHFColXyuhCIKBkRFp50yUtlwtUUrkBXsd00iSzRjbzF",
    clientSecret: paymentIntent.client_secret,
  });
});
