// --- REQUIRED NODE MODULES ---
// The Firebase Admin SDK is used for secure, server-side database writes.
const admin = require('firebase-admin');

// --- FIREBASE ADMIN SDK INITIALIZATION ---
// NOTE: For this to work on Netlify, you MUST provide your Firebase Service Account 
// credentials via Netlify Environment Variables (e.g., FIREBASE_SERVICE_ACCOUNT_KEY).
// This uses the default Netlify environment variables configuration.
if (admin.apps.length === 0) {
    try {
        admin.initializeApp();
    } catch (error) {
        console.error("Firebase Admin initialization failed:", error);
    }
}

// Global variable for the application ID (must match the Nunjucks file)
// NOTE: You should set a Netlify environment variable called APP_ID with the value of __app_id.
const APP_ID = process.env.APP_ID || 'default-app-id';

/**
 * Netlify serverless function to handle form submissions.
 * It saves the lead to Firestore and prepares for ConvertKit integration.
 */
exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    let data;
    try {
        data = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid JSON body" }),
        };
    }

    // Basic data validation
    if (!data.email || !data.name || !data.score) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing required fields (email, name, score)." }),
        };
    }

    const firestore = admin.firestore();
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    // Structure the data for Firestore
    const leadRecord = {
        name: data.name,
        email: data.email,
        score: parseInt(data.score, 10),
        result_title: data.result_title,
        simulator: data.simulator_name,
        created_at: timestamp,
        // We can add a flag here to track if it was sent to ConvertKit
        ck_status: 'PENDING' 
    };

    // --- 1. SECURELY SAVE TO FIRESTORE ---
    try {
        // This path must match the secured path in your Firestore Rules: /artifacts/{appId}/public/data/leads/{leadId}
        const leadsCollectionPath = `artifacts/${APP_ID}/public/data/leads`;
        
        // The Admin SDK performs the write, respecting the rules you set up.
        await firestore.collection(leadsCollectionPath).add(leadRecord);
        
        console.log(`Successfully saved lead: ${data.email} to Firestore.`);

    } catch (error) {
        console.error("Firestore Write Failed:", error);
        // Important: Even if Firestore fails, we can try to proceed with ConvertKit if needed.
        // For simplicity, we'll return an error if the primary save fails.
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Database write failed. Please check server logs." }),
        };
    }

    // --- 2. CONVERTKIT INTEGRATION PLACEHOLDER ---
    
    /* REMINDER: CONVERTKIT INTEGRATION
    
    The next step is to integrate with ConvertKit (your ESP). 
    This part requires two Netlify Environment Variables:
    1. CONVERTKIT_API_KEY (Your secret ConvertKit API key)
    2. CONVERTKIT_FORM_ID (The ID of the form you created)
    
    You would uncomment and complete the following section:
    
    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
    
    if (CONVERTKIT_API_KEY && CONVERTKIT_FORM_ID) {
        const ckData = {
            api_key: CONVERTKIT_API_KEY,
            email: data.email,
            first_name: data.name,
            // Custom fields in ConvertKit need to match your custom field names
            fields: {
                leaderlab_score: data.score,
                leaderlab_result: data.result_title
            }
        };

        const ckUrl = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`;
        
        try {
            await fetch(ckUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify(ckData)
            });
            // Update Firestore record if ConvertKit submission was successful (optional)
            // leadRecord.ck_status = 'SENT';
        } catch (ckError) {
            console.error("ConvertKit Submission Failed:", ckError);
            // Non-fatal error here, as the lead is already saved to Firestore
        }
    }
    */
    
    // --- 3. SUCCESS RESPONSE ---
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Lead successfully recorded and sent to ESP." }),
    };
};
