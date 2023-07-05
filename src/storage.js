import {getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app';
import {v4} from 'uuid'

const firebaseConfig = {
    apiKey: "AIzaSyC4t3LmWj-BR6BNtQmtmDKJR0EwdYmFVVQ",
    authDomain: "coderhouse-react-63c43.firebaseapp.com",
    projectId: "coderhouse-react-63c43",
    storageBucket: "coderhouse-react-63c43.appspot.com",
    messagingSenderId: "447582767917",
    appId: "1:447582767917:web:10e4a0eae9234fde6be1a4"
}

const app= initializeApp(firebaseConfig)
export const storage = getStorage(app)

export async function uploadFile(file) {
    const storageRef = ref(storage, v4())
    await uploadBytesResumable(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url

}
