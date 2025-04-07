import React from "react";
import firebase from "../../config/firebase";
import "firebase/auth";

function Logout() {
  function handleLogout() {
    firebase.auth().signOut().then(() => {
      // Logout bem-sucedido
      // Redirecionar para a página de login ou qualquer outra página desejada
    }).catch((error) => {
      // Ocorreu um erro durante o logout
      console.log(error);
    });
  }

  return (
    <button onClick={handleLogout} >Logout</button>
  );
}

export default Logout;
