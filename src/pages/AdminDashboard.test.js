import { render, screen, waitFor } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { getDocs } from 'firebase/firestore';

jest.mock('../firebase', () => ({
  db: {}
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn((db, name) => ({ name })),
  doc: jest.fn(),
  getDocs: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn((collectionRef) => collectionRef),
  serverTimestamp: jest.fn(() => 'server-time'),
  updateDoc: jest.fn()
}));

const makeSnapshot = (docs) => ({
  docs,
  forEach: (callback) => docs.forEach((doc) => callback(doc))
});

describe('AdminDashboard', () => {
  beforeEach(() => {
    getDocs.mockReset();
  });

  it('summarizes learners and section activity', async () => {
    getDocs
      .mockResolvedValueOnce(makeSnapshot([
        {
          id: 'learner-1',
          data: () => ({
            username: 'Alya',
            email: 'alya@example.com',
            role: 'learner',
            level: 3,
            xp: 240,
            streak: 5
          })
        }
      ]))
      .mockResolvedValueOnce(makeSnapshot([
        {
          id: 'learner-1',
          data: () => ({
            totalSectionSeconds: 3720,
            totalSessionSeconds: 3900,
            sectionTotals: {
              vocabulary: { name: 'Vocabulary', seconds: 2400, visits: 6 },
              imbuhan: { name: 'Imbuhan', seconds: 1320, visits: 3 }
            }
          })
        }
      ]))
      .mockResolvedValueOnce(makeSnapshot([]));

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Learner engagement')).toBeInTheDocument();
      expect(screen.getByText('Alya')).toBeInTheDocument();
    });

    expect(screen.getAllByText('1h 2m').length).toBeGreaterThan(0);
    expect(screen.getByText('Vocabulary')).toBeInTheDocument();
    expect(screen.getByText('Imbuhan: 22m')).toBeInTheDocument();
    expect(screen.getByText('Level 3')).toBeInTheDocument();
  });
});
