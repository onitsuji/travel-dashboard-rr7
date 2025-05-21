import { Header } from "components";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import { users } from "../../constants";

export default function AllUsers() {
  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort and access user details"
      />
      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
}
