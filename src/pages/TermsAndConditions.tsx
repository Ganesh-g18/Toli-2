import LegalPageShell from "@/components/LegalPageShell";

const TermsAndConditions = () => (
  <LegalPageShell kicker="Legal" title="Terms & Conditions" lastUpdated="[DATE OF LAST UPDATE]">
    <p>
      These Terms &amp; Conditions govern your use of the Toli Motors website and the services offered by{" "}
      <strong>[LEGAL BUSINESS NAME]</strong>. By using this website or submitting an enquiry, you agree to
      these terms.
    </p>

    <h2>1. About our services</h2>
    <p>
      Toli Motors is a multi-brand car workshop providing automobile services, spare parts, repairs,
      detailing, vehicle inspection, doorstep pickup and drop, and annual maintenance contracts in and
      around Anantapur, Andhra Pradesh. Service availability, pricing, and appointments are confirmed by
      the workshop directly.
    </p>

    <h2>2. Estimates and pricing</h2>
    <ul>
      <li>
        Quotes provided through this website, by phone, or on WhatsApp are <strong>estimates</strong> and
        may change once the vehicle is inspected.
      </li>
      <li>
        Final charges are confirmed before work begins where reasonably possible. Parts and consumables
        are billed as used.
      </li>
      <li>
        <strong>[Any discounts or promotions shown are subject to change and may be withdrawn without
        notice. Confirm current offers with the workshop.]</strong>
      </li>
    </ul>

    <h2>3. Bookings and appointments</h2>
    <p>
      Submitting an enquiry form, or contacting us by phone or WhatsApp, is a request for information or a
      booking request. Your appointment is confirmed only when our team contacts you to confirm it.
    </p>

    <h2>4. Vehicle care and liability</h2>
    <ul>
      <li>
        Vehicles are handled with reasonable care by our trained technicians.
      </li>
      <li>
        We are not liable for delays or issues caused by parts availability, force majeure, or events
        outside our reasonable control.
      </li>
      <li>
        Any vehicle left with us for service is done so at your own risk in respect of loss or damage
        caused by events beyond our control. <strong>[The business should confirm its warehousing /
        bailment terms with legal counsel.]</strong>
      </li>
    </ul>

    <h2>5. Warranties</h2>
    <p>
      <strong>[Any warranty offered on parts or labour is subject to the manufacturer's terms and to
      Toli Motors' own policy. Confirm warranty terms in writing when you book.]</strong>
    </p>

    <h2>6. Payments</h2>
    <p>
      Payment methods and terms are agreed with the workshop at the time of service. We do{" "}
      <strong>not</strong> process any online payments through this website.
    </p>

    <h2>7. Use of this website</h2>
    <ul>
      <li>You agree not to use this website for any unlawful purpose or in a way that could harm it.</li>
      <li>Content on this website is provided for general information and may change at any time.</li>
      <li>
        We do not guarantee that this website will be uninterrupted, error-free, or free of harmful
        components. You use it at your own risk.
      </li>
    </ul>

    <h2>8. Intellectual property</h2>
    <p>
      The Toli Motors name and logo, the website design, and its content (excluding third-party brand
      marks shown for identification, which remain the property of their owners) are owned by Toli
      Motors and may not be copied or reused without permission.
    </p>

    <h2>9. Limitation of liability</h2>
    <p>
      To the maximum extent permitted by law, Toli Motors shall not be liable for any indirect,
      incidental, or consequential damages arising out of your use of this website or reliance on its
      content.
    </p>

    <h2>10. Governing law</h2>
    <p>
      These terms are governed by the laws of India. Any disputes are subject to the exclusive
      jurisdiction of the courts at <strong>[CITY OF REGISTRATION — e.g., Anantapur, Andhra Pradesh]</strong>.
    </p>

    <h2>11. Changes to these terms</h2>
    <p>
      We may update these Terms &amp; Conditions from time to time. The latest version will always be
      displayed on this page.
    </p>

    <h2>12. Contact</h2>
    <p>
      For questions about these terms, contact us at{" "}
      <a href="mailto:[PRIVACY CONTACT EMAIL]">[PRIVACY CONTACT EMAIL]</a>.
    </p>

    <p className="text-xs opacity-70 mt-8">
      Note: These terms are a starting point prepared from the website's code and have not been reviewed by
      a lawyer. Fill in the [PLACEHOLDER] fields and have them reviewed by legal counsel before relying on
      them for public launch.
    </p>
  </LegalPageShell>
);

export default TermsAndConditions;