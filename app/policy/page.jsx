import React from "react";

function Policy() {
  return (
    <div className="lg:mx-20 md:mx-10 mx-5 sm:my-10 my-5">
      <h2 className="sm:text-5xl text-3xl text-center sm:p-5 p-2">
        Store Policies
      </h2>

      <p className="sm:mb-4 mb-2 text-center">
        Welcome to Eagle Collection Store, your trusted destination for stylish,
        high-quality fashion and lifestyle products. To ensure a smooth shopping
        experience, we&apos;ve outlined our store policies below. By shopping
        with us, you agree to the terms listed here. We accept all payment
        method.
      </p>

      <div className="my-5">
        <h2 className="sm:text-2xl text-lg text-center pt-10 pb-5  ">
          Return & Exchange Policy
        </h2>

        <p className=" font-bold text-white text-xl py-2">No Cash Refunds</p>

        <ul>
          <li>
            Please note that we do not offer card refunds unless the item is
            damaged or defective upon arrival.
          </li>
          <li>
            If your item qualifies for a refund due to damage, the process must
            begin within 48 hours of receiving the item (see section below).
          </li>
        </ul>

        <p className="mt-5 font-bold text-white text-xl py-2">
          Exchange Policy
        </p>

        <ul>
          <li>Items can be exchanged within 7 days of the delivery date.</li>
          <li>
            To be eligible for an exchange, items must be unused and in their
            original condition.
          </li>
          <li>
            To be eligible for an exchange, items must have all tags and
            packaging intact.
          </li>
          <li>
            To be eligible for an exchange, items must be accompanied by a valid
            receipt or proof of purchase.
          </li>
          <li>
            Exchanges are only available for items of equal or lesser value. If
            exchanging for a higher-priced item, the price difference must be
            paid.
          </li>
        </ul>
        <p className="mt-5 font-bold text-white text-xl py-2">
          Damaged or Defective Items
        </p>

        <ul>
          <li>
            If your item arrives damaged or defective, we sincerely apologize
            and will make it right.
          </li>
          <li>
            Please contact us at info@eaglecollections.com within 48 hours of
            delivery with your order number, clear photos of the item and
            packaging, a description of the issue.
          </li>
          <li>
            Once the issue is confirmed, we will offer a replacement, store
            credit, or full refund, depending on the situation and item
            availability.
          </li>
        </ul>
      </div>

      <div className="my-5">
        <h2 className="sm:text-2xl text-lg text-center pt-10 pb-5 ">
          Order Processing
        </h2>

        <ul>
          <li>
            All orders are processed within 1-3 business days (excluding
            weekends and holidays).
          </li>
          <li>
            You will receive a confirmation email once your order has been
            placed, and a second email with tracking information once your order
            has shipped.
          </li>
        </ul>
      </div>
      <div className="my-5">
        <h2 className="sm:text-2xl text-lg text-center pt-10 pb-5 ">
          Shipping Policy
        </h2>

        <ul>
          <li>
            We offer nationwide shipping across the U.S., with options for
            standard and expedited delivery at checkout.
          </li>
          <li>
            Standard shipping typically takes 3-7 business days, depending on
            your location.
          </li>
          <li>
            Shipping fees are non-refundable unless the order is canceled before
            dispatch or if a damaged item is returned.
          </li>
          <li>
            Please ensure your shipping address is correct before completing
            your order. We are not responsible for delays or losses due to
            incorrect addresses.
          </li>
        </ul>
      </div>
      <div className="my-5">
        <h2 className="sm:text-2xl text-lg text-center pt-10 pb-5 ">
          Order Cancellation
        </h2>

        <ul>
          <li>
            Orders may be canceled within 12 hours of placement, provided they
            have not been processed or shipped.
          </li>
          <li>
            Once an order has been shipped, it can no longer be canceled.
            However, eligible items may still be exchanged according to our
            exchange policy.
          </li>
        </ul>
      </div>
      <div className="my-5">
        <h2 className="sm:text-2xl text-lg text-center pt-10 pb-5 ">
          Privacy Policy
        </h2>

        <ul>
          <li>
            Your privacy is important to us. All personal information collected
            during checkout or account registration is securely stored and never
            shared with third parties.
          </li>
          <li>
            Payment processing is encrypted and handled by secure, PCI-compliant
            services.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Policy;
