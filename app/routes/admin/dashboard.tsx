import { account } from "appwrite/appwrite";
import { getExistingUser, getUser } from "appwrite/auth";
import { Header, StatsCard, TripCard } from "components";
import { useLoaderData } from "react-router";
import { fakeUser, dashboardStats, allTrips } from "~/constants/";
import type { Route } from "./+types/dashboard";

export async function clientLoader() {
  try {
    return await getUser();
  } catch (e) {
    console.log("e");
  }
}

// RR7 allows us to extract specific route props
// Get loader data and pass down
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${loaderData?.name ?? "Guest"}`}
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
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
        <div className="trip-grid">
          {allTrips.slice(0, 4).map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id.toString()}
              name={trip.name}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0].location ?? ""}
              tags={trip.tags}
              price={trip.estimatedPrice}
            />
          ))}
        </div>
      </section>
      Page content for dashboard
    </main>
  );
}
