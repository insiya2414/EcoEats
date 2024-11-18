// 
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import Firestore instance

function ScanReceipt() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleScan = async () => {
        if (!image) {
            alert('Please upload an image first!');
            return;
        }

        setLoading(true);
        Tesseract.recognize(
            image,
            'eng',
            { logger: (info) => console.log(info) }
        )
            .then(({ data: { text } }) => {
                console.log('Extracted Text:', text); // Debug the extracted text
                const extractedData = processExtractedText(text);
                saveToFirestore(extractedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const processExtractedText = (text) => {
        // Debugging: Log raw text
        console.log('Raw OCR Text:', text);
    
        // Extract restaurant name (example logic)
        const restaurantName = text.match(/(?:Restaurant|Store|Name):?\s*(.*)/i)?.[1]?.trim() || 'Unknown';
    
        // Extract address (example logic)
        const address = text.match(/(?:Address|Location):?\s*(.*)/i)?.[1]?.trim() || 'Unknown';
    
        // Extract items with prices (example logic for a specific format)
        const items = [];
        const lines = text.split('\n');
        lines.forEach((line) => {
            const match = line.match(/(\d+)\s+(.+?)\s+\$?(\d+\.\d{2})/); // Matches "1 ItemName 12.34"
            if (match) {
                items.push({
                    itemNumber: match[1],
                    product: match[2],
                    price: match[3],
                });
            }
        });
    
        return { restaurantName, address, items };
    };

    const saveToFirestore = async (data) => {
        try {
            await addDoc(collection(db, 'receipts'), data);
            setMessage('Receipt information saved successfully!');
        } catch (error) {
            console.error('Error saving to Firestore:', error);
            setMessage('Failed to save receipt information.');
        }
    };

    return (
        <div>
            <h1>Scan Receipt</h1>
            <p>Upload an image of your receipt to extract text and save to the database.</p>

            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {image && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={image} alt="Uploaded Receipt" style={{ maxWidth: '400px', marginTop: '10px' }} />
                </div>
            )}

            <button onClick={handleScan} disabled={loading} style={{ marginTop: '10px' }}>
                {loading ? 'Scanning...' : 'Scan and Save'}
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default ScanReceipt;
