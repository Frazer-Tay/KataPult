/* eslint-disable no-console */
const admin = require('firebase-admin');

const MIN_PASSWORD_LENGTH = 12;

const getServiceAccount = () => {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    return JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8'));
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  return null;
};

const assertEnv = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
};

const main = async () => {
  const email = assertEnv('ADMIN_EMAIL').trim().toLowerCase();
  const password = assertEnv('ADMIN_PASSWORD');
  const displayName = process.env.ADMIN_DISPLAY_NAME || 'KataPult Admin';
  const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT;
  const serviceAccount = getServiceAccount();

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`ADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }

  if (!serviceAccount && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('Provide GOOGLE_APPLICATION_CREDENTIALS, FIREBASE_SERVICE_ACCOUNT_JSON, or FIREBASE_SERVICE_ACCOUNT_BASE64.');
  }

  admin.initializeApp({
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
    projectId
  });

  const auth = admin.auth();
  const db = admin.firestore();

  let userRecord;

  try {
    userRecord = await auth.getUserByEmail(email);
    await auth.updateUser(userRecord.uid, {
      password,
      displayName,
      emailVerified: true,
      disabled: false
    });
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      throw error;
    }

    userRecord = await auth.createUser({
      email,
      password,
      displayName,
      emailVerified: true,
      disabled: false
    });
  }

  await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });

  await db.collection('users').doc(userRecord.uid).set({
    uid: userRecord.uid,
    email,
    displayName,
    username: displayName,
    role: 'admin',
    xp: 0,
    streak: 0,
    level: 1,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  await db.collection('learnerActivity').doc(userRecord.uid).set({
    uid: userRecord.uid,
    email,
    displayName,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  console.log(`Admin account ready: ${email}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
