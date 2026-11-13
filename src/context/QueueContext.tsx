import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PatientRecord, DoctorInfo, DepartmentMetric, PriorityTier } from '../types/queue';
import { INITIAL_PATIENTS, INITIAL_DOCTORS, INITIAL_DEPARTMENT_METRICS } from '../data/mockData';

interface TriageInput {
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  phone: string;
  department: string;
  assignedDoctor: string;
  visitType: string;
  hasChestPain: boolean;
  hasSevereBleeding: boolean;
  isUnconscious: boolean;
  isPregnant: boolean;
  pregnancyWeeks?: number;
}

interface QueueContextType {
  patients: PatientRecord[];
  doctors: DoctorInfo[];
  departments: DepartmentMetric[];
  isOffline: boolean;
  toggleOffline: () => void;
  activePatientId: string;
  setActivePatientId: (id: string) => void;
  callNextPatient: (doctorId: string) => void;
  markPatientDone: (patientId: string) => void;
  switchDoctorConsent: (patientId: string, targetDoctorName: string) => void;
  registerNewPatient: (triage: TriageInput) => PatientRecord;
  toggleVirtualQueue: (patientId: string) => void;
  lastAnnouncement: { text: string; lang: 'en' | 'ta' | 'hi'; time: string } | null;
  playVoiceAnnouncement: (text: string, lang: 'en' | 'ta' | 'hi') => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<PatientRecord[]>(INITIAL_PATIENTS);
  const [doctors, setDoctors] = useState<DoctorInfo[]>(INITIAL_DOCTORS);
  const [departments] = useState<DepartmentMetric[]>(INITIAL_DEPARTMENT_METRICS);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [activePatientId, setActivePatientId] = useState<string>('pat-104');
  const [lastAnnouncement, setLastAnnouncement] = useState<{ text: string; lang: 'en' | 'ta' | 'hi'; time: string } | null>({
    text: "Token A-102 (Lakshmi Ammal) please proceed to OPD Room 3",
    lang: "en",
    time: "11:30 AM"
  });

  const toggleOffline = () => setIsOffline(prev => !prev);

