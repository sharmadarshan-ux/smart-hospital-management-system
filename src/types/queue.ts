export type PriorityTier = 'Emergency' | 'Senior' | 'Pregnant' | 'General';

export type JourneyStage = 'Registration' | 'Doctor' | 'Lab' | 'Pharmacy' | 'Billing' | 'Finished';

export interface PatientRecord {
  id: string;
  uhid: string;
  token: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  phone: string;
  visitType: string;
  department: string;
  assignedDoctor: string;
  roomNo: string;
  priority: PriorityTier;
  priorityReason: string;
  priorityOrder: number; // Lower is higher priority
  estimatedWaitMinutes: number;
  registrationTime: string;
  status: 'Waiting' | 'In Consultation' | 'Completed' | 'Transferred';
  journeyStage: JourneyStage;
  journeyStageStatus: 'Completed' | 'In Progress' | 'Next' | 'Pending';
  virtualQueueAlert: boolean;
  canSwitchDoctor?: boolean;
  suggestedDoctor?: {
    name: string;
    roomNo: string;
    waitMinutes: number;
    queueLength: number;
  };
}

export interface DoctorInfo {
  id: string;
  name: string;
  department: string;
  roomNo: string;
  currentPatientToken: string | null;
  waitingCount: number;
  avgVelocityMinutes: number; // minutes per patient
  status: 'Active' | 'On Break' | 'Offline';
}

export interface DepartmentMetric {
  name: string;
  activeDoctors: number;
  waitingPatients: number;
  avgWaitTime: number; // in mins
  jamLevel: 'Normal' | 'Moderate Jam' | 'Critical Jam';
  bottleneckStop?: JourneyStage;
}
