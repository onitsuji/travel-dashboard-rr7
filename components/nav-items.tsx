import { cn } from "lib/utils";
import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";

type Props = {
  handleSidebarToggle?: () => void;
};

export default function NavItems({ handleSidebarToggle }: Props) {
  const USER = {
    name: "john doe",
    email: "johndoe@doe.com",
    imageUrl: "/assets/images/david.webp",
  };

  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1>Travel</h1>
      </Link>
      <div className="container">
        <nav>
          {sidebarItems.map((item) => (
            <NavLink to={item.href} key={item.id}>
              {({ isActive }) => (
                <div
                  className={cn(
                    "group nav-item",
                    isActive && "bg-primary-100 !text-white"
                  )}
                  onClick={handleSidebarToggle}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`group-hover:brightness-0 size-4 group-hover:invert ${
                      isActive ? "brightness-0 invert" : "text-dark-200"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        <footer className="nav-footer">
          <img src={USER.imageUrl} alt={USER.name} />
          <article>
            <h2>{USER.name}</h2>
            <p>{USER.email}</p>
          </article>
          <button
            onClick={() => {
              console.log("Log out");
            }}
            className="cursor-pointer"
          >
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-6"
            />
          </button>
        </footer>
      </div>
    </section>
  );
}
