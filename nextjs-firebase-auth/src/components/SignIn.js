// components/SignIn.js
import { useState } from "react";
import { Button, Typography, Container } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

const SignIn = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Sign In with Google
      </Typography>

      {!user ? (
        <Button variant="contained" onClick={handleGoogleLogin}>
          Sign in with Google
        </Button>
      ) : (
        <div>
          <Typography variant="h6">Hello, {user.displayName}</Typography>
          <img
            src={user.photoURL}
            alt="profile"
            width={100}
            style={{ borderRadius: "50%" }}
          />
        </div>
      )}
    </Container>
  );
};

export default SignIn;
