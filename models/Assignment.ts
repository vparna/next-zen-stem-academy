import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Assignment, AssignmentSubmission } from '@/types';

const ASSIGNMENT_COLLECTION = 'assignments';
const SUBMISSION_COLLECTION = 'assignment_submissions';

// Assignment functions
export async function createAssignment(assignmentData: Omit<Assignment, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
  const db = await getDatabase();
  const now = new Date();
  
  const result = await db.collection<Assignment>(ASSIGNMENT_COLLECTION).insertOne({
    ...assignmentData,
    createdAt: now,
    updatedAt: now,
  });
  
  return result.insertedId;
}

export async function getAssignmentById(id: string | ObjectId): Promise<Assignment | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Assignment>(ASSIGNMENT_COLLECTION).findOne({ _id: objectId });
}

export async function getAssignmentsByCourseId(courseId: string | ObjectId): Promise<Assignment[]> {
  const db = await getDatabase();
  const objectId = typeof courseId === 'string' ? new ObjectId(courseId) : courseId;
  return db.collection<Assignment>(ASSIGNMENT_COLLECTION)
    .find({ courseId: objectId, active: true })
    .toArray();
}

export async function updateAssignment(
  id: string | ObjectId,
  updates: Partial<Omit<Assignment, '_id' | 'createdAt'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Assignment>(ASSIGNMENT_COLLECTION).updateOne(
    { _id: objectId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}

// Submission functions
export async function createSubmission(submissionData: Omit<AssignmentSubmission, '_id'>): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<AssignmentSubmission>(SUBMISSION_COLLECTION).insertOne(submissionData);
  
  return result.insertedId;
}

export async function getSubmissionById(id: string | ObjectId): Promise<AssignmentSubmission | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<AssignmentSubmission>(SUBMISSION_COLLECTION).findOne({ _id: objectId });
}

export async function getSubmissionByAssignmentAndUser(
  assignmentId: string | ObjectId,
  userId: string | ObjectId
): Promise<AssignmentSubmission | null> {
  const db = await getDatabase();
  const assignmentObjId = typeof assignmentId === 'string' ? new ObjectId(assignmentId) : assignmentId;
  const userObjId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  
  return db.collection<AssignmentSubmission>(SUBMISSION_COLLECTION).findOne({
    assignmentId: assignmentObjId,
    userId: userObjId
  });
}

export async function updateSubmission(
  id: string | ObjectId,
  updates: Partial<Omit<AssignmentSubmission, '_id'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<AssignmentSubmission>(SUBMISSION_COLLECTION).updateOne(
    { _id: objectId },
    { $set: updates }
  );
  
  return result.modifiedCount > 0;
}
