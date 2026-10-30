import LegalPageShell from "@/components/LegalPageShell";

const PrivacyPolicy = () => (
  <LegalPageShell kicker="Legal" title="Privacy Policy" lastUpdated="[DATE OF LAST UPDATE]">
    <p>
      This Privacy Policy explains how <strong>[LEGAL BUSINESS NAME]</strong> (trading as{" "}
      <strong>Toli Motors</strong>) collects, uses, shares, and protects your personal information when
      you use this website. We respect your privacy and are committed to handling your data lawfully,
      transparently, and securely.
    </p>

    <h2>1. Who we are</h2>
    <p>
      This website is operated by <strong>[LEGAL BUSINESS NAME]</strong>, a multi-brand car workshop at{" "}
      <strong>[BUSINESS ADDRESS — please confirm: the site currently displays 6-2-806, Ram Nagar, Kovur
      Nagar, Anantapur, Andhra Pradesh 515004]</strong>. For privacy-related requests, contact us at{" "}
      <a href="mailto:[PRIVACY CONTACT EMAIL]">[PRIVACY CONTACT EMAIL]</a>.
    </p>

    <h2>2. Information we collect</h2>
    <p>We currently collect only the information you choose to provide:</p>
    <ul>
      <li>
        <strong>Enquiry form:</strong> your name, phone number, vehicle brand, service required, and any
        message you type. This is only used to respond to your enquiry.
      </li>
      <li>
        <strong>Send via WhatsApp:</strong> any phone number and message you type. These are opened in
        WhatsApp on your own device and are not stored on this website.
      </li>
      <li>
        <strong>AI chat assistant:</strong> runs entirely on your device against a local knowledge base.
        Your chat messages are not transmitted to our servers or any cloud service.
      </li>
    </ul>
    <p>
      We do <strong>not</strong> use cookies set by this website, and we do <strong>not</strong> run
      analytics, advertising, or tracking scripts.
    </p>

    <h2>3. Third-party services</h2>
    <ul>
      <li>
        <strong>WhatsApp (Meta):</strong> when you use the enquiry form or WhatsApp buttons, your message
        (including your name and phone number) is sent through WhatsApp's services. WhatsApp is operated
        by Meta and has its own terms and privacy policy. Please review them. This website does not
        control how WhatsApp processes your data.
      </li>
      <li>
        <strong>Google Maps:</strong> our contact page embeds a Google Map. By choosing to load the map,
        your device communicates with Google, which may set cookies. See our{" "}
        <a href="#/cookie-policy">Cookie Policy</a>.
      </li>
      <li>
        <strong>Google Fonts:</strong> font resources are loaded from Google's servers, which may receive
        a standard web request (such as your IP address).
      </li>
      <li>
        <strong>Brand logos:</strong> some car brand logos are served from a public CDN (jsDelivr). No
        personal data is involved.
      </li>
    </ul>

    <h2>4. How we use your information</h2>
    <p>We use the information you provide only to:</p>
    <ul>
      <li>respond to and act on your service enquiries;</li>
      <li>contact you by phone or WhatsApp about your enquiry;</li>
      <li>improve our website and services (in anonymised form).</li>
    </ul>

    <h2>5. Legal basis (India — DPDP Act, 2023)</h2>
    <p>
      Where the Digital Personal Data Protection Act, 2023 applies, we rely on{" "}
      <strong>your consent</strong> to process the personal data you submit through our enquiry forms. You
      may withdraw your consent at any time by contacting us; in that case we will stop processing your
      data, subject to applicable legal requirements.
    </p>

    <h2>6. Data retention</h2>
    <p>
      We retain enquiry information only as long as needed to respond to your enquiry and for legitimate
      record-keeping. <strong>[RETENTION PERIOD — e.g., "12 months" — to be confirmed by the business]</strong>.
    </p>

    <h2>7. Sharing and disclosure</h2>
    <p>
      We do not sell, rent, or trade your personal information. We share data only with the
      third-party service providers described in Section 3, or where required by law.
    </p>

    <h2>8. Your rights</h2>
    <p>Subject to applicable law, you may request to:</p>
    <ul>
      <li>access the personal data we hold about you;</li>
      <li>correct or update your personal data;</li>
      <li>request deletion of your personal data;</li>
      <li>withdraw consent to processing;</li>
      <li>lodge a complaint with the appropriate authority.</li>
    </ul>
    <p>
      To exercise any of these rights, email <a href="mailto:[PRIVACY CONTACT EMAIL]">[PRIVACY CONTACT
      EMAIL]</a>. We will respond within a reasonable time period.
    </p>

    <h2>9. Data security</h2>
    <p>
      We take reasonable technical and organisational measures to protect your information from
      unauthorised access, loss, or misuse. No method of transmission or storage is fully secure, and we
      cannot guarantee absolute security.
    </p>

    <h2>10. Children</h2>
    <p>
      Our website and services are intended for adults. We do not knowingly collect personal data from
      children. If you believe a child has provided us personal data, contact us and we will delete it.
    </p>

    <h2>11. Changes to this policy</h2>
    <p>
      We may update this Privacy Policy from time to time. The latest version will always be available on
      this page with the "Last updated" date shown above. Material changes will be highlighted here.
    </p>

    <h2>12. Contact</h2>
    <p>
      Questions or complaints about this policy or our data practices:{" "}
      <a href="mailto:[PRIVACY CONTACT EMAIL]">[PRIVACY CONTACT EMAIL]</a>.
    </p>

    <p className="text-xs opacity-70 mt-8">
      Note: This policy is a starting point prepared from the website's code. It has not been reviewed by
      a lawyer. Please have it reviewed by legal counsel and fill in the [PLACEHOLDER] fields before
      relying on it for public launch.
    </p>
  </LegalPageShell>
);

export default PrivacyPolicy;