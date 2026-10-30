import LegalPageShell from "@/components/LegalPageShell";

const CookiePolicy = () => (
  <LegalPageShell kicker="Legal" title="Cookie Policy" lastUpdated="[DATE OF LAST UPDATE]">
    <p>
      This Cookie Policy explains how the Toli Motors website uses cookies and similar technologies, and
      what choices you have.
    </p>

    <h2>1. What are cookies?</h2>
    <p>
      Cookies are small text files stored on your device when you visit a website. They are widely used to
      make websites work, work more efficiently, or provide information to the site owner.
    </p>

    <h2>2. Cookies on this website</h2>
    <p>
      This website <strong>does not set any first-party cookies</strong> and does not run any analytics or
      advertising trackers. We do not use cookies to identify you, build a profile, or track you across
      other websites.
    </p>

    <h2>3. Third-party cookies</h2>
    <p>The only cookies that could be set come from third-party services embedded in this website:</p>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left">
          <th className="py-2 pr-4">Service</th>
          <th className="py-2 pr-4">Why</th>
          <th className="py-2">How to control</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-border/60">
          <td className="py-2 pr-4">Google Maps</td>
          <td className="py-2 pr-4">
            Embedded map on the Contact page. Google may set cookies and receive standard web request
            data (such as your IP address).
          </td>
          <td className="py-2">
            The map only loads after you click "Load map" — until then, no Google cookies are set by this
            embed.
          </td>
        </tr>
        <tr className="border-b border-border/60">
          <td className="py-2 pr-4">Google Fonts</td>
          <td className="py-2 pr-4">
            Font files are requested from Google's servers, which may receive a standard web request.
          </td>
          <td className="py-2">Block third-party requests in your browser if you prefer not to contact Google.</td>
        </tr>
      </tbody>
    </table>

    <h2>4. Consent choice for Google Maps</h2>
    <p>
      To respect your privacy, the Google Map on our contact page is shown only after you consent by
      clicking the "Load map" prompt. Your choice is remembered on your own device using{" "}
      <strong>localStorage</strong> (not a cookie). You can reset it at any time by clearing your
      browser's site data for this site.
    </p>

    <h2>5. How to control or delete cookies</h2>
    <p>
      Most browsers let you view, block, or delete cookies, and to block third-party requests. The "Help"
      menu of your browser explains how. Please note that blocking third-party embeds may reduce the
      functionality of pages (for example, the map will not display).
    </p>

    <h2>6. Contact</h2>
    <p>
      Questions about this Cookie Policy:{" "}
      <a href="mailto:[PRIVACY CONTACT EMAIL]">[PRIVACY CONTACT EMAIL]</a>.
    </p>

    <p>
      Read more in our <a href="#/privacy-policy">Privacy Policy</a>.
    </p>

    <p className="text-xs opacity-70 mt-8">
      Note: Prepared from the website's code. Please have it reviewed by legal counsel and fill in the
      [PLACEHOLDER] fields before relying on it for public launch.
    </p>
  </LegalPageShell>
);

export default CookiePolicy;