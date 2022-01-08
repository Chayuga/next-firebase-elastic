import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { modalState } from "../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { Fragment, useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const captionRef = useRef(null);
  const priceRef = useRef(null);
  const productName = useRef(null);
  const colorRef = useRef(null);
  const filePickerRef = useRef(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      productName: productName.current.value,
      price: priceRef.current.value,
      color: colorRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    console.log("New doc added with ID", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img
                    onClick={() => setSelectedFile(null)}
                    className="w-full object-contain cursor-pointer"
                    src={selectedFile}
                    alt=""
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 ">
                      Product photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span onClick={() => filePickerRef.current.click()}>
                              Upload a file
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              className="sr-only"
                              ref={filePickerRef}
                              type="file"
                              hidden
                              onChange={addImageToPost}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-3 sm:mt-5">
                  <div>
                    <label
                      htmlFor="product"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        ref={productName}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="product..."
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-grow mt-5">
                      <label
                        htmlFor="product"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price in USD
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="number"
                          ref={priceRef}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Price..."
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className=" flex-grow mt-5 ml-5">
                      <label
                        htmlFor="product"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Color
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          ref={colorRef}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Product color..."
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        ref={captionRef}
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Please give your product a description..."
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 text-center ">
                      Brief description for your product.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  disabled={!selectedFile}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                  onClick={uploadPost}
                >
                  {loading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
