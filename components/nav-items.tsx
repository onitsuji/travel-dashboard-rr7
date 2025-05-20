import { logoutUser } from "appwrite/auth";
import { cn } from "lib/utils";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router";
import { sidebarItems } from "~/constants";

type Props = {
  handleSidebarToggle?: () => void;
};

export default function NavItems({ handleSidebarToggle }: Props) {
  // Grab loader data from nearest loader which is dashboard
  // Dashboard loader gets users
  const user: BaseUser = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
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
          <img
            src={user?.imageUrl || `/assets/images/david.webp`}
            alt={user.name}
            referrerPolicy="no-referrer"
          />
          <article>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </article>
          <button onClick={handleLogout} className="cursor-pointer">
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
