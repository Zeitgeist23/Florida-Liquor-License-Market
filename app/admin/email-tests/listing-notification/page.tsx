export default function ListingNotificationEmailTestPage() {
  return (
    <main style={{ maxWidth: 720, margin: "64px auto", padding: "0 24px", fontFamily: "Arial, sans-serif" }}>
      <h1>FLLM Corporate Signature Test</h1>
      <p>
        Sends one production-path test message to <strong>jwigg023@gmail.com</strong>.
        It does not contact any brokers.
      </p>
      <form action="/api/admin/email-tests/listing-notification" method="post">
        <button
          type="submit"
          style={{
            background: "#071a35",
            color: "#fff",
            border: 0,
            borderRadius: 6,
            padding: "14px 22px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Send production signature test
        </button>
      </form>
    </main>
  );
}
