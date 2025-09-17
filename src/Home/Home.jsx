import { useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const submitData = async () => {
    if (!text) return;
    await addDoc(collection(db, "messages"), {
      text,
      createdAt: new Date(),
      uid: auth.currentUser.uid,
    });
    setText("");
    alert("Data saved!");
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      <input
        type="text"
        value={text}
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={submitData}>Submit</button>
      <br />
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
