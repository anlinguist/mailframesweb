import { createContext, useState } from 'react';
import { useContext } from 'react';

const EditorContext = createContext(null) as any;

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }

  return context;
};

const initialContent = `<mjml>
  <mj-head>
    <mj-title>Welcome to Mail Frames</mj-title>
    <mj-preview>Create Responsive Emails Effortlessly with AI</mj-preview>
    <mj-attributes>
      <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
      <mj-text
        font-weight="400"
        font-size="16px"
        color="#000000"
        line-height="24px"
        font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
      ></mj-text>
    </mj-attributes>
    <mj-style inline="inline">
      .body-section {
        -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
        box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
      }
    </mj-style>
    <mj-style inline="inline">
      .text-link {
        color: #5e6ebf;
      }
    </mj-style>
    <mj-style inline="inline">
      .footer-link {
        color: #888888;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#E7E7E7" width="600px">
    <mj-section full-width="full-width" background-color="#587752" padding-bottom="0">
      <mj-column width="100%">
        <mj-image
          src="https://mailframes.com/mflogo_white.svg"
          width="150px"
          alt="Mail Frames Logo"
          padding="20px 0"
        />
      </mj-column>
    </mj-section>
    <mj-wrapper padding-top="0" padding-bottom="0" css-class="body-section">
      <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
        <mj-column width="100%">
          <mj-text color="#212b35" font-weight="bold" font-size="20px">
            Welcome to Mail Frames
          </mj-text>
          <mj-text color="#637381" font-size="16px">
            Hello there,
          </mj-text>
          <mj-text color="#637381" font-size="16px">
            <strong>Mail Frames</strong> is your ultimate tool for creating beautiful, responsive email templates effortlessly. With our intuitive MJML editor and AI-powered design assistance, you can craft professional emails in minutes.
          </mj-text>
          <mj-text color="#637381" font-size="16px">
            <strong>How it works:</strong>
          </mj-text>
          <mj-text color="#637381" font-size="16px">
            <ul>
              <li style="padding-bottom: 20px">
                <strong>Edit with Ease:</strong> Use our user-friendly editor to customize templates or create your own from scratch.
              </li>
              <li style="padding-bottom: 20px">
                <strong>AI-Powered Designs:</strong> Generate stunning layouts based on simple descriptions using our AI integration.
              </li>
              <li>
                <strong>Instant Preview:</strong> See real-time previews of your emails across different devices.
              </li>
            </ul>
          </mj-text>
          <mj-text color="#637381" font-size="16px" >
            <strong>Sign up to:</strong>
          </mj-text>
          <mj-text color="#637381" font-size="16px">
            <ul>
              <li style="padding-bottom: 20px">
                <strong>Save Templates:</strong> Save up to 10 templates in your account for easy access.
              </li>
              <li style="padding-bottom: 20px">
                <strong>Access AI Features:</strong> Get up to 4 AI-generated designs per day to boost your creativity.
              </li>
              <li>
                <strong>Seamless Integration:</strong> Use our Chrome extension to inject your designs directly into your favorite email platforms.
              </li>
            </ul>
          </mj-text>
          <mj-button
            background-color="#587752"
            align="center"
            color="#ffffff"
            font-size="17px"
            font-weight="bold"
            href="https://mailframes.com/signup"
            width="300px"
          >
            Sign Up for Free
          </mj-button>
          <mj-text color="#637381" font-size="16px" padding-top="30px">
            Ready to take your email design to the next level? Sign up today and start creating!
          </mj-text>
          <mj-text color="#637381" font-size="16px" padding-bottom="0">
            For any questions, feel free to <a class="text-link" href="https://mailframes.com/contact">contact us</a>.
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-wrapper>
    <mj-wrapper full-width="full-width">
      <mj-section>
        <mj-column width="100%" padding="0">
          <mj-social
            font-size="15px"
            icon-size="30px"
            mode="horizontal"
            padding="0"
            align="center"
          >
            <mj-social-element
              name="facebook"
              href="https://facebook.com/mailframes"
              background-color="#A1A0A0"
            ></mj-social-element>
            <mj-social-element
              name="twitter"
              href="https://twitter.com/mailframes"
              background-color="#A1A0A0"
            ></mj-social-element>
            <mj-social-element
              name="linkedin"
              href="https://linkedin.com/company/mailframes"
              background-color="#A1A0A0"
            ></mj-social-element>
          </mj-social>
          <mj-text color="#445566" font-size="11px" font-weight="bold" align="center">
            Visit our website at
            <a href="https://mailframes.com" class="footer-link">www.mailframes.com</a>
          </mj-text>
          <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
            You're receiving this message because you visited our website. If you have any
            questions, feel free to contact us.
          </mj-text>
          <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
            &copy; 2024 Mail Frames Inc., All Rights Reserved.
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section padding-top="0">
        <mj-group>
          <mj-column width="100%" padding-right="0">
            <mj-text
              color="#445566"
              font-size="11px"
              align="center"
              line-height="16px"
              font-weight="bold"
            >
              <a class="footer-link" href="https://mailframes.com/privacy">Privacy Policy</a
              >&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;<a
                class="footer-link"
                href="https://mailframes.com/contact"
                >Contact Us</a
              >
            </mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>`

export const EditorProvider = ({ children }: any) => {
  const [value, setValue] = useState(initialContent);
  const setDefaultValue = () => setValue(initialContent);

  return (
    <EditorContext.Provider value={{ value, setValue, setDefaultValue }}>
      {children}
    </EditorContext.Provider>
  );
};