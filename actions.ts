"use server";

import { valuesPayment } from "./app/[streamerId]/page";

export async function payment(values: valuesPayment, streamerId: string) {
  try {
    const res = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa("1023828:test_a_4MZObw5RxTgchTi53Ld0J8Ytp4MFp-iHIhzHOU3BY")}`,
        "Content-Type": "application/json",
        "Idempotence-Key": new Date().getTime().toString(),
      },
      body: JSON.stringify({
        amount: {
          value: String(values.amount),
          currency: "RUB",
        },
        payment_method_data: {
          type: "bank_card",
        },
        capture: true,
        confirmation: {
          type: "redirect",
          return_url: `https://donut-psi.vercel.app/${streamerId}`,
        },
        metadata: values,
      }),
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.log(error);
  }
}
