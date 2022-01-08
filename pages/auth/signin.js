import { FirebaseError } from "@firebase/util";
import { getProviders, signIn } from "next-auth/react";

//Browser....
const SignIn = ({ providers }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2  px-14 text-center">
        <img
          className="w-80"
          src="https://www.chayugadesigns.com/images/shopping_cart.jpg"
          alt=""
        />
        <h1 className="text-3xl py-10">Welcome!</h1>
        <h2 className="font-xs font-bold">
          Sign In to your all-in-one shop, and shop with us
        </h2>

        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-red-400 rounded-lg text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

//Server...
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default SignIn;
