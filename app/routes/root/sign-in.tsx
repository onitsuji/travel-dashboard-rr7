import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "appwrite/appwrite";
import { loginWithGoogle } from "appwrite/auth";
import { Link, redirect } from "react-router";

// Loader to check for sign in details
export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) {
      return redirect("/sign-in");
    } else {
      console.log("we have found a user, redirecting to dashboard");
      return redirect("/dashboard");
    }
  } catch (e) {
    console.log("Error from  Sign in client loder", e);
  }
}

export default function SignIn() {
  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="size-[30px]"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Travel</h1>
          </header>
          <article>
            <h2 className="p-28-semi-bold text-dark-100 text-center">
              Start your travel journey
            </h2>
            <p className="p-18-regualar text-center text-gray-100 !leading-7">
              Sign in with Google and manage destinations, iteneraries and user
              activity with ease.
            </p>
          </article>
          <ButtonComponent
            iconCss="e-search-icon"
            className="button-class !h-11 !w-full"
            type="button"
            onClick={loginWithGoogle}
          >
            <img
              src="/assets/icons/google.svg"
              className="size-5"
              alt="google icon"
            />
            <span className="p-18-semi-bold text-white">
              Sign in with Google
            </span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
}
