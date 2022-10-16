import Message from "../components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
const Details = () => {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // Submit a message
  const submitMessage = async () => {
    //check if the user is logged
    if (!auth.currentUser) return router.push("/auth/login");

    if (!message) {
      toast.error("Do not leave an empty message", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id);

    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
        id: auth.currentUser.uid,
      }),
    });
    setMessage("");
  };
  //get comments

  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) =>
      setAllMessages(snapshot.data().comments)
    );
    return unsubscribe;
  };
  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  return (
    <div>
      <Message {...routeData}> </Message>
      <div className="my-4">
        <div className="flex">
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Send a message"
            className="bg-gray-800 w-full text-white p-2 text-sm"
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white py-2 px-4 text-sm"
          >
            Submit
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {allMessages?.map((message) => (
            <div className="bg-white p-4 my-4 border-2" key={message.uid}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt=""
                  referrerPolicy="no-referrer"
                />
                <h2>{message.username}</h2>
              </div>
              <h2>{message.message}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
