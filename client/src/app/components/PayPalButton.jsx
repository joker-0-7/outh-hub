"use client";
import React, { useEffect } from "react";

function PayPalButton({ userID }) {
  useEffect(() => {
    const loadPayPalScript = async () => {
      if (typeof window !== "undefined" && window.paypal) {
        window.paypal
          .Buttons({
            createOrder: async () => {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/users/create-order`,
                { method: "POST" }
              );
              const data = await res.json();
              return data.id;
            },
            onApprove: async (data) => {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/users/capture-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ orderID: data.orderID, userID }),
                }
              );

              const details = await res.json();
              alert(
                "Transaction completed by " + details.payer.name.given_name
              );
            },
          })
          .render("#paypal-button-container");
      } else {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=AWjB7UwBDMbzxjJj19Sv1JL7R1cmmdgTdv-UeIhgE7tOVAn2AUe8UcT8Ju_maA0zGy0C_ccIx9bIVMrd`;
        script.addEventListener("load", () => {
          window.paypal
            .Buttons({
              createOrder: async () => {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API}/users/create-order`,
                  { method: "POST" }
                );
                const data = await res.json();
                return data.id;
              },
              onApprove: async (data) => {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API}/users/capture-order`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ orderID: data.orderID, userID }),
                  }
                );

                const details = await res.json();
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );
              },
            })
            .render("#paypal-button-container");
        });
        document.body.appendChild(script);
      }
    };

    loadPayPalScript();
  }, [userID]);

  return <div id="paypal-button-container"></div>;
}

export default PayPalButton;
