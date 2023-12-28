"use client";

import { GoogleMapsEmbed } from "@next/third-parties/google";

export default function GoogleMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const officeAddress = process.env.OFFICE_ADDRESS;
  return (
    <GoogleMapsEmbed
      apiKey={apiKey}
      height={500}
      width="100%"
      mode="place"
      q={officeAddress}
    />
  );
}
