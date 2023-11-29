import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const auth = async () => {
    if (!user) { // signIn
      await supabase.auth.signInWithOAuth({
        provider: "github",
      });
    } else { // signOut
      await supabase.auth.signOut();
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);
        switch (event) {
          case "INITIAL_SESSION":
            if (session?.user) setUser(session?.user);
            break;
          case "SIGNED_IN":
            setUser(session?.user);
            break;
          case "SIGNED_OUT":
            setUser(null);
            break;
          default:
            break;
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function getUsers() {
    const { data, error } = await supabase.from("users").select();
    setUsers(data);
  }

  return (
    <>
      <div>
        <button onClick={auth}>{!user ? "Login with github" : "Logout"}</button>

        <div>
          <button onClick={getUsers}>Get Users</button>
          <p>{JSON.stringify(users)}</p>
        </div>
      </div>

      {/* <ul></ul>
        {users.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul> */}
    </>
  );
}

export default App;
