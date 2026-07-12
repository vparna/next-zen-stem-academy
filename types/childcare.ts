import { ObjectId } from 'mongodb';

// ============================================================
// 1. DIGITAL ATTENDANCE & SECURITY
// ============================================================

export interface AttendanceRecord {
  _id?: ObjectId;
  childId: ObjectId;
  parentId: ObjectId;
  classroomId: ObjectId;
  checkInTime: Date;
  checkOutTime?: Date;
  checkInMethod: 'qr_code' | 'pin' | 'geofence' | 'kiosk' | 'manual' | 'facial_recognition';
  checkOutMethod?: 'qr_code' | 'pin' | 'geofence' | 'kiosk' | 'manual' | 'facial_recognition';
  checkInBy: ObjectId; // person who performed check-in
  checkOutBy?: ObjectId;
  checkInPhotoUrl?: string;
  checkOutPhotoUrl?: string;
  checkInLocation?: GeoLocation;
  checkOutLocation?: GeoLocation;
  status: 'checked_in' | 'checked_out' | 'absent' | 'late' | 'excused';
  latePickupAlert?: boolean;
  latePickupAlertTime?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: Date;
}

export interface GeofenceZone {
  _id?: ObjectId;
  centerId: ObjectId;
  name: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  active: boolean;
  createdAt: Date;
}

