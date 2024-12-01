import { Link } from "react-router";
import Gradient from "../components/Gradient";

export function SignupLinkSent() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center text-center">
      <h1 className="text-4xl font-semibold align-center text-center">Invite Sent!</h1>
      <p className="mt-10">
        Check your email with instructions to finish creating your account.
      </p>
      <Link to="/" className="mt-4">
            <Gradient className="flex items-center justify-center  mt-4 p-0.5 w-72 h-10 rounded-full text-primary-red font-thin">
                <div className="flex items-center justify-center rounded-full bg-white w-full h-full">
                    Go Back Home
                </div>
            </Gradient>
      </Link>
    </div>
  );
}