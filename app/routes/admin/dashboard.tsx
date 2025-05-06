import { Header, StatsCard, TripCard } from "components";

export default function Dashboard() {
  const fakeUser = { name: "John Doe" };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`welcome ${fakeUser.name ?? "Guest"}`}
        description="Track travel trips and popular destinations to boost"
      />
      <StatsCard />
      <TripCard />
      Page content for dashboard
    </main>
  );
}
