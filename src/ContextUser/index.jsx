import React, { useState, useEffect, createContext } from "react";
import { app } from "../fb";

const UserContext = createContext();
function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [uid, setUid] = useState(null);
  const [loginFail, setLoginFail] = useState(null);
  useEffect(() => {
    app.auth().onAuthStateChanged((usuarioFirebase) => {
      setUsuario(usuarioFirebase);    
    
    });
    
  }, []);

/*   const crearUsuario = (correo, password) => {
    app
      .auth()
      .createUserWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        setUsuario(usuarioFirebase);
        setUid(usuarioFirebase.user.uid)
        console.log("UID actualizado:", usuarioFirebase.user.uid);

      });
  };
 */
  const crearUsuario = (correo, password) => {
    return new Promise((resolve, reject) => {
      app
        .auth()
        .createUserWithEmailAndPassword(correo, password)
        .then((usuarioFirebase) => {
          setUsuario(usuarioFirebase);
          setUid(usuarioFirebase.user.uid);
          console.log("UID actualizado:", usuarioFirebase.user.uid);
          resolve(usuarioFirebase.user.uid); // resuelve la promesa con el UID
        })
        .catch((error) => {
          setLoginFail(error.message)
        });
    });
  };
  

  
  const iniciarSesion = (correo, password) => {
    app
      .auth()
      .signInWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        setUsuario(usuarioFirebase.user.email);

      })
      .catch((error) => {
        setLoginFail("Usuario o contraseña incorrectos")
      });
  };

  const cerrarSesion = () => {
    app.auth().signOut();
  };

  useEffect(() => {
    console.log(usuario);
  }, [usuario]);

  useEffect(() => {
  }, [uid]);

  return (
    <UserContext.Provider
      value={{ 
        usuario,
        setUsuario,
        crearUsuario,
        uid,
        iniciarSesion,
        cerrarSesion,
        loginFail
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
export default UserContext;
