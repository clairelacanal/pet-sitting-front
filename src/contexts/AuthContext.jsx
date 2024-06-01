import { createContext, useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [authName, setAuthName] = useState(localStorage.getItem("authName"));
  const [isLoading, setIsLoading] = useState(false);

  // Fonction centralisée pour la mise à jour du token
  function updateToken(token) {
    localStorage.setItem("authToken", token || "");
    setAuthToken(token);
  }

  // Fonction centralisée pour la mise à jour du nom d'utilisateur
  function updateName(userName) {
    localStorage.setItem("authName", userName || "");
    setAuthName(userName);
  }

  // Chargement de l'utilisateur basé sur le authToken
  useEffect(() => {
    async function getUser() {
      if (!authToken) {
        setUser(null);
        return;
      }

      setIsLoading(true);
      try {
        const response = await apiHandler.getUser(authToken); // Assurez-vous que votre API peut prendre un token
        setUser(response.data);
      } catch (error) {
        console.error("Erreur pour recuperer le user:", error);
        updateToken(null); // Réinitialisation du token en cas d'échec
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, [authToken]);

  const contextValue = {
    user,
    authToken,
    authName,
    updateToken,
    updateName,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
