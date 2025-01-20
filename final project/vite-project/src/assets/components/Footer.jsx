import styled from "styled-components";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <FooterTag>
      <LeftSection>
        <p>© 2025 Finance Manager. All rights reserved.</p>
        <PrivacyLink href="/documents/Privacy_Policy.pdf"   target="_blank">
          Политика конфиденциальности
        </PrivacyLink>
      </LeftSection>
      <RightSection>
        <SocialIcons>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </SocialIcons>
      </RightSection>
    </FooterTag>
  );
}

export default Footer;

const FooterTag = styled.footer`
  width: 100%;
  height: 10vh;
  background-color: f6f6f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #7a7f9a;
  padding: 0 20px;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
`;
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const PrivacyLink = styled.a`
  color:#679bff;
  text-decoration: none;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: #7a7f9a;
    font-size: 18px;
    transition: color 0.3s;

    &:hover {
      color: #679bff;
    }
  }
`;
