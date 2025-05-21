import { Header } from "components";

export default function Trips() {
  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View and edit ai generated travel plans"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />
    </main>
  );
}
