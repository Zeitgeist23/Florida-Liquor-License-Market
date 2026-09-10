"use client";

import type { RefObject } from "react";

type Props = {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  phoneHref: string;
  profileHref: string;
};

export default function SuttonStaticModal({ closeButtonRef, onClose, phoneHref, profileHref }: Props) {
  return (
    <section className="sutton-static-modal" role="dialog" aria-modal="true" aria-label="James H. Sutton, Jr., CPA, Esq. attorney directory profile">
      <img className="sutton-static-modal-image" src="/assets/sutton-static-modal.webp" alt="James H. Sutton, Jr., CPA, Esq. FLLM attorney directory profile" />
      <button ref={closeButtonRef} className="sutton-static-hit sutton-static-close" type="button" aria-label="Close attorney details" onClick={onClose} />
      <a className="sutton-static-hit sutton-static-resource" href="/resources/fdor-assessment-disputes" aria-label="Open Florida DOR Assessment Disputes resource" />
      <a className="sutton-static-hit sutton-static-call" href={phoneHref} aria-label="Call James H. Sutton, Jr." />
      <a className="sutton-static-hit sutton-static-profile" href={profileHref} target="_blank" rel="noreferrer" aria-label="Visit Sutton firm profile" />
      <style>{`
        .sutton-static-modal{position:relative;width:min(1180px,96vw);max-height:92vh;overflow:hidden;border-radius:12px;box-shadow:0 32px 90px rgba(0,0,0,.72)}
        .sutton-static-modal-image{display:block;width:100%;height:auto;max-height:92vh;object-fit:contain}
        .sutton-static-hit{position:absolute;z-index:3;display:block;border:0;background:transparent;cursor:pointer;text-decoration:none}
        .sutton-static-close{left:88.4%;top:7.5%;width:6%;height:8%;border-radius:50%}
        .sutton-static-resource{left:43%;top:58%;width:49%;height:11%}
        .sutton-static-call{left:43%;top:70.3%;width:49%;height:5.7%}
        .sutton-static-profile{left:43%;top:76.6%;width:49%;height:5.7%}
        @media(max-width:720px){.sutton-static-modal{width:98vw;max-height:94vh}.sutton-static-modal-image{max-height:94vh}}
      `}</style>
    </section>
  );
}
