export default function HomeCarouselAvailableColorFix() {
  return (
    <style>{`
      .listing-card[data-homepage-available-card="true"] .listing-facts span:last-child,
      .listing-card[data-homepage-available-card="true"] .listing-facts span:last-child::first-letter {
        color: #58c94f !important;
      }
    `}</style>
  );
}
