import { Header, StatsCard, TripCard } from "components";
import { fakeUser, dashboardStats, allTrips } from "~/constants/";

export default function Dashboard() {
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
