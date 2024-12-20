// PantryItems.js
import './PantryItems.css';
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Ensure your Firebase configuration is set up and exported
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Firestore methods


const getPantryItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'receipts'));
    const pantryData = querySnapshot.docs.map(doc => doc.data().items).flat();
    return pantryData.map(item => item.product);
};

function PantryItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState('');
    const [newQuantity, setNewQuantity] = useState('');

    useEffect(() => {
        const fetchPantryItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'receipts'));
                const pantryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(pantryData);
            } catch (error) {
                console.error('Error fetching pantry items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPantryItems();
    }, []);

    const addPantryItem = async (e) => {
        e.preventDefault();
        if (!newProduct || !newQuantity) {
            alert('Please enter both a product name and quantity.');
            return;
        }

        const newItem = {
            product: newProduct,
            quantity: newQuantity,
        };

        try {
            const receiptDoc = await addDoc(collection(db, 'receipts'), {
                date: new Date().toLocaleDateString(),
                items: [newItem],
                address: "Unknown",
                tax: 0,
                total: 0,
            });

            setItems((prevItems) => [
                ...prevItems,
                { id: receiptDoc.id, date: new Date().toLocaleDateString(), items: [newItem] },
            ]);

            setNewProduct('');
            setNewQuantity('');
        } catch (error) {
            console.error('Error adding pantry item:', error);
        }
    };

    return (
        <div className="pantry-container">
            <h1>Pantry Items</h1>
            <img src="/inventory.jpg" alt="Receipt Scanning" />
            <form className="pantry-form" onSubmit={addPantryItem}>
                <h2>Add a New Item</h2>
                <label>
                    Product Name:
                    <input
                        type="text"
                        value={newProduct}
                        onChange={(e) => setNewProduct(e.target.value)}
                        placeholder="Enter product name"
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        placeholder="Enter quantity"
                    />
                </label>
                <button type="submit">Add Item</button>
            </form>
            {loading ? (
                <p>Loading pantry items...</p>
            ) : (
                <ul className="pantry-list">
                    {items.map(item => (
                        <li key={item.id}>
                            <h2>{item.date}</h2>
                            {item.items.map((subItem, index) => (
                                <div key={index}>
                                    <p><strong>Product:</strong> {subItem.product}</p>
                                    <p><strong>Quantity:</strong> {subItem.quantity}</p>
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
            <div className="back-button-container">
                <button onClick={() => window.history.back()} className="back-button">
                    &larr; 
                </button>
            </div>
        </div>
        
    );
}

export default PantryItems;
export {getPantryItems};