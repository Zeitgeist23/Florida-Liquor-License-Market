"use client";

export default function ExchangeStaticClient() {
  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        background: "#020d18",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          lineHeight: 0,
        }}
      >
        <img
          src="/assets/fllm-exchange-landing-page-approved-design.png?v=20260912-1"
          alt="FLLM Exchange Board — Florida Liquor License Market"
          width={1024}
          height={1536}
          style={{
            display: "block",
            width: "100%",
            maxWidth: "none",
            height: "auto",
            margin: 0,
            padding: 0,
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "15.5%",
            height: "3.05%",
            background: "#020d18",
            zIndex: 1,
          }}
        />
        <img
          src="/assets/brand-sharp.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "1.25%",
            width: "auto",
            height: "3.05%",
            zIndex: 2,
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "0.45%",
            left: 0,
            width: "15.5%",
            height: "3.05%",
            background: "#020d18",
            zIndex: 1,
          }}
        />
        <img
          src="/assets/brand-sharp.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "0.45%",
            left: "1.7%",
            width: "auto",
            height: "3.05%",
            zIndex: 2,
          }}
        />
      </div>
    </main>
  );
}
