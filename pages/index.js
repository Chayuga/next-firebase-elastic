import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Snapshot } from "recoil";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { db } from "../firebase";

// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   // More products...
// ];

export default function Home() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <>
      <Header />
      {session ? (
        <>
          <Modal />
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
              <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Buy Products
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {posts.map((posts) => (
                      <div key={posts.data().id} className="group relative">
                        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                          <img
                            src={posts.data().image}
                            // alt={posts.data.alt}
                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <a>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {posts.data().productName}
                              </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {posts.data().color}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${posts.data().price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        <button onClick={() => router.push("/auth/signin")} />
      )}
    </>
  );
}
