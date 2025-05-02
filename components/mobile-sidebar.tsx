// @ts-nocheck - added due to syncfusion library and typescript not understanding relationship
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import NavItems from "./nav-items";

export default function MobileSidebar() {
  let sidebar: SidebarComponent;

  const handleSidebarToggle = () => {
    sidebar.toggle();
  };

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Travel</h1>
        </Link>
        <button onClick={handleSidebarToggle} className="cursor-pointer">
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>
      <SidebarComponent
        width={270}
        ref={(Sidebar) => (sidebar = Sidebar)}
        created={() => sidebar.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="Over"
      >
        <NavItems handleSidebarToggle={handleSidebarToggle} />
      </SidebarComponent>
    </div>
  );
}
