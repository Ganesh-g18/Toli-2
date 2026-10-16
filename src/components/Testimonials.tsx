import JourneyTrim from "@/components/journey/JourneyTrim";
import { ExternalLink, MessageCircle, Star } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

/**
 * LATEST GOOGLE REVIEWS — placeholder structure.
 *
 * Reviews must come from an authorized Google source (the business's Google
 * Business Profile via the Places API from a backend/keyed call, or an
 * approved Google reviews widget). The `reviews` array is intentionally EMPTY:
 * this site does not fabricate, rewrite, or copy reviews, and no authorized
 * feed is connected yet. Do NOT hand-write entries here.
 *
 * To enable live reviews:
 *   1. Confirm the business's Google Business Profile and its Place ID.
 *   2. Wire an authorized source (backend Places API call, or approved widget).
 *   3. Populate `reviews` from that source only.
 *   4. Replace GOOGLE_PROFILE_URL with the verified profile URL.
 *
 * The Place ID previously bundled in this component (ChIJN1t_tDeuEmsRUsoyG83frY4)
 * resolves to a Google office in Pyrmont, Sydney (Google's API documentation
 * example) — NOT this business — so it was removed.
 */

type Review = {
  authorName: string;
  rating: number;
  date: string;
  text: string;
  url: string;
};

// Neutral Maps search until the verified Google Business Profile URL is supplied.
const GOOGLE_PROFILE_URL = "https://www.google.com/maps/search/?api=1&query=Toli%20Motors%20Anantapur";

// Intentionally empty — see the comment at the top of this file.
const reviews: Review[] = [];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Stars = ({ rating }: { rating: number }) => (
  <>
    <span className="sr-only">Rated {rating} out of 5 on Google</span>
    <span className="flex items-center justify-center gap-0.5 text-primary" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-current" : "opacity-30"}`} />
      ))}
    </span>
  </>
);

const Testimonials = () => {
  return (
    <section className="journey-section journey-reviews section-padding luxury-section bg-card/80" aria-labelledby="latest-google-reviews-heading" data-journey-section="reviews">
      <JourneyTrim number="11" label="CUSTOMER FEEDBACK" motif="frame" />
      <div className="max-w-7xl mx-auto">
        <Reveal variant="fade" className="text-center mb-12">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3">Google Reviews</p>
          <h3
            id="latest-google-reviews-heading"
            className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl mb-4"
            style={{ "--motion-delay": "80ms" } as React.CSSProperties}
          >
            WHAT OUR CUSTOMERS SAY
          </h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Latest reviews from our Google Business Profile
          </p>
        </Reveal>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {reviews.map((review, i) => (
              <Reveal
                key={`${review.authorName}-${i}`}
                variant="fade"
                delay={Math.min(i * 70, 280)}
                className="cinematic-card luxury-panel rounded-2xl p-6 flex flex-col h-full"
              >
                <figure className="flex flex-col h-full">
                  <div className="mb-3">
                    <Stars rating={review.rating} />
                  </div>
                  <blockquote className="flex-1 text-foreground/90 leading-relaxed text-[15px]">
                    <p>&ldquo;{review.text}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm">
                      <GoogleIcon />
                      <span className="font-medium text-foreground">{review.authorName}</span>
                      <span className="text-muted-foreground">{review.date}</span>
                    </span>
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read this Google review from ${review.authorName} on Google`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Google
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal variant="fade" className="max-w-3xl mx-auto">
            <div className="cinematic-card luxury-panel rounded-2xl p-6 sm:p-10 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 mb-5">
                <GoogleIcon />
                <span className="font-display text-xs tracking-widest text-foreground">GENUINE GOOGLE REVIEWS</span>
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6 max-w-xl mx-auto">
                Review cards appear here only when pulled from our verified Google Business Profile.
                Until the profile is connected, read and share real customer feedback directly on Google.
              </p>
              <div className="flex flex-col min-[360px]:flex-row flex-wrap items-center justify-center gap-3">
                <a
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxury-button inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-primary text-primary-foreground font-display text-sm tracking-wider hover:bg-primary/90 transition-all duration-300"
                >
                  <GoogleIcon />
                  VIEW ALL GOOGLE REVIEWS
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
                <a
                  href="https://wa.me/918074946335?text=Hi%2C%20I%27d%20like%20to%20share%20feedback%20about%20Toli%20Motors."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxury-button inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-border bg-background/80 backdrop-blur font-display text-sm tracking-wider text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <MessageCircle />
                  SHARE FEEDBACK ON WHATSAPP
                </a>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Ratings and review counts are shown on this site only when they can be verified from Google.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Testimonials;