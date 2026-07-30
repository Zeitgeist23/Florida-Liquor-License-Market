"use client";

import { useEffect, useState } from "react";

import styles from "./approved-background.module.css";

const PARTS = [
  "chunk-00.txt",
  "chunk-01.txt",
  "chunk-02.txt",
  "chunk-03.txt",
  "chunk-04.txt",
  "chunk-05.txt",
  "chunk-06-07.txt",
  "chunk-08-09.txt",
  "chunk-10-11.txt",
  "chunk-12-13.txt",
  "chunk-14-15.txt",
  "chunk-16-17.txt",
] as const;

const ASSET_DIRECTORY = "/assets/fllm-list-your-license-approved";
const EXPECTED_BASE64_LENGTH = 136448;

export default function ApprovedArtworkImage() {
  const [source, setSource] = useState<string>();

  useEffect(() => {
    let cancelled = false;

    async function loadArtwork() {
      try {
        const responses = await Promise.all(
          PARTS.map((part) => fetch(`${ASSET_DIRECTORY}/${part}`)),
        );

        if (responses.some((response) => !response.ok)) {
          throw new Error("One or more approved artwork files could not be loaded.");
        }

        const encoded = (
          await Promise.all(responses.map((response) => response.text()))
        )
          .join("")
          .replace(/\s+/g, "");

        if (encoded.length !== EXPECTED_BASE64_LENGTH) {
          throw new Error("The approved artwork data is incomplete.");
        }

        if (!cancelled) {
          setSource(`data:image/webp;base64,${encoded}`);
        }
      } catch (error) {
        console.error("Unable to load approved seller artwork.", error);
      }
    }

    void loadArtwork();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!source) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.approvedArtwork}
      src={source}
      alt=""
      aria-hidden="true"
    />
  );
}
