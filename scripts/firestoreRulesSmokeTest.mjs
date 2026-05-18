import fs from 'node:fs';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from '@firebase/rules-unit-testing';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore';

const projectId = 'katapult-rules-smoke';

const testEnv = await initializeTestEnvironment({
  projectId,
  firestore: {
    rules: fs.readFileSync('firestore.rules', 'utf8')
  }
});

try {
  await testEnv.clearFirestore();

  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'users/admin-1'), {
      uid: 'admin-1',
      email: 'admin@example.com',
      role: 'admin'
    });
  });

  const learnerDb = testEnv.authenticatedContext('learner-1', {
    email: 'learner@example.com'
  }).firestore();
  const otherLearnerDb = testEnv.authenticatedContext('learner-2', {
    email: 'other@example.com'
  }).firestore();
  const adminDb = testEnv.authenticatedContext('admin-1', {
    email: 'admin@example.com'
  }).firestore();

  await assertSucceeds(addDoc(collection(learnerDb, 'activityEvents'), {
    uid: 'learner-1',
    email: 'learner@example.com',
    displayName: 'Learner One',
    eventType: 'answer_attempt',
    section: 'Vocabulary',
    route: '/vocabulary',
    durationSeconds: 0,
    correct: true,
    itemType: 'definition_mcq',
    createdAt: serverTimestamp()
  }));

  await assertSucceeds(addDoc(collection(learnerDb, 'activityEvents'), {
    uid: 'learner-1',
    email: 'learner@example.com',
    displayName: 'Learner One',
    eventType: 'section_time',
    section: 'Essay Bank',
    route: '/flashcards',
    durationSeconds: 30,
    createdAt: serverTimestamp()
  }));

  await assertFails(addDoc(collection(learnerDb, 'activityEvents'), {
    uid: 'learner-1',
    email: 'learner@example.com',
    eventType: 'section_time',
    section: 'Vocabulary',
    route: '/vocabulary',
    durationSeconds: -999,
    createdAt: serverTimestamp()
  }));

  await assertFails(setDoc(doc(learnerDb, 'learnerActivity/learner-1'), {
    uid: 'learner-1',
    email: 'learner@example.com',
    totalSessionSeconds: 999999999,
    totalAttempts: 999999,
    displayName: 'tampered'
  }, { merge: true }));

  await assertSucceeds(addDoc(collection(learnerDb, 'feedback'), {
    uid: 'learner-1',
    email: 'learner@example.com',
    displayName: 'Learner One',
    category: 'Wrong answer or explanation',
    message: 'This question seems to have the wrong answer.',
    route: '#/vocabulary',
    status: 'open',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }));

  await assertFails(addDoc(collection(learnerDb, 'feedback'), {
    uid: 'learner-1',
    email: 'learner@example.com',
    category: 'Bug',
    message: 'short',
    route: '#/vocabulary',
    status: 'reviewed',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }));

  await assertFails(getDocs(collection(otherLearnerDb, 'feedback')));
  await assertSucceeds(getDocs(collection(adminDb, 'feedback')));

  const feedbackSnapshot = await getDocs(collection(adminDb, 'feedback'));
  const feedbackDoc = feedbackSnapshot.docs[0];
  await assertSucceeds(updateDoc(doc(adminDb, 'feedback', feedbackDoc.id), {
    status: 'reviewed',
    updatedAt: serverTimestamp()
  }));

  console.log('Firestore rules smoke test passed');
} finally {
  await testEnv.cleanup();
}
