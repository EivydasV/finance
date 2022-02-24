import React, { useContext, useState, useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(false)

  function signup(email, password) {
    // return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    // return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    // return auth.signOut()
  }

  function resetPassword(email) {
    // return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    // return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    // return currentUser.updatePassword(password)
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Typography
            variant="h2"
            fontWeight="fontWeightMedium"
            letterSpacing={2}
          >
            DEMO
          </Typography>
          <CircularProgress size={100} />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
