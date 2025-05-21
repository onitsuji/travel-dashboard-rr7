import { Header } from "components";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
// import { users } from "../../constants";
import { cn } from "lib/utils";
import { getAllUsers } from "appwrite/auth";
import type { Route } from "./+types/all-users";

export async function loader() {
  const users = await getAllUsers();

  return users;
}

export default function AllUsers({ loaderData }: Route.ComponentProps) {
  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort and access user details"
      />
      <GridComponent dataSource={loaderData} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 px-4">
                <img
                  src={props.imageUrl}
                  alt={`user-${props.name}`}
                  className="rounded-full size-8 aspect-square"
                />
                <span>{props.name}</span>
              </div>
            )}
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="createdAt"
            headerText="Created"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="itineraryCreated"
            headerText="Created Trips"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="status"
            headerText="Role"
            width="150"
            textAlign="Left"
            template={(props: UserData) => (
              <article
                className={cn(
                  "status-column",
                  props.status === "user" ? "bg-success-50" : "bg-light-300"
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    props.status === "user" ? "bg-success-500" : "bg-gray-500"
                  )}
                />
                <h3
                  className={cn(
                    "font-inter text-xs font-medium",
                    props.status === "user"
                      ? "text-success-700"
                      : "text-gray-500"
                  )}
                >
                  {props.status}
                </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
}
