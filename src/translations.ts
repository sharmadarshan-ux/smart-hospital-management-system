export type Language = 'en' | 'ta' | 'hi';

export interface Translations {
  appName: string;
  tagline: string;
  workingOffline: string;
  changesWillSync: string;
  tokenLabel: string;
  liveWaitEstimate: string;
  whyThisEstimate: string;
  journeyProgress: string;
  virtualQueueLabel: string;
  virtualQueueDesc: string;
  switchDoctorPromptTitle: string;
  switchDoctorPromptBody: string;
  acceptSwitch: string;
  declineSwitch: string;
  nowServing: string;
  upcomingTokens: string;
  callNext: string;
  markDone: string;
  triageTitle: string;
  patientSearch: string;
  emergencyAlert: string;
  seniorCitizenBadge: string;
  generalBadge: string;
  announcementStrip: string;
  room: string;
  doctor: string;
  department: string;
  status: string;
  actions: string;
  wait: string;
  priorityReason: string;
  lanSyncStatus: string;
  online: string;
  offline: string;
  syncNow: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "QueueCare",
    tagline: "Hospital Queue & Patient Flow System",
    workingOffline: "Working offline (Hospital LAN).",
    changesWillSync: "Changes will sync when central connection returns.",
    tokenLabel: "Your Token Number",
    liveWaitEstimate: "Estimated Wait Time",
    whyThisEstimate: "Why this estimate?",
    journeyProgress: "Multi-Stop Patient Journey",
    virtualQueueLabel: "Virtual Queue Alert (SMS)",
    virtualQueueDesc: "Receive an SMS alert when 15 minutes remain before your turn.",
    switchDoctorPromptTitle: "Faster Consultation Available",
    switchDoctorPromptBody: "Dr. R. Karthik (OPD Room 4) in General Medicine currently has 2 patients waiting. Would you like to switch to reduce wait time?",
    acceptSwitch: "Switch to Dr. R. Karthik",
    declineSwitch: "Stay with Dr. Meenakshi",
    nowServing: "NOW SERVING",
    upcomingTokens: "UPCOMING TOKENS",
    callNext: "Call Next Patient",
    markDone: "Mark Consultation Done",
    triageTitle: "Reception Check-In & Clinical Triage",
    patientSearch: "Search Patient by Mobile / UHID / Name...",
    emergencyAlert: "Emergency / Critical Care",
    seniorCitizenBadge: "Senior Citizen Priority",
    generalBadge: "General Queue",
    announcementStrip: "Notice: Emergency cases and senior citizens (60+) receive priority routing by clinical protocol.",
    room: "Room",
    doctor: "Doctor",
    department: "Department",
    status: "Status",
    actions: "Actions",
    wait: "Wait",
    priorityReason: "Priority Reason",
    lanSyncStatus: "LAN Server Sync Status",
    online: "Connected to Hospital LAN & Central Database",
    offline: "Running Local LAN Cache (Offline Mode)",
    syncNow: "Sync Pending Operations (4 queued)",
  },
  ta: {
    appName: "QueueCare",
    tagline: "அரசு & தனியர் மருத்துவமனை வரிசை நிர்வாகம்",
    workingOffline: "ஆஃப்லைனில் இயங்குகிறது (மருத்துவமனை LAN).",
    changesWillSync: "இணையம் வரும்போது தகவல்கள் ஒத்திசைக்கப்படும்.",
    tokenLabel: "உங்கள் டோக்கன் எண்",
    liveWaitEstimate: "எதிர்பார்க்கப்படும் காத்திருப்பு நேரம்",
    whyThisEstimate: "இந்தக் கணிப்பு ஏன்?",
    journeyProgress: "மருத்துவமனை வருகை கட்டங்கள்",
    virtualQueueLabel: "மெய்நிகர் வரிசை எச்சரிக்கை (SMS)",
    virtualQueueDesc: "உங்கள் முறைக்கு 15 நிமிடங்கள் இருக்கும் போது குறுஞ்செய்தி வரவழைக்கவும்.",
    switchDoctorPromptTitle: "விரைவான சிகிச்சை வாய்ப்பு",
    switchDoctorPromptBody: "டாக்டர் R. கார்த்திக் (அறை 4) அவர்களிடம் 2 நோயாளிகளே உள்ளனர். உங்கள் காத்திருப்பை குறைக்க மாற விரும்புகிறீர்களா?",
    acceptSwitch: "டாக்டர் R. கார்த்திக்கிற்கு மாறவும்",
    declineSwitch: "டாக்டர் மீனாட்சியிடமே தொடரவும்",
    nowServing: "தற்போது அழைக்கப்படுபவர்",
    upcomingTokens: "அடுத்த டோக்கன்கள்",
    callNext: "அடுத்த நோயாளியை அழைக்கவும்",
    markDone: "சிகிச்சை முடிந்தது என பதிவுசெய்",
    triageTitle: "வரவேற்பு பதிவு & முதன்மை மதிப்பீடு",
    patientSearch: "தொலைபேசி எண் / UHID மூலமாக தேடுக...",
    emergencyAlert: "அவசர சிகிச்சை தேவை",
    seniorCitizenBadge: "மூத்த குடிமகன் முன்னுரிமை",
    generalBadge: "பொது வரிசை",
    announcementStrip: "அறிவிப்பு: அவசர சிகிச்சைப் பிரிவினர் மற்றும் மூத்த குடிமக்களுக்கு (60+) முன்னுரிமை அளிக்கப்படுகிறது.",
    room: "அறை",
    doctor: "மருத்துவர்",
    department: "துறை",
    status: "நிலை",
    actions: "செயல்கள்",
    wait: "காத்திருப்பு",
    priorityReason: "முன்னுரிமை காரணம்",
    lanSyncStatus: "LAN சேவையக ஒத்திசைவு நிலை",
    online: "மத்திய தரவுத்தளத்துடன் இணைக்கப்பட்டுள்ளது",
    offline: "உள் LAN சேமிப்பில் இயங்குகிறது",
    syncNow: "நிலுவை தரவை ஒத்திசைக்கவும்",
  },
  hi: {
    appName: "QueueCare",
    tagline: "अस्पताल कतार और मरीज प्रवाह प्रणाली",
    workingOffline: "ऑफलाइन काम कर रहा है (अस्पताल LAN)।",
    changesWillSync: "इंटरनेट आने पर डेटा स्वचालित रूप से सिंक होगा।",
    tokenLabel: "आपका टोकन क्रमांक",
    liveWaitEstimate: "अनुमानित प्रतीक्षा समय",
    whyThisEstimate: "यह अनुमान क्यों?",
    journeyProgress: "अस्पताल यात्रा के चरण",
    virtualQueueLabel: "वर्चुअल कतार अलर्ट (SMS)",
    virtualQueueDesc: "आपकी बारी से 15 मिनट पहले एसएमएस सूचना प्राप्त करें।",
    switchDoctorPromptTitle: "शीघ्र परामर्श उपलब्ध",
    switchDoctorPromptBody: "डॉ. आर. कार्तिक (कमरा 4) के पास केवल 2 मरीज प्रतीक्षा में हैं। क्या आप प्रतीक्षा समय घटाने के लिए बदलना चाहते हैं?",
    acceptSwitch: "डॉ. आर. कार्तिक के पास जाएँ",
    declineSwitch: "डॉ. मीनाक्षी के साथ बने रहें",
    nowServing: "अभी बुलाए जा रहे हैं",
    upcomingTokens: "आगामी टोकन",
    callNext: "अगले मरीज को बुलाएँ",
    markDone: "परामर्श पूरा हुआ दर्ज करें",
    triageTitle: "रिसेप्शन पंजीकरण एवं प्राथमिकता जाँच",
    patientSearch: "मोबाइल नंबर / UHID / नाम से खोजें...",
    emergencyAlert: "आपातकालीन / गंभीर स्थिति",
    seniorCitizenBadge: "वरिष्ठ नागरिक प्राथमिकता",
    generalBadge: "सामान्य कतार",
    announcementStrip: "सूचना: आपातकालीन मामलों और वरिष्ठ नागरिकों (60+) को नैदानिक नियमों के अनुसार प्राथमिकता दी जाती है।",
    room: "कमरा",
    doctor: "डॉक्टर",
    department: "विभाग",
    status: "स्थिति",
    actions: "कार्रवाई",
    wait: "प्रतीक्षा",
    priorityReason: "प्राथमिकता कारण",
    lanSyncStatus: "LAN सर्वर सिंक स्थिति",
    online: "केंद्रीय डेटाबेस से जुड़ा हुआ है",
    offline: "स्थानीय LAN कैश (ऑफलाइन मोड)",
    syncNow: "लंबित संचालन सिंक करें",
  }
};
