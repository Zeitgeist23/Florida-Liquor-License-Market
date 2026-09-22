import { permanentRedirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LeonardMelloNumericRedirectPage() {
  permanentRedirect("/listings/fllm-mello");
}