export interface StaffTimecard {
  _id?: ObjectId;
  staffId: ObjectId;
  centerId: ObjectId;
  clockInTime: Date;
  clockOutTime?: Date;
  clockInMethod: 'pin' | 'qr_code' | 'manual' | 'kiosk';
  clockOutMethod?: 'pin' | 'qr_code' | 'manual' | 'kiosk';
  breakStartTime?: Date;
  breakEndTime?: Date;
  totalHours?: number;
  overtimeHours?: number;
  status: 'clocked_in' | 'on_break' | 'clocked_out';
  notes?: string;
  approvedBy?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassroomRatio {
  _id?: ObjectId;
  classroomId: ObjectId;
  date: Date;
  timestamp: Date;
  childCount: number;
  staffCount: number;
  ratio: number; // children per staff
  maxRatio: number; // regulatory max
  compliant: boolean;
  ageGroup: string;
}

export interface EmergencyLockdown {
  _id?: ObjectId;
  centerId: ObjectId;
  initiatedBy: ObjectId;
  startTime: Date;
  endTime?: Date;
  reason: string;
  status: 'active' | 'resolved';
  childrenAccountedFor: number;
  totalChildren: number;
  notes?: string;
}

export interface AuthorizedPickup {
  _id?: ObjectId;
  childId: ObjectId;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  photoUrl?: string;
  idVerified: boolean;
  idType?: string;
  idNumber?: string;
  active: boolean;
  addedBy: ObjectId;
  createdAt: Date;
}

// ============================================================
// 2. BILLING, PAYMENTS & ACCOUNTING
// ============================================================

export interface Invoice {
  _id?: ObjectId;
  invoiceNumber: string;
  parentId: ObjectId;
  childId: ObjectId;
  centerId: ObjectId;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discounts: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'refunded' | 'partial';
  dueDate: Date;
  paidDate?: Date;
  paymentMethod?: 'ach' | 'credit_card' | 'debit_card' | 'check' | 'cash' | 'subsidy';
  paymentReference?: string;
  recurringSchedule?: 'weekly' | 'biweekly' | 'monthly';
  lateFee?: number;
  lateFeeApplied?: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  description: string;
  type: 'tuition' | 'registration' | 'supplies' | 'late_fee' | 'extra_hours' | 'meals' | 'activities' | 'other';
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface RecurringBilling {
  _id?: ObjectId;
  parentId: ObjectId;
  childId: ObjectId;
  centerId: ObjectId;
  schedule: 'weekly' | 'biweekly' | 'monthly';
  amount: number;
  description: string;
  startDate: Date;
  endDate?: Date;
  nextBillingDate: Date;
  active: boolean;
  paymentMethodId?: string;
  autoCharge: boolean;
  createdAt: Date;
}

export interface SubsidyTracking {
  _id?: ObjectId;
  childId: ObjectId;
  parentId: ObjectId;
  programName: string; // WCCC, ECEAP, CCA, etc.
  caseNumber: string;
  authorizedHoursPerWeek: number;
  copayAmount: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'pending' | 'expired' | 'denied';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SplitBilling {
  _id?: ObjectId;
  childId: ObjectId;
  primaryParentId: ObjectId;
  secondaryParentId: ObjectId;
  primaryPercentage: number;
  secondaryPercentage: number;
  active: boolean;
  createdAt: Date;
}

export interface TaxStatement {
  _id?: ObjectId;
  parentId: ObjectId;
  year: number;
  totalPaid: number;
  centerTaxId: string;
  centerName: string;
  centerAddress: string;
  generatedAt: Date;
  downloadUrl?: string;
}

// ============================================================
// 3. PARENT COMMUNICATION
// ============================================================

export interface DailyActivityReport {
  _id?: ObjectId;
  childId: ObjectId;
  classroomId: ObjectId;
  date: Date;
  teacherId: ObjectId;
  meals: MealLog[];
  naps: NapLog[];
  bathroomLogs: BathroomLog[];
  activities: ActivityEntry[];
  mood: 'happy' | 'calm' | 'fussy' | 'tired' | 'energetic';
  photos: MediaItem[];
  videos: MediaItem[];
  teacherNotes?: string;
  aiGeneratedSummary?: string;
  sentToParent: boolean;
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MealLog {
  mealType: 'breakfast' | 'am_snack' | 'lunch' | 'pm_snack' | 'dinner';
  time: Date;
  items: string[];
  amount: 'none' | 'some' | 'most' | 'all';
  notes?: string;
}

export interface NapLog {
  startTime: Date;
  endTime?: Date;
  duration?: number; // minutes
  quality: 'restful' | 'restless' | 'did_not_sleep';
  notes?: string;
}

export interface BathroomLog {
  time: Date;
  type: 'diaper_wet' | 'diaper_dirty' | 'potty_attempt' | 'potty_success' | 'accident';
  notes?: string;
}

export interface ActivityEntry {
  time: Date;
  activity: string;
  category: 'art' | 'music' | 'outdoor' | 'reading' | 'math' | 'science' | 'free_play' | 'group' | 'other';
  description?: string;
  photoUrl?: string;
}

export interface MediaItem {
  url: string;
  thumbnailUrl?: string;
  type: 'photo' | 'video';
  caption?: string;
  uploadedBy: ObjectId;
  uploadedAt: Date;
}

export interface IncidentReport {
  _id?: ObjectId;
  childId: ObjectId;
  classroomId: ObjectId;
  centerId: ObjectId;
  reportedBy: ObjectId;
  witnessIds?: ObjectId[];
  incidentDate: Date;
  incidentTime: Date;
  type: 'injury' | 'illness' | 'behavior' | 'bite' | 'allergic_reaction' | 'other';
  severity: 'minor' | 'moderate' | 'major';
  description: string;
  actionTaken: string;
  firstAidGiven?: string;
  bodyPartAffected?: string;
  parentNotified: boolean;
  parentNotifiedAt?: Date;
  parentNotifiedBy?: ObjectId;
  parentSignature?: string;
  parentSignatureDate?: Date;
  directorReview?: boolean;
  directorReviewDate?: Date;
  followUpRequired: boolean;
  followUpNotes?: string;
  photos?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Announcement {
  _id?: ObjectId;
  centerId: ObjectId;
  classroomIds?: ObjectId[]; // empty = all classrooms
  title: string;
  content: string;
  type: 'general' | 'event' | 'emergency' | 'reminder' | 'newsletter';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  attachments?: MediaItem[];
  scheduledFor?: Date;
  sentAt?: Date;
  sentVia: ('push' | 'email' | 'sms' | 'in_app')[];
  createdBy: ObjectId;
  readBy: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ParentMessage {
  _id?: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  childId?: ObjectId;
  classroomId?: ObjectId;
  centerId: ObjectId;
  content: string;
  type: 'direct' | 'broadcast' | 'emergency';
  attachments?: MediaItem[];
  read: boolean;
  readAt?: Date;
  createdAt: Date;
}

// ============================================================
// 4. CURRICULUM & LEARNING
// ============================================================

export interface LessonPlan {
  _id?: ObjectId;
  classroomId: ObjectId;
  teacherId: ObjectId;
  date: Date;
  title: string;
  theme?: string;
  objectives: string[];
  activities: LessonActivity[];
  materials: string[];
  standards?: string[]; // early learning standards alignment
  differentiation?: string;
  assessment?: string;
  reflection?: string;
  aiGenerated?: boolean;
  status: 'draft' | 'approved' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonActivity {
  time: string;
  duration: number; // minutes
  activity: string;
  area: 'cognitive' | 'language' | 'social_emotional' | 'physical' | 'creative' | 'stem';
  description?: string;
  materials?: string[];
}

export interface LearningMilestone {
  _id?: ObjectId;
  childId: ObjectId;
  category: 'cognitive' | 'language' | 'social_emotional' | 'physical' | 'creative' | 'self_help';
  milestone: string;
  ageExpected: string; // e.g., "12-18 months"
  dateAchieved?: Date;
  status: 'not_started' | 'emerging' | 'developing' | 'achieved';
  observations?: string;
  assessedBy: ObjectId;
  evidence?: MediaItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressReport {
  _id?: ObjectId;
  childId: ObjectId;
  classroomId: ObjectId;
  teacherId: ObjectId;
  reportPeriod: string; // e.g., "Q1 2026"
  startDate: Date;
  endDate: Date;
  milestones: { milestoneId: ObjectId; status: string; notes?: string }[];
  socialEmotional: string;
  cognitive: string;
  language: string;
  physical: string;
  creative: string;
  teacherComments: string;
  parentComments?: string;
  goals: string[];
  sharedWithParent: boolean;
  sharedAt?: Date;
  createdAt: Date;
}

export interface ChildPortfolio {
  _id?: ObjectId;
  childId: ObjectId;
  items: PortfolioItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioItem {
  title: string;
  description?: string;
  type: 'artwork' | 'photo' | 'video' | 'writing' | 'assessment' | 'observation';
  mediaUrl: string;
  thumbnailUrl?: string;
  date: Date;
  addedBy: ObjectId;
  tags?: string[];
}

// ============================================================
// 5. STAFF MANAGEMENT
// ============================================================

export interface StaffProfile {
  _id?: ObjectId;
  userId: ObjectId;
  centerId: ObjectId;
  position: string;
  department: string;
  hireDate: Date;
  classroomAssignments: ObjectId[];
  certifications: StaffCertification[];
  trainingRecords: TrainingRecord[];
  performanceNotes: PerformanceNote[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  hourlyRate?: number;
  salary?: number;
  payType: 'hourly' | 'salary';
  status: 'active' | 'on_leave' | 'terminated';
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffCertification {
  name: string; // CPR, First Aid, STARS hours, etc.
  issuedBy: string;
  issueDate: Date;
  expiryDate: Date;
  certificateNumber?: string;
  documentUrl?: string;
  status: 'valid' | 'expiring_soon' | 'expired';
}

export interface TrainingRecord {
  title: string;
  provider: string;
  date: Date;
  hours: number;
  type: 'stars' | 'cpr' | 'first_aid' | 'food_handler' | 'child_development' | 'other';
  certificateUrl?: string;
  notes?: string;
}

export interface PerformanceNote {
  date: Date;
  type: 'positive' | 'improvement' | 'goal' | 'warning';
  note: string;
  addedBy: ObjectId;
}

export interface StaffSchedule {
  _id?: ObjectId;
  staffId: ObjectId;
  centerId: ObjectId;
  weekStartDate: Date;
  shifts: ScheduleShift[];
  totalHours: number;
  status: 'draft' | 'published' | 'acknowledged';
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleShift {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string; // "08:00"
  endTime: string; // "17:00"
  classroomId?: ObjectId;
  role: string;
  breakDuration?: number; // minutes
}

export interface SubstituteRequest {
  _id?: ObjectId;
  requestedBy: ObjectId;
  centerId: ObjectId;
  date: Date;
  shiftStart: string;
  shiftEnd: string;
  classroomId: ObjectId;
  reason: string;
  status: 'open' | 'filled' | 'cancelled';
  filledBy?: ObjectId;
  approvedBy?: ObjectId;
  createdAt: Date;
}

// ============================================================
// 6. ENROLLMENT & CRM
// ============================================================

export interface EnrollmentForm {
  _id?: ObjectId;
  centerId: ObjectId;
  parentInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: Address;
    employer?: string;
    workPhone?: string;
  };
  secondaryParent?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    relationship: string;
  };
  childInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    allergies: string[];
    medications: string[];
    specialNeeds?: string;
    previousChildcare?: string;
    primaryLanguage: string;
    secondaryLanguage?: string;
  };
  emergencyContacts: EmergencyContact[];
  authorizedPickups: { name: string; relationship: string; phone: string }[];
  medicalInfo: {
    physician: string;
    physicianPhone: string;
    hospital: string;
    insuranceProvider?: string;
    insurancePolicyNumber?: string;
    immunizationUpToDate: boolean;
  };
  documents: EnrollmentDocument[];
  programRequested: string;
  scheduleRequested: string;
  startDateRequested: Date;
  status: 'submitted' | 'under_review' | 'waitlisted' | 'accepted' | 'enrolled' | 'declined';
  digitalSignature?: string;
  signedAt?: Date;
  followUpDates?: Date[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  authorizedPickup: boolean;
}

export interface EnrollmentDocument {
  type: 'vaccination' | 'birth_certificate' | 'medical_form' | 'photo_id' | 'custody_order' | 'other';
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  verified: boolean;
  verifiedBy?: ObjectId;
}

export interface WaitlistEntry {
  _id?: ObjectId;
  centerId: ObjectId;
  enrollmentFormId: ObjectId;
  childName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  programRequested: string;
  requestedStartDate: Date;
  priority: number;
  notes?: string;
  status: 'waiting' | 'offered' | 'accepted' | 'declined' | 'expired';
  offeredDate?: Date;
  responseDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TourSchedule {
  _id?: ObjectId;
  centerId: ObjectId;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  scheduledDate: Date;
  scheduledTime: string;
  guidedBy?: ObjectId;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  followUpSent: boolean;
  convertedToEnrollment: boolean;
  createdAt: Date;
}

export interface LeadTracking {
  _id?: ObjectId;
  centerId: ObjectId;
  parentName: string;
  email: string;
  phone: string;
  source: 'website' | 'referral' | 'social_media' | 'google' | 'walk_in' | 'event' | 'other';
  childAge: string;
  programInterest: string;
  status: 'new' | 'contacted' | 'tour_scheduled' | 'tour_completed' | 'application_sent' | 'enrolled' | 'lost';
  notes?: string;
  followUpDates: Date[];
  assignedTo?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// 7. COMPLIANCE & LICENSING (Washington State DCYF)
// ============================================================

export interface ComplianceLog {
  _id?: ObjectId;
  centerId: ObjectId;
  type: 'attendance' | 'ratio' | 'food_program' | 'incident' | 'medication' | 'immunization' | 'health_check' | 'emergency_contact' | 'safe_sleep' | 'room_checklist' | 'fire_drill' | 'visitor';
  date: Date;
  details: Record<string, unknown>;
  completedBy: ObjectId;
  verified: boolean;
  verifiedBy?: ObjectId;
  verifiedAt?: Date;
  createdAt: Date;
}

export interface MedicationAuthorization {
  _id?: ObjectId;
  childId: ObjectId;
  parentId: ObjectId;
  medicationName: string;
  dosage: string;
  frequency: string;
  administrationRoute: 'oral' | 'topical' | 'inhaled' | 'injection' | 'other';
  startDate: Date;
  endDate: Date;
  specialInstructions?: string;
  sideEffects?: string;
  physicianName: string;
  physicianPhone: string;
  parentSignature: string;
  parentSignatureDate: Date;
  active: boolean;
  administrationLogs: MedicationAdministration[];
  createdAt: Date;
}

export interface MedicationAdministration {
  date: Date;
  time: Date;
  dosageGiven: string;
  administeredBy: ObjectId;
  witnessedBy?: ObjectId;
  notes?: string;
  childReaction?: string;
}

export interface ImmunizationRecord {
  _id?: ObjectId;
  childId: ObjectId;
  vaccinations: {
    name: string;
    dateAdministered: Date;
    provider: string;
    nextDueDate?: Date;
  }[];
  exemptions?: {
    type: 'medical' | 'religious' | 'personal';
    vaccineExempted: string;
    documentUrl?: string;
  }[];
  upToDate: boolean;
  lastReviewDate: Date;
  reviewedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthCheckLog {
  _id?: ObjectId;
  childId: ObjectId;
  classroomId: ObjectId;
  date: Date;
  checkedBy: ObjectId;
  temperature?: number;
  symptoms?: string[];
  action: 'admitted' | 'sent_home' | 'monitoring' | 'parent_contacted';
  notes?: string;
  parentNotified: boolean;
  createdAt: Date;
}

export interface SafeSleepLog {
  _id?: ObjectId;
  childId: ObjectId;
  classroomId: ObjectId;
  date: Date;
  sleepStart: Date;
  sleepEnd?: Date;
  checks: {
    time: Date;
    position: 'back' | 'side' | 'stomach';
    breathing: 'normal' | 'irregular';
    checkedBy: ObjectId;
  }[];
  notes?: string;
  createdAt: Date;
}

export interface FireDrillLog {
  _id?: ObjectId;
  centerId: ObjectId;
  date: Date;
  time: Date;
  type: 'fire' | 'earthquake' | 'lockdown' | 'tornado' | 'evacuation';
  duration: number; // seconds
  allChildrenAccountedFor: boolean;
  totalChildren: number;
  totalStaff: number;
  issues?: string;
  conductedBy: ObjectId;
  notes?: string;
  createdAt: Date;
}

export interface VisitorLog {
  _id?: ObjectId;
  centerId: ObjectId;
  visitorName: string;
  purpose: string;
  organization?: string;
  badgeNumber?: string;
  checkInTime: Date;
  checkOutTime?: Date;
  photoId: boolean;
  escortedBy?: ObjectId;
  areasVisited?: string[];
  notes?: string;
  createdAt: Date;
}

export interface DailyRoomChecklist {
  _id?: ObjectId;
  classroomId: ObjectId;
  centerId: ObjectId;
  date: Date;
  completedBy: ObjectId;
  items: {
    category: string;
    item: string;
    checked: boolean;
    notes?: string;
  }[];
  status: 'in_progress' | 'completed';
  completedAt?: Date;
  createdAt: Date;
}

// ============================================================
// 8. CLASSROOM MANAGEMENT
// ============================================================

export interface Classroom {
  _id?: ObjectId;
  centerId: ObjectId;
  name: string;
  ageGroup: string; // e.g., "Infants (0-12mo)", "Toddlers (12-24mo)"
  capacity: number;
  currentCount: number;
  assignedStaff: ObjectId[];
  leadTeacher: ObjectId;
  maxRatio: number;
  schedule?: string;
  color?: string; // for UI
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChildRoomTransfer {
  _id?: ObjectId;
  childId: ObjectId;
  fromClassroomId: ObjectId;
  toClassroomId: ObjectId;
  transferDate: Date;
  reason: string;
  permanent: boolean;
  approvedBy: ObjectId;
  createdAt: Date;
}

export interface BehaviorLog {
  _id?: ObjectId;
  childId: ObjectId;
  classroomId: ObjectId;
  date: Date;
  type: 'positive' | 'concern' | 'milestone';
  category: 'social' | 'emotional' | 'academic' | 'physical' | 'behavior';
  description: string;
  actionTaken?: string;
  reportedBy: ObjectId;
  parentNotified: boolean;
  followUp?: string;
  createdAt: Date;
}

export interface RewardRecord {
  _id?: ObjectId;
  childId: ObjectId;
  classroomId: ObjectId;
  type: 'star' | 'sticker' | 'badge' | 'certificate' | 'other';
  reason: string;
  points?: number;
  awardedBy: ObjectId;
  date: Date;
  createdAt: Date;
}

// ============================================================
// 9. FOOD & NUTRITION
// ============================================================

export interface MenuPlan {
  _id?: ObjectId;
  centerId: ObjectId;
  weekStartDate: Date;
  meals: PlannedMeal[];
  createdBy: ObjectId;
  status: 'draft' | 'published';
  cacfpCompliant: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlannedMeal {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  mealType: 'breakfast' | 'am_snack' | 'lunch' | 'pm_snack';
  items: string[];
  allergens: string[];
  alternatives?: string; // for allergies
}

export interface ChildDietaryProfile {
  _id?: ObjectId;
  childId: ObjectId;
  allergies: Allergy[];
  dietaryRestrictions: string[];
  preferences: string[];
  specialInstructions?: string;
  parentApproved: boolean;
  lastUpdated: Date;
  updatedBy: ObjectId;
}

export interface Allergy {
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
  reaction: string;
  treatmentPlan: string;
  epiPenRequired: boolean;
  epiPenLocation?: string;
  physicianApproval?: string;
}

export interface CACFPLog {
  _id?: ObjectId;
  centerId: ObjectId;
  date: Date;
  mealType: 'breakfast' | 'am_snack' | 'lunch' | 'pm_snack';
  childrenServed: number;
  menuItemsServed: string[];
  componentsMet: {
    grain: boolean;
    meat_alternate: boolean;
    vegetable: boolean;
    fruit: boolean;
    milk: boolean;
  };
  notes?: string;
  recordedBy: ObjectId;
  createdAt: Date;
}

// ============================================================
// 10. HEALTH & SAFETY
// ============================================================

export interface IllnessTracking {
  _id?: ObjectId;
  childId: ObjectId;
  centerId: ObjectId;
  reportedDate: Date;
  symptoms: string[];
  temperature?: number;
  diagnosis?: string;
  sentHome: boolean;
  sentHomeTime?: Date;
  returnDate?: Date;
  doctorNoteRequired: boolean;
  doctorNoteReceived: boolean;
  doctorNoteUrl?: string;
  contagious: boolean;
  otherChildrenNotified: boolean;
  reportedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface SafetyChecklist {
  _id?: ObjectId;
  centerId: ObjectId;
  classroomId?: ObjectId;
  type: 'daily_opening' | 'daily_closing' | 'weekly' | 'monthly';
  date: Date;
  items: {
    item: string;
    checked: boolean;
    notes?: string;
  }[];
  completedBy: ObjectId;
  status: 'incomplete' | 'completed';
  completedAt?: Date;
  createdAt: Date;
}

// ============================================================
// 11. TRANSPORTATION
// ============================================================

export interface BusRoute {
  _id?: ObjectId;
  centerId: ObjectId;
  routeName: string;
  routeNumber: string;
  driverId: ObjectId;
  vehicleId: string;
  stops: BusStop[];
  schedule: {
    departureTime: string;
    arrivalTime: string;
    type: 'morning_pickup' | 'afternoon_dropoff';
  };
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusStop {
  order: number;
  address: string;
  latitude: number;
  longitude: number;
  estimatedTime: string;
  childrenAssigned: ObjectId[];
}

export interface BusTracking {
  _id?: ObjectId;
  routeId: ObjectId;
  date: Date;
  driverId: ObjectId;
  currentLocation?: GeoLocation;
  status: 'not_started' | 'in_progress' | 'completed';
  startTime?: Date;
  endTime?: Date;
  stops: {
    stopIndex: number;
    arrivedAt?: Date;
    departedAt?: Date;
    childrenPickedUp?: ObjectId[];
    childrenDroppedOff?: ObjectId[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DriverLog {
  _id?: ObjectId;
  driverId: ObjectId;
  routeId: ObjectId;
  date: Date;
  preInspection: {
    tiresChecked: boolean;
    lightsWorking: boolean;
    carSeatsSecured: boolean;
    firstAidKit: boolean;
    fuelLevel: string;
    mileageStart: number;
    mileageEnd?: number;
    issues?: string;
  };
  totalChildren: number;
  incidents?: string;
  notes?: string;
  createdAt: Date;
}

// ============================================================
// 12. ADMIN & OPERATIONS
// ============================================================

export interface Center {
  _id?: ObjectId;
  name: string;
  address: Address;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseExpiry: Date;
  capacity: number;
  operatingHours: {
    day: string;
    open: string;
    close: string;
  }[];
  programs: string[];
  ownerId: ObjectId;
  active: boolean;
  settings: CenterSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface CenterSettings {
  latePickupFeePerMinute: number;
  latePickupGracePeriod: number; // minutes
  attendanceReminders: boolean;
  autoInvoicing: boolean;
  invoicingDay: number; // day of month
  allowParentMessaging: boolean;
  requirePhotoVerification: boolean;
  geofenceEnabled: boolean;
  kioskMode: boolean;
}

export interface AuditLog {
  _id?: ObjectId;
  centerId: ObjectId;
  userId: ObjectId;
  action: string;
  entityType: string;
  entityId: ObjectId;
  changes?: Record<string, { old: unknown; new: unknown }>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface CustomForm {
  _id?: ObjectId;
  centerId: ObjectId;
  title: string;
  description?: string;
  fields: FormField[];
  submissions?: ObjectId[];
  active: boolean;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'multiselect' | 'checkbox' | 'file' | 'signature';
  required: boolean;
  options?: string[];
  placeholder?: string;
  validation?: string;
}

export interface InventoryItem {
  _id?: ObjectId;
  centerId: ObjectId;
  name: string;
  category: 'diapers' | 'wipes' | 'food' | 'cleaning' | 'art_supplies' | 'office' | 'first_aid' | 'other';
  currentQuantity: number;
  reorderLevel: number;
  unit: string;
  lastRestocked?: Date;
  cost?: number;
  supplier?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseRecord {
  _id?: ObjectId;
  centerId: ObjectId;
  category: 'supplies' | 'food' | 'utilities' | 'rent' | 'insurance' | 'payroll' | 'training' | 'maintenance' | 'other';
  description: string;
  amount: number;
  date: Date;
  vendor?: string;
  receiptUrl?: string;
  approvedBy?: ObjectId;
  status: 'pending' | 'approved' | 'reimbursed';
  createdBy: ObjectId;
  createdAt: Date;
}

// ============================================================
// 13-14. PARENT & TEACHER APP SPECIFIC
// ============================================================

export interface AbsenceRequest {
  _id?: ObjectId;
  childId: ObjectId;
  parentId: ObjectId;
  centerId: ObjectId;
  date: Date;
  endDate?: Date; // for multi-day absences
  reason: 'illness' | 'vacation' | 'family' | 'appointment' | 'other';
  notes?: string;
  status: 'submitted' | 'acknowledged';
  acknowledgedBy?: ObjectId;
  createdAt: Date;
}

export interface EventCalendar {
  _id?: ObjectId;
  centerId: ObjectId;
  title: string;
  description?: string;
  date: Date;
  endDate?: Date;
  time?: string;
  location?: string;
  type: 'holiday' | 'field_trip' | 'parent_conference' | 'celebration' | 'fundraiser' | 'meeting' | 'other';
  classroomIds?: ObjectId[]; // empty = center-wide
  rsvpRequired: boolean;
  rsvps?: { parentId: ObjectId; response: 'yes' | 'no' | 'maybe'; respondedAt: Date }[];
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// 15. ADVANCED / PREMIUM FEATURES
// ============================================================

export interface AIReport {
  _id?: ObjectId;
  childId: ObjectId;
  type: 'daily_summary' | 'weekly_summary' | 'lesson_plan' | 'attendance_anomaly' | 'billing_optimization';
  content: string;
  generatedAt: Date;
  model: string;
  prompt?: string;
  approved: boolean;
  approvedBy?: ObjectId;
}

export interface SmartDoorAccess {
  _id?: ObjectId;
  centerId: ObjectId;
  personId: ObjectId;
  personType: 'parent' | 'staff' | 'visitor';
  accessMethod: 'rfid' | 'qr' | 'pin' | 'facial';
  accessGranted: boolean;
  doorId: string;
  timestamp: Date;
}

export interface NotificationPreferences {
  _id?: ObjectId;
  userId: ObjectId;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  preferences: {
    dailyReports: boolean;
    attendance: boolean;
    billing: boolean;
    announcements: boolean;
    emergencies: boolean;
    messages: boolean;
    events: boolean;
    photos: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}
