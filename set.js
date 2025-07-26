const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0ljT0xkVmRlelFFY21IYXhVNzhvelZWNHE2b25TVTkzRUplSytRc2FFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV3NSQW1RQWM0Y3dDY2NuUE4vZG9nK3h3MC8wcDJEMGI4dVlZY0p2MlNIcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSmNjeWRKSmxRaXZIVHIwSXRJcWhyNHpMNFUwbm1FWWJxVm1BTG1KNUZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJybzNYeDFnZVpnN1poeGNtcTR3Vld0TWhOL200bk9HOTZYYXZkS2hlU0dnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1FTHd2U0E3L2NJdDg3T2RLUDNKS0QxQmFLQnNEU1IzejkydUsrRVkrMnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNUMmJNRWRHUjZYdjAzQnYvK0gwM2JHVFkrSW9qck93MmRQZTB6cC9XQ1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0E0NDl0TjNXOFM3RDdjeUhwbUlUalhQZExQZ2k1TjUxZHRZT2czZkZtdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRjFlZ29Md0EyVjZsTkdxVzZKNVdHU2RhR0NxUkZGM3RjMzJNdDBEMGh4az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxzZjcwNGN6WGV3aXl6dDdNYStOaVdSQTBCUE1ROWxjakJiUFZGQ0FSZkVlTXNRVW5nOFpLaEVacjlFUHd3aTc5TWlTVlh4ZC94em13YldSeWJQQkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg1LCJhZHZTZWNyZXRLZXkiOiJQZTZKaHJuZWgzZ3pkbytvZVJJMVBQczg2eGhUK2IxOWdkUythR2J4NVN3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxNjcyNjE2OTBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiREU0RDFFNTAzQjFCQzFERjVFRjE3RTE5RDU3RTZGQTkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MzU1NjY0Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTE2NzI2MTY5MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGNDk3NjMyQzQ4MTVGRjQzMUNENTkzRjI4OEZCNEExNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUzNTU2NjQ4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MTY3MjYxNjkwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjRFM0I2NEU1NzU1MTg1N0YxREIxMzBGMTMxMzlGN0Y5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTM1NTY2NzR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjNSRDMyOUVCIiwibWUiOnsiaWQiOiIyMzQ5MTY3MjYxNjkwOjlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMjUwMzU2NTg0MDM5MjM6OUBsaWQiLCJuYW1lIjoiQW5vbvCfkb4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tybjQ3TUdFSTNObE1RR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IittTEtweXpqSUxXanVLaVBuRWtoVzdCOGFDeEE5eHk2Y2pLbkNBWHhHekE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjF6M1JveHB4Y2R0YjhsamNxTlgrWWVrRVNLWituVG9WMzMxUWRZZS8zR01rL1ZWUkwvL3g0Zi9CeG5YKzJjVFJ1ZzhDTCtYQTdlaWlHSWRaK1hiVERBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIzWW1xSG1SN2IwTDNNd2tDVDNBNXRGd3puSWExU2c1S2VTeEFjdmVCZWFWUkhnWEFpZkJ5WjZld243OWZ2dERySFY0NWtvYnNaK0F2Q0YxbGI4SnhCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxNjcyNjE2OTA6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmcGl5cWNzNHlDMW83aW9qNXhKSVZ1d2ZHZ3NRUGNjdW5JeXB3Z0Y4UnN3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTM1NTY2MzQsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT2UxIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "LEONARD-MD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349167261690",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LEONARD-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/vmibx0.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
