const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// === Google Sheets Config ===
const credentialsPath = path.join(__dirname, 'credentials.json'); // Make sure this file exists
const spreadsheetId = '1Te61XXUBMHS5jAR7cfmhQsAKieWutKyaFgqzN8mxY00'; // Your Sheet ID
const sheetName = 'sheet1'; // Change if your sheet tab is named differently
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Google Auth Setup
async function authenticate() {
  const credentials = JSON.parse(fs.readFileSync(credentialsPath));
  const { client_email, private_key } = credentials;

  const auth = new google.auth.JWT(client_email, null, private_key, SCOPES);
  await auth.authorize();
  return auth;
}

// Form Submission Route
app.post('/register', async (req, res) => {
  const { name, email, phone, address, style } = req.body;
  console.log("Form received:", name, email, phone, address, style);

  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:E`,
      valueInputOption: 'RAW',
      resource: {
        values: [[name, email, phone, address, style]],
      },
    });

    res.send(`
      <h2 style="text-align:center;font-family:sans-serif;">Thank you for registering!</h2>
      <p style="text-align:center;">Redirecting you back...</p>
      <script>
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      </script>
    `);
  } catch (err) {
    console.error('Error saving to sheet:', err);
    res.status(500).send('Error saving registration data.');
  }
});

// Serve the Form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
