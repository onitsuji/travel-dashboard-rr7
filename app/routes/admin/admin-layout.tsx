import { NavItems, MobileSidebar } from "components";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Outlet, redirect } from "react-router";
import { account } from "appwrite/appwrite";
import { getExistingUser, storeUserData } from "appwrite/auth";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) {
      return redirect("/sign-in");
    }

    const existingUser = await getExistingUser(user.$id);
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.log("Error from  Admin layout client loder", e);
    return redirect("/sign-in");
  }
}

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
}
