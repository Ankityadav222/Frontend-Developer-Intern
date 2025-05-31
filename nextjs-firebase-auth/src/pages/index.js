// pages/index.js
import React, { useEffect, useState } from "react";
import { 
  Button, 
  Avatar, 
  Typography, 
  Box, 
  CircularProgress, 
  Card, 
  CardContent, 
  Chip,
  Container,
  Paper,
  Fade,
  Slide
} from "@mui/material";
import { 
  Google as GoogleIcon, 
  Logout as LogoutIcon, 
  Security as SecurityIcon,
  Verified as VerifiedIcon 
} from "@mui/icons-material";
import { auth, provider, db } from "../lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  // Listen to user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user);

          // Save or update user in Firestore
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }, { merge: true });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error updating user data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Google Sign-in handler
  const handleSignIn = async () => {
    try {
      setSigningIn(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Sign-in failed. Please try again.");
    } finally {
      setSigningIn(false);
    }
  };

  // Sign out
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: 'white', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="sm" sx={{ pt: 8, pb: 4, position: 'relative', zIndex: 1 }}>
        {user ? (
          <Fade in={true} timeout={800}>
            <Card
              sx={{
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 4,
                boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                overflow: 'visible',
                position: 'relative'
              }}
            >
              <CardContent sx={{ p: 6 }}>
                <Box sx={{ mb: 4, position: 'relative' }}>
                  <Avatar
                    src={user.photoURL}
                    alt={user.displayName}
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: "auto", 
                      mb: 3,
                      border: '4px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      position: 'relative'
                    }}
                  />
                  <VerifiedIcon 
                    sx={{ 
                      position: 'absolute',
                      top: 85,
                      right: '50%',
                      transform: 'translateX(40px)',
                      color: '#4CAF50',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      fontSize: 28,
                      p: 0.5
                    }} 
                  />
                </Box>

                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 1, 
                    color: 'white', 
                    fontWeight: 600,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  Welcome back!
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1, 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500
                  }}
                >
                  {user.displayName}
                </Typography>
                
                <Chip
                  label={user.email}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 500,
                    mb: 4,
                    '& .MuiChip-label': {
                      px: 2
                    }
                  }}
                />

                <Paper
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                    p: 3,
                    mb: 4
                  }}
                >
                  <SecurityIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.6
                    }}
                  >
                    Your account is secured with Google authentication and your data is safely stored in Firebase.
                  </Typography>
                </Paper>

                <Button
                  onClick={handleLogout}
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(255, 107, 107, 0.4)',
                      background: 'linear-gradient(45deg, #ff5252, #e53935)'
                    }
                  }}
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </Fade>
        ) : (
          <Slide direction="up" in={true} timeout={600}>
            <Card
              sx={{
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 4,
                boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}
            >
              <CardContent sx={{ p: 6 }}>
                <Box sx={{ mb: 4 }}>
                  <SecurityIcon 
                    sx={{ 
                      fontSize: 80, 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      mb: 2,
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }} 
                  />
                </Box>

                <Typography 
                  variant="h3" 
                  sx={{ 
                    mb: 2, 
                    color: 'white', 
                    fontWeight: 700,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Firebase Auth
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 400,
                    lineHeight: 1.6
                  }}
                >
                  Secure authentication powered by Google Firebase
                </Typography>

                <Button
                  onClick={handleSignIn}
                  disabled={signingIn}
                  variant="contained"
                  startIcon={signingIn ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #4285f4, #34a853)',
                    color: 'white',
                    px: 6,
                    py: 2,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 25px rgba(66, 133, 244, 0.3)',
                    transition: 'all 0.3s ease',
                    minWidth: 200,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(66, 133, 244, 0.4)',
                      background: 'linear-gradient(45deg, #3367d6, #2e7d32)'
                    },
                    '&:disabled': {
                      background: 'rgba(255, 255, 255, 0.3)',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                >
                  {signingIn ? 'Signing in...' : 'Continue with Google'}
                </Button>

                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    mt: 3, 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontStyle: 'italic'
                  }}
                >
                  Your data is encrypted and secure
                </Typography>
              </CardContent>
            </Card>
          </Slide>
        )}
      </Container>
    </Box>
  );
}