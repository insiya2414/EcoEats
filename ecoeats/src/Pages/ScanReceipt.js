import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import Firestore instance
import './ScanReceipt.css';

const preprocessImage = async (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;

    return new Promise((resolve) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            // Convert to grayscale and increase contrast
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg > 128 ? 255 : 0; // Binary thresholding
                data[i + 1] = avg > 128 ? 255 : 0;
                data[i + 2] = avg > 128 ? 255 : 0;
            }

            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL());
        };
    });
};

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

        // Preprocess image
        const processedImage = await preprocessImage(image);

        const response = await fetch(processedImage);
        const imageBlob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1]; // Remove "data:image/*;base64,"

            try {
                const res = await axios.post(
                    `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
                    {
                        requests: [
                            {
                                image: { content: base64Image },
                                features: [{ type: 'DOCUMENT_TEXT_DETECTION' }], // Use document detection
                            },
                        ],
                    }
                );

                const text = res.data.responses[0]?.fullTextAnnotation?.text || '';
                console.log('Extracted Text:', text);
                const extractedData = processExtractedText(text);
                saveToFirestore(extractedData);
            } catch (error) {
                console.error('Google Vision API Error:', error);
            } finally {
                setLoading(false);
            }
        };

        reader.readAsDataURL(imageBlob);
    };

    const processExtractedText = (text) => {
        console.log('Raw OCR Text:', text); // Debugging
    
        const lines = text.split('\n').map((line) => line.trim());
        let restaurantName = 'Unknown';
        let date = 'Unknown';
        let address = 'Unknown';
        const items = [];
        let subtotal = 0;
        let tax = 0;
        let total = 0;
    
        let currentItem = null;
    
        lines.forEach((line, index) => {
            // Detect restaurant/store name
            if (!restaurantName || restaurantName === 'Unknown') {
                const nameMatch = line.match(/(Joe's Diner|.*Diner|.*Restaurant|.*Cafe)/i);
                if (nameMatch) {
                    restaurantName = nameMatch[0].trim();
                }
            }
    
            // Detect date
            if (line.match(/Date:/i)) {
                const dateMatch = line.match(/Date:\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/i);
                if (dateMatch) {
                    date = dateMatch[1].trim();
                }
            }
    
            // Detect address
            if (!address || address === 'Unknown') {
                if (line.match(/Ocean City, NJ/i)) {
                    address = 'Ocean City, NJ';
                }
            }
    
            // Detect items with price on the next line
            const itemMatch = line.match(/^(\d+)\s*x\s+(.+)/i); // Matches "1 x ItemName"
            if (itemMatch) {
                currentItem = {
                    quantity: itemMatch[1],
                    product: itemMatch[2].trim(),
                    price: 0, // Price to be added from the next line
                };
            } else if (currentItem && line.match(/^\$?(\d+\.\d{2})$/)) {
                // Add price from the next line
                currentItem.price = parseFloat(line.replace('$', ''));
                items.push(currentItem);
                currentItem = null; // Reset
            }
    
            // Detect single-line items like "1 x Pie $7.00"
            const singleLineItemMatch = line.match(/^(\d+)\s*x\s+(.+?)\s+\$?(\d+\.\d{2})/i);
            if (singleLineItemMatch) {
                items.push({
                    quantity: singleLineItemMatch[1],
                    product: singleLineItemMatch[2].trim(),
                    price: parseFloat(singleLineItemMatch[3]),
                });
            }
    
            // Detect tax
            if (line.match(/^Tax$/i) && lines[index + 1].match(/^\$?(\d+\.\d{2})$/)) {
                tax = parseFloat(lines[index + 1].replace('$', ''));
            }
    
            // Detect total
            if (line.match(/^\$\d+\.\d{2}$/)) {
                total = parseFloat(line.replace('$', ''));
            }
        });
    
        return {
            restaurantName,
            date,
            address,
            items,
            tax,
            total,
        };
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
        <>
    
            <div className="sr-main-container">
                <img src="/receipt.jpg" alt="Receipt Scanning" />
                <h1>Scan Receipt</h1>
                <p>Upload an image of your receipt.</p>
    
                <input type="file" accept="image/*" onChange={handleImageUpload} />
    
                {image && (
                    <div className="uploaded-image">
                        <h3>Uploaded Image:</h3>
                        <img src={image} alt="Uploaded Receipt" />
                    </div>
                )}
    
                <button onClick={handleScan} disabled={loading} className="scan-button">
                    {loading ? 'Scanning...' : 'Scan and Save'}
                </button>
    
                {message && <p className="message">{message}</p>}
            </div>
            
            <div className="back-button-container">
                <button onClick={() => window.history.back()} className="back-button">
                    &larr; 
                </button>
            </div>
        </>
    );
}
    
export default ScanReceipt;