  useEffect(() => {
    const timer = setInterval(() => {
      setPatients(prevPatients => {
        return prevPatients.map(patient => {
          if (patient.status === 'Waiting' && patient.estimatedWaitMinutes > 1) {
            return {
              ...patient,
              estimatedWaitMinutes: Math.max(1, patient.estimatedWaitMinutes - 1)
            };
          }
          return patient;
        });
      });
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const playVoiceAnnouncement = (text: string, lang: 'en' | 'ta' | 'hi') => {
    setLastAnnouncement({
      text,
      lang,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (lang === 'ta') utterance.lang = 'ta-IN';
      else if (lang === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const callNextPatient = (doctorId: string) => {
    const doc = doctors.find(d => d.id === doctorId);
    if (!doc) return;

    const docPatients = patients.filter(
      p => p.assignedDoctor === doc.name && p.status === 'Waiting'
    ).sort((a, b) => {
      if (a.priorityOrder !== b.priorityOrder) return a.priorityOrder - b.priorityOrder;
      return a.id.localeCompare(b.id);
    });

    if (docPatients.length === 0) return;

    const nextPatient = docPatients[0];

    setPatients(prev => prev.map(p => {
      if (p.assignedDoctor === doc.name && p.status === 'In Consultation') {
        return { ...p, status: 'Completed', journeyStage: 'Lab', journeyStageStatus: 'Next' };
      }
      if (p.id === nextPatient.id) {
        return { ...p, status: 'In Consultation', estimatedWaitMinutes: 0, journeyStageStatus: 'In Progress' };
      }
      return p;
    }));

    setDoctors(prev => prev.map(d => {
      if (d.id === doctorId) {
        return { ...d, currentPatientToken: nextPatient.token, waitingCount: Math.max(0, d.waitingCount - 1) };
      }
      return d;
    }));

    playVoiceAnnouncement(
      `Token ${nextPatient.token}, ${nextPatient.name}, please proceed to ${doc.roomNo}`,
      'en'
    );
  };

  const markPatientDone = (patientId: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          status: 'Completed',
          journeyStage: p.journeyStage === 'Doctor' ? 'Lab' : 'Finished',
          journeyStageStatus: p.journeyStage === 'Doctor' ? 'Next' : 'Completed'
        };
      }
      return p;
    }));
  };

  const switchDoctorConsent = (patientId: string, targetDoctorName: string) => {
    const targetDoc = doctors.find(d => d.name === targetDoctorName);
    const room = targetDoc ? targetDoc.roomNo : 'OPD Room 4';

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          assignedDoctor: targetDoctorName,
          roomNo: room,
          canSwitchDoctor: false,
          suggestedDoctor: undefined,
          estimatedWaitMinutes: Math.max(3, p.estimatedWaitMinutes - 15),
          priorityReason: `${p.priorityReason} (Transferred to ${targetDoctorName} for load balancing)`
        };
      }
      return p;
    }));
  };

  const toggleVirtualQueue = (patientId: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return { ...p, virtualQueueAlert: !p.virtualQueueAlert };
      }
      return p;
    }));
  };

  const registerNewPatient = (triage: TriageInput): PatientRecord => {
    let priority: PriorityTier = 'General';
    let priorityReason = 'Standard registration order';
    let priorityOrder = 3;

    if (triage.hasChestPain || triage.hasSevereBleeding || triage.isUnconscious) {
      priority = 'Emergency';
      priorityReason = `CRITICAL TRIAGE: Emergency priority (${
        triage.hasChestPain ? 'Chest pain' : triage.hasSevereBleeding ? 'Severe bleeding' : 'Acute trauma'
      })`;
      priorityOrder = 1;
    } else if (triage.age >= 60) {
      priority = 'Senior';
      priorityReason = `Moved ahead: Senior citizen, age ${triage.age}`;
      priorityOrder = 2;
    } else if (triage.isPregnant) {
      priority = 'Pregnant';
      priorityReason = `Moved ahead: Priority care - Pregnant mother (${triage.pregnancyWeeks || 24} weeks)`;
      priorityOrder = 2;
    }

    const doctor = doctors.find(d => d.name === triage.assignedDoctor) || doctors[0];
    const prefix = triage.department.substring(0, 1).toUpperCase();
    const tokenNum = 100 + patients.length + 1;
    const token = `${prefix}-${tokenNum}`;
    const newId = `pat-${Date.now()}`;

    // Note for machine learning wait time model integration:
    // ML Wait Model: estimatedWait = predictWaitTime({ doctorId, priorityOrder, currentQueueLength, avgVelocityMinutes })
    const baseWait = (doctor.waitingCount + 1) * Math.round(doctor.avgVelocityMinutes);
    const estimatedWaitMinutes = priorityOrder === 1 ? 2 : priorityOrder === 2 ? Math.round(baseWait * 0.5) : baseWait;

    const newPatient: PatientRecord = {
      id: newId,
      uhid: `UHID-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      token,
      name: triage.name,
      age: triage.age,
      gender: triage.gender,
      phone: triage.phone,
      visitType: triage.visitType,
      department: triage.department,
      assignedDoctor: triage.assignedDoctor,
      roomNo: doctor.roomNo,
      priority,
      priorityReason,
      priorityOrder,
      estimatedWaitMinutes,
      registrationTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Waiting',
      journeyStage: 'Doctor',
      journeyStageStatus: 'Next',
      virtualQueueAlert: true,
    };

    setPatients(prev => [newPatient, ...prev]);
    setDoctors(prev => prev.map(d => {
      if (d.name === triage.assignedDoctor) {
        return { ...d, waitingCount: d.waitingCount + 1 };
      }
      return d;
    }));

    return newPatient;
  };

  return (
    <QueueContext.Provider
      value={{
        patients,
        doctors,
        departments,
        isOffline,
        toggleOffline,
        activePatientId,
        setActivePatientId,
        callNextPatient,
        markPatientDone,
        switchDoctorConsent,
        registerNewPatient,
        toggleVirtualQueue,
        lastAnnouncement,
        playVoiceAnnouncement
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useLiveQueue = (): QueueContextType => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useLiveQueue must be used within a QueueProvider');
  }
  return context;
};
