// services/firebaseService.js
import { db } from '../../firebase'; // Assume Firebase is set up here
import { collection, addDoc } from 'firebase/firestore';

export const saveOrderToFirestore = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, "orders"), orderData);
        console.log("Order saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};
