// session storage > disparaît à la fermeture de la fenêtre
// local storage > persiste à la fermeture de la fenêtre

// export function getStorage(key) {
//     localStorage.getItem("stayConnected") ? // si l'utilisateur voulait rester connecté
//         return localStorage.getItem(key) : // on prend la data dans le local storage
//         return sessionStorage.getItem(key); // sinon, on la prend dans le session storage
// }

export default function setStorage(key, value) {
    localStorage.getItem("stayConnected") ? // si l'utilisateur voulait rester connecté
        localStorage.setItem(key, value) : // on met la data dans le local storage
        sessionStorage.setItem(key, value) // sinon, on la met dans le session storage
}