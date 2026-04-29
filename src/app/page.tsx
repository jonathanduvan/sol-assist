import { FunnelContainer } from "@/components/funnel/FunnelContainer";

type Props = {
  searchParams: Promise<{
    mode?: "self" | "consultant";
  }>;
};

export default async function QualifyPage({ searchParams }: Props) {
  const params = await searchParams;
  const mode = params.mode === "consultant" ? "consultant" : "self";

  return <FunnelContainer mode={mode} />;
}