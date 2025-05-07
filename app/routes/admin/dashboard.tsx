import { Header, StatsCard, TripCard } from "components";

export default function Dashboard() {
  const fakeUser = { name: "John Doe" };
  const dashboardStats = {
    totalUsers: 12540,
    usersJoined: {
      current: 219,
      previous: 123,
    },
    totalTrips: 4209,
    tripsCreated: {
      current: 101,
      previous: 227,
    },
    userRole: {
      total: 53,
      current: 22,
      previous: 5,
    },
  };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`welcome ${fakeUser.name ?? "Guest"}`}
        description="Track travel trips and popular destinations to boost"
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.usersJoined.current}
            lastMonthCount={dashboardStats.usersJoined.previous}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats.totalTrips}
            currentMonthCount={dashboardStats.tripsCreated.current}
            lastMonthCount={dashboardStats.tripsCreated.previous}
          />
          <StatsCard
            headerTitle="Active Users"
            total={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.current}
            lastMonthCount={dashboardStats.userRole.previous}
          />
        </div>
      </section>
      <TripCard />
      Page content for dashboard
    </main>
  );
}
