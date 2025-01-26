import { SocialIcon } from "react-social-icons";
import {
  SocialMediaContainer,
  SocialMediaIconContainer,
  SocialMediaTitle,
} from "./styles";

export default function SocialMedia() {
  return (
    <SocialMediaContainer>
      <SocialMediaTitle className=" ">Our Social Media</SocialMediaTitle>
      <SocialMediaIconContainer>
        <SocialIcon
          network="facebook"
          url="https://www.facebook.com/profile.php?id=100064705848755&mibextid=ZbWKwL"
          target="_blank"
        />
        <SocialIcon
          network="instagram"
          url="https://www.instagram.com/eaglecollectionstore?igsh=MWhqZDU3M2F3OGx5dQ%3D%3D&utm_source=qr"
          target="_blank"
        />
        <SocialIcon
          network="whatsapp"
          url="https://wa.me/12103109644"
          target="_blank"
        />
        <SocialIcon
          network="tiktok"
          url="https://www.tiktok.com/@eaglecollections_store?_t=8j44epTfpTq&_r=1"
          target="_blank"
        />
      </SocialMediaIconContainer>
    </SocialMediaContainer>
  );
}
