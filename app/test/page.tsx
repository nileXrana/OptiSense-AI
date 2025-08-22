"use client";
import Script from "next/script";
import React from 'react'

const page = () => {
  return (
    <div>
        Hello
        {/* window.PhonePeCheckout.transact({ tokenUrl, callback, type: "IFRAME" }); */}
      <Script
        src="https://mercury.phonepe.com/web/bundle/checkout.js"
        strategy="beforeInteractive"
      />
    </div>
  )
}

export default page
