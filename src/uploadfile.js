const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '760699389735-av86k5th8qacvveefer9t126u037a7qs.apps.googleusercontent.com';

const CLIENT_SECRET = '_FB7ahopGnukuox4qphjIot-';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04-LUCyS1fh9kCgYIARAAGAQSNwF-L9IrX7-LAjvXnvHeWJOjWYs6Cgws2uQrLn7sTLodiPtnnJBvT7enFArCNvL8I6gKzpiEtUk';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const driver = google.drive({
    version: 'v3',
    auth: oauth2Client
});


const filePath = path.join(__dirname, 'avatar.jpg');
async function uploadFile() {
    try {
        const response = await driver.files.create({
            requestBody: {
                name: 'beautifullgirl.jpg',
                mimeType: 'image/jpg'
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
            }
        });
        console.log(`https://drive.google.com/uc?id=${response.data.id}`);
    } catch (error) {
        console.log(error.message);
    }
}
uploadFile();
async function deleteFile() {
    try {
        const response = await driver.files.delete({
            fileId: '1UjiZ1s2K8MI0TCVPeITYOGkCvi3RsQz9',
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);

    }
}

// deleteFile();

async function generatePublicUrl() {
    try {
        const fileId = '1CLsrEoNfQp2RoTjx2y_sYolnuINJHFx9';
        await driver.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        const result = await driver.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        });

        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}
// generatePublicUrl();