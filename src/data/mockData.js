// Comprehensive Emergency Missing Person Dataset
// Fully aligned with Priority National Bulletin & National Emergency Standards
// Strictly accurate demographic categories, gender matching, and authentic details

export const INITIAL_CASES = [
  // 1. AARAV SHARMA (CHILD - 8y BOY - CRITICAL PRIORITY)
  {
    id: "GOH-2026-0449",
    caseRef: "DL-POL-2026-0892",
    name: "Aarav Sharma",
    age: 8,
    gender: "Male",
    category: "CHILD", // CHILD, WOMAN, MAN, SENIOR
    status: "CRITICAL_ALERT",
    urgencyLevel: "HIGH_RED",
    priorityLabel: "Critical Priority",
    photo: "/images/aarav_sharma.png",
    lastSeenLocation: "Near Children Park, India Gate Circle, Central Delhi",
    city: "New Delhi",
    state: "Delhi NCR",
    coordinates: [28.6129, 77.2295],
    lastSeenTime: "Today, 03:15 PM (1h 14m ago)",
    reportedTime: "Today, 03:30 PM",
    aadhaarVerified: true,
    policeFIR: "FIR #449/2026",
    policeStation: "Tilak Marg / India Gate Police Station",
    investigatingOfficer: "Insp. Rajesh Mehra (+91 98110-23451)",
    clothing: "Bright yellow collared polo t-shirt, dark blue denim shorts, white Adidas sneakers with red stripes",
    description: "Separated from parents near ice cream kiosk outside Children Park. Wearing bright yellow collared polo t-shirt and blue denim shorts.",
    physicalTraits: {
      gender: "Male",
      height: '4\'1" (124 cm)',
      complexion: "Slender, Fair",
      clothing: "Bright yellow collared polo t-shirt, dark blue denim shorts, white Adidas sneakers with red stripes",
      distinguishingMarks: "Small birthmark on left wrist, wears blue wristband with emergency contact QR",
      medicalWarning: "Mild asthma, carries inhaler in small blue sling bag"
    },
    geoRadiusKm: 5.5,
    alertsDispatched: 42800,
    sightingsCount: 4,
    aiMatchConfidence: 93,
    timeline: [
      { time: "03:15 PM", title: "Last Seen", desc: "Separated near Children Park ice cream vendor.", icon: "MapPin" },
      { time: "03:30 PM", title: "Aadhaar e-KYC Report Filed", desc: "Mother filed emergency alert via Guardians mobile gateway.", icon: "FileText" },
      { time: "03:35 PM", title: "Police Station FIR Sealed", desc: "Tilak Marg PS confirmed Level-1 Red Priority Alert.", icon: "ShieldCheck" },
      { time: "03:38 PM", title: "5.5 km Geo-Fence Dispatched", desc: "42,800 cell broadcast SMS pushed across Central Delhi corridor.", icon: "Radio" }
    ],
    sightings: [
      {
        id: "ST-1",
        witnessName: "Vikram K. (Commuter)",
        time: "35 mins ago",
        location: "National Stadium Gate #2",
        details: "Spotted a boy in bright yellow polo near pedestrian underpass looking distressed.",
        verifiedByPolice: true,
        photoEvidence: null
      }
    ]
  },

  // 2. ANANYA DESHMUKH (WOMAN - 17y FEMALE - ACTIVE SEARCH)
  {
    id: "GOH-2026-0912",
    caseRef: "MH-MUM-2026-0912",
    name: "Ananya Deshmukh",
    age: 17,
    gender: "Female",
    category: "WOMAN",
    status: "SEARCH_IN_PROGRESS",
    urgencyLevel: "AMBER",
    priorityLabel: "Active Search",
    photo: "/images/ananya_deshmukh.png",
    lastSeenLocation: "Platform 4, Bandra Terminus Suburban Station",
    city: "Mumbai",
    state: "Maharashtra",
    coordinates: [19.0617, 72.8427],
    lastSeenTime: "Today, 11:20 AM (5h 09m ago)",
    reportedTime: "Today, 12:45 PM",
    aadhaarVerified: true,
    policeFIR: "FIR #912/2026",
    policeStation: "Bandra Terminus GRP Outpost",
    investigatingOfficer: "Sr. Insp. Sanjay Gaikwad (+91 98200-78190)",
    clothing: "Navy blue sports windcheater, black rimmed spectacles, grey cargo pants, maroon backpack",
    description: "Junior college student. Last seen walking towards Platform 4 foot overbridge after morning practical exams. Phone switched off near station concourse.",
    physicalTraits: {
      gender: "Female",
      height: '5\'4" (162 cm)',
      complexion: "Medium, Wheatish",
      clothing: "Navy blue sports windcheater, black rimmed spectacles, grey cargo pants, maroon backpack",
      distinguishingMarks: "Black rimmed spectacles, silver ear studs, braided hair",
      medicalWarning: "None reported"
    },
    geoRadiusKm: 8,
    alertsDispatched: 78500,
    sightingsCount: 3,
    aiMatchConfidence: 89,
    timeline: [
      { time: "11:20 AM", title: "Station CCTV Recorded", desc: "Turnstile footage confirms entry to Platform 4.", icon: "MapPin" },
      { time: "12:45 PM", title: "Report Logged", desc: "Family reported absence when she didn't arrive home.", icon: "FileText" },
      { time: "01:05 PM", title: "GRP Transit Broadcast", desc: "Alert distributed to suburban train conductors and ticket collectors.", icon: "Radio" }
    ],
    sightings: [
      {
        id: "ST-2",
        witnessName: "Kishore M. (Tea Stall Vendor)",
        time: "1 hour ago",
        location: "Khar Subway exit",
        details: "Saw a girl matching maroon backpack asking for auto-rickshaw to Western Express Highway.",
        verifiedByPolice: true,
        photoEvidence: null
      }
    ]
  },

  // 3. HARISH CHANDRA VERMA (SENIOR - 72y MALE - CRITICAL PRIORITY)
  {
    id: "GOH-2026-0182",
    caseRef: "KA-BLR-2026-0182",
    name: "Harish Chandra Verma",
    age: 72,
    gender: "Male",
    category: "SENIOR",
    status: "CRITICAL_ALERT",
    urgencyLevel: "HIGH_RED",
    priorityLabel: "Critical Priority",
    photo: "/images/harish_verma.png",
    lastSeenLocation: "Near 12th Main, 100 Feet Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    coordinates: [12.9784, 77.6408],
    lastSeenTime: "Today, 09:30 AM (7h ago)",
    reportedTime: "Today, 10:15 AM",
    aadhaarVerified: true,
    policeFIR: "FIR #182/2026",
    policeStation: "Indiranagar Police Station",
    investigatingOfficer: "Sub-Insp. Archana Gowda (+91 94480-12890)",
    clothing: "Light beige cotton kurta, white pajama, brown leather sandals, metal wire-frame spectacles",
    description: "Suffers from early-stage Alzheimer's / Dementia and mild disorientation. Wandered away during morning walk. Requires blood pressure medication.",
    physicalTraits: {
      gender: "Male",
      height: '5\'8" (172 cm)',
      complexion: "Slender, Fair",
      clothing: "Light beige cotton kurta, white pajama, brown leather sandals, metal wire-frame spectacles",
      distinguishingMarks: "Grey trimmed beard, metal wire-frame spectacles, silver medical ID band on right wrist",
      medicalWarning: "Early stage Alzheimer's, requires daily hypertension medication"
    },
    geoRadiusKm: 6,
    alertsDispatched: 54100,
    sightingsCount: 5,
    aiMatchConfidence: 91,
    timeline: [
      { time: "09:30 AM", title: "Morning Walk Departure", desc: "Left residence on 12th Main for morning stroll.", icon: "MapPin" },
      { time: "10:15 AM", title: "Family Alert Triggered", desc: "Logged with medical urgency flags via Guardians portal.", icon: "FileText" },
      { time: "10:30 AM", title: "BMTC Transit Alert", desc: "Broadcast pushed to 65 BMTC buses operating in Indiranagar/Domlur zone.", icon: "Radio" }
    ],
    sightings: [
      {
        id: "ST-3",
        witnessName: "Ananya R. (Indiranagar Resident)",
        time: "45 mins ago",
        location: "Kaveri Hospital Bus Stop",
        details: "Elderly gentleman in beige kurta resting near bus stop bench, seemed disoriented.",
        verifiedByPolice: true,
        photoEvidence: null
      }
    ]
  },

  // 4. PRIYA MUKHERJEE (CHILD - 9y FEMALE - SAFELY FOUND)
  {
    id: "GOH-2026-0620",
    name: "Priya Mukherjee",
    age: 9,
    gender: "Female",
    category: "CHILD",
    status: "RESOLVED",
    urgencyLevel: "RESOLVED",
    priorityLabel: "Safely Found",
    photo: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&auto=format&fit=crop&q=80",
    lastSeenLocation: "New Market Clock Tower, Esplanade",
    city: "Kolkata",
    state: "West Bengal",
    coordinates: [22.5604, 88.3512],
    lastSeenTime: "Yesterday, 06:10 PM",
    reportedTime: "Yesterday, 06:25 PM",
    resolvedTime: "Reunited in 40 Minutes!",
    aadhaarVerified: true,
    policeFIR: "FIR #620/2026",
    policeStation: "New Market Police Station",
    investigatingOfficer: "Insp. Sourav Mukherjee",
    clothing: "Red frock with white floral polka dots, black school shoes",
    description: "Slipped away during Durga Puja festive market crowd. 9,400 local merchants and shoppers buzzed via Guardians SMS. Recovered safely by local tea vendor.",
    physicalTraits: {
      gender: "Female",
      height: "4' 2\"",
      complexion: "Wheatish",
      clothing: "Red frock with white floral polka dots, black school shoes",
      distinguishingMarks: "Dimple on left cheek, ribbon in hair"
    },
    geoRadiusKm: 4,
    alertsDispatched: 9400,
    sightingsCount: 3,
    aiMatchConfidence: 97,
    reunitedStory: "A tea stall owner spotted Priya holding a pillar 18 minutes after his phone buzzed with the broadcast alert and kept her safe until police arrived.",
    timeline: [
      { time: "06:10 PM", title: "Separated in Crowd", desc: "Lost sight of parents near Clock Tower.", icon: "MapPin" },
      { time: "06:25 PM", title: "Aadhaar Alert Dispatched", desc: "9,400 merchant terminals alerted across Esplanade.", icon: "Radio" },
      { time: "06:50 PM", title: "Safe Reunion", desc: "Verified and returned safely to parents.", icon: "HeartHandshake" }
    ],
    sightings: []
  },

  // 5. DEVENDRA PATEL (MAN - 23y MALE - SAFELY FOUND)
  {
    id: "GOH-2026-0312",
    name: "Devendra Patel",
    age: 23,
    gender: "Male",
    category: "MAN",
    status: "RESOLVED",
    urgencyLevel: "RESOLVED",
    priorityLabel: "Safely Found",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    lastSeenLocation: "Hitec City Metro Station concourse",
    city: "Hyderabad",
    state: "Telangana",
    coordinates: [17.4474, 78.3762],
    lastSeenTime: "3 Days Ago",
    reportedTime: "3 Days Ago, 08:30 PM",
    resolvedTime: "Safely Traced in 55 Minutes",
    aadhaarVerified: true,
    policeFIR: "FIR #312/2026",
    policeStation: "Madhapur Police Station",
    investigatingOfficer: "Insp. K. Sridhar Reddy",
    clothing: "Grey sports hoodie, blue denim jeans, black gym bag",
    description: "Software trainee delayed due to sudden battery failure and unexpected route diversion. Located safely at Cyber Towers transit junction.",
    physicalTraits: {
      gender: "Male",
      height: "5' 11\"",
      complexion: "Fair",
      clothing: "Grey sports hoodie, blue denim jeans, black gym bag",
      distinguishingMarks: "Clean shaven, black sporty wristwatch"
    },
    geoRadiusKm: 5,
    alertsDispatched: 31200,
    sightingsCount: 2,
    aiMatchConfidence: 95,
    reunitedStory: "Metro security personnel received the broadcast photo and assisted Devendra in contacting his family.",
    timeline: [
      { time: "08:00 PM", title: "Phone Inaccessible", desc: "Battery died near metro concourse.", icon: "MapPin" },
      { time: "08:30 PM", title: "Alert Dispatched", desc: "Report registered by roommate.", icon: "Radio" },
      { time: "09:25 PM", title: "Reunited", desc: "Traced by Metro transit guards.", icon: "HeartHandshake" }
    ],
    sightings: []
  },

  // 6. VIKRAMADITYA PATEL (MAN - 36y MALE - CRITICAL ALERT)
  {
    id: "GOH-2026-0868",
    name: "Vikramaditya Patel",
    age: 36,
    gender: "Male",
    category: "MAN",
    status: "CRITICAL_ALERT",
    urgencyLevel: "HIGH_RED",
    priorityLabel: "Critical Priority",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    lastSeenLocation: "Sabarmati Riverfront Promenade near Ellis Bridge",
    city: "Ahmedabad",
    state: "Gujarat",
    coordinates: [23.0225, 72.5714],
    lastSeenTime: "4 hours ago (Today, 05:10 PM)",
    reportedTime: "Today, 06:30 PM",
    aadhaarVerified: true,
    policeFIR: "FIR #6621/2026",
    policeStation: "Riverfront West Police Station",
    investigatingOfficer: "Insp. Harshad Dave (+91 98250-99412)",
    clothing: "Olive green polo t-shirt, beige cargo trousers, brown hiking shoes",
    description: "Civil structural engineer. Missing after evening site survey along riverfront promenade. Left company vehicle parked near Flower Park.",
    physicalTraits: {
      gender: "Male",
      height: "5' 10\"",
      complexion: "Wheatish",
      clothing: "Olive green polo t-shirt, beige cargo trousers, brown hiking shoes",
      distinguishingMarks: "Neat trimmed beard, black fitness smart band on left wrist"
    },
    geoRadiusKm: 10,
    alertsDispatched: 58400,
    sightingsCount: 2,
    aiMatchConfidence: 88,
    timeline: [
      { time: "05:10 PM", title: "Promenade CCTV Log", desc: "CCTV recorded walking towards south plaza.", icon: "MapPin" },
      { time: "06:30 PM", title: "Family Alert Logged", desc: "Registered via Guardians portal.", icon: "FileText" }
    ],
    sightings: []
  },

  // 7. SMT. KAMALA DEVI (SENIOR - 72y FEMALE - MEDICAL URGENCY)
  {
    id: "GOH-2026-0862",
    name: "Smt. Kamala Devi",
    age: 72,
    gender: "Female",
    category: "SENIOR",
    status: "CRITICAL_ALERT",
    urgencyLevel: "HIGH_RED",
    priorityLabel: "Critical Priority",
    photo: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&auto=format&fit=crop&q=80",
    lastSeenLocation: "Dashashwamedh Ghat Steps near Kashi Corridor",
    city: "Varanasi",
    state: "Uttar Pradesh",
    coordinates: [25.3076, 83.0107],
    lastSeenTime: "3 hours ago (Today, 06:00 PM)",
    reportedTime: "Today, 06:45 PM",
    aadhaarVerified: true,
    policeFIR: "FIR #1089/2026",
    policeStation: "Dashashwamedh Police Station",
    investigatingOfficer: "Sub-Insp. Alok Tripathi (+91 94500-66781)",
    clothing: "Traditional maroon cotton saree with saffron border, beige woolen shawl, brown spectacles",
    description: "Severe diabetes and early memory loss. Separated from family group after evening Aarti. Speaks Hindi and Bhojpuri. Urgently requires insulin.",
    physicalTraits: {
      gender: "Female",
      height: "5' 2\"",
      complexion: "Wheatish",
      clothing: "Traditional maroon cotton saree with saffron border, beige woolen shawl, brown spectacles",
      distinguishingMarks: "Silver bangles on both wrists, medical emergency tag in blouse pocket"
    },
    geoRadiusKm: 6,
    alertsDispatched: 41200,
    sightingsCount: 4,
    aiMatchConfidence: 92,
    timeline: [
      { time: "06:00 PM", title: "Separated at Ghat", desc: "Crowd surge separated from daughter near steps.", icon: "MapPin" },
      { time: "06:45 PM", title: "FIR Registered", desc: "Aadhaar e-KYC verified emergency broadcast.", icon: "ShieldCheck" }
    ],
    sightings: []
  },

  // 8. PRIYANKA NAIR (WOMAN - 28y FEMALE - TECH PROFESSIONAL)
  {
    id: "GOH-2026-0875",
    name: "Priyanka Nair",
    age: 28,
    gender: "Female",
    category: "WOMAN",
    status: "CRITICAL_ALERT",
    urgencyLevel: "HIGH_RED",
    priorityLabel: "Critical Priority",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    lastSeenLocation: "Electronic City Phase 1 Bus Depot, Hosur Road",
    city: "Bengaluru",
    state: "Karnataka",
    coordinates: [12.8452, 77.6602],
    lastSeenTime: "5 hours ago (Today, 04:30 PM)",
    reportedTime: "Today, 06:00 PM",
    aadhaarVerified: true,
    policeFIR: "FIR #8842/2026",
    policeStation: "Electronic City Police Station",
    investigatingOfficer: "Sub-Insp. Vinod Kumar (+91 94490-55112)",
    clothing: "Formal navy blue shirt, black trousers, black spectacles",
    description: "Software engineer at tech park. Did not reach shared cab pickup point. Phone switched off near Silk Board flyover.",
    physicalTraits: {
      gender: "Female",
      height: "5' 6\"",
      complexion: "Fair",
      clothing: "Formal navy blue shirt, black trousers, black spectacles",
      distinguishingMarks: "Silver wristwatch on left hand, corporate lanyard"
    },
    geoRadiusKm: 12,
    alertsDispatched: 64200,
    sightingsCount: 3,
    aiMatchConfidence: 89,
    timeline: [
      { time: "04:30 PM", title: "Left Tech Park", desc: "Swipe-out recorded at campus turnstile.", icon: "MapPin" },
      { time: "06:00 PM", title: "Family Alert", desc: "Emergency SOS broadcast activated.", icon: "Radio" }
    ],
    sightings: []
  }
];

export const LIVE_ACTIVITY_STREAM = [
  { id: 1, text: "High-priority geo-alert broadcasted for Aarav Sharma near India Gate Circle (5.5km radius)", time: "Just now", type: "alert" },
  { id: 2, text: "AI Facial Recognition match: 93% similarity flagged on Tilak Marg Traffic Cam #12", time: "2 mins ago", type: "ai" },
  { id: 3, text: "Police verification approved for Case #GOH-2026-0449 by Insp. Mehra", time: "4 mins ago", type: "police" },
  { id: 4, text: "Eyewitness sighting submitted by commuter near National Stadium Gate #2", time: "7 mins ago", type: "sighting" },
  { id: 5, text: "Reunited: Priya Mukherjee (9y) safely recovered in Kolkata after 40-minute search", time: "Yesterday", type: "success" },
  { id: 6, text: "Offline Cell Broadcast SMS delivered to 42,800 devices across Central Delhi", time: "14 mins ago", type: "system" }
];

export const SUCCESS_STORIES = [
  {
    id: "WB-2026-0451",
    caseNumber: "Case #WB-2026-0451 Closed",
    name: "Priya Mukherjee",
    age: 9,
    gender: "Female",
    city: "Kolkata, WB",
    location: "New Market, Esplanade",
    timeToFind: "40 Minutes",
    nearbyAlerts: "9,400 Nearby Alerts",
    date: "October 14, 2026",
    image: "/images/family_reunion.png",
    headline: "“Without Guardians of Humanity, we would still be crying outside the metro.”",
    story: "“Our 9-year-old Priya slipped away in the festive market crowd. We were paralyzed with fear. Within two minutes of filing the Aadhaar report on our phone, police verified it and every merchant's phone in the block buzzed. A tea stall owner spotted her 18 minutes later holding a pillar.”",
    attribution: "Subhash & Meera Mukherjee",
    attributionTitle: "Parents of Priya · Recovered safely on Oct 14, 2026",
    badge: "Family joyfully reunited"
  },
  {
    id: "MH-GRP-982",
    caseNumber: "MH-GRP-982",
    name: "Shri Vasant Kulkarni",
    age: 78,
    gender: "Male",
    city: "Kalyan Junction, Mumbai",
    location: "Central Railway Corridor",
    timeToFind: "1 Hour 15 Mins",
    nearbyAlerts: "1,200 Railway Conductors Alerted",
    date: "November 2026",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    headline: "Dementia Patient Located at Kalyan Junction",
    story: "A 78-year-old grandfather took a train by accident. The Guardians system triggered an automated SMS broadcast to 1,200 local train conductors and ticket collectors. A ticket checker recognized his photo within an hour.",
    attribution: "Reported by: Dr. Rohan Kulkarni (Son)",
    attributionTitle: "Central Railway Response",
    badge: "Verified Safe Reunion"
  },
  {
    id: "DL-POL-104",
    caseNumber: "DL-POL-104",
    name: "Sameer Devi",
    age: 12,
    gender: "Male",
    city: "North Delhi",
    location: "DTC Transit Corridor",
    timeToFind: "2 Hours 40 Mins",
    nearbyAlerts: "28,000 Transit Drivers Alerted",
    date: "December 2026",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80",
    headline: "School Student Reunited after Bus Detour",
    story: "A 12-year-old student boarded the wrong private transit shuttle in North Delhi. The geo-fence alerted DTC bus drivers and auto rickshaw unions. An e-rickshaw driver recognized the uniform badge and guided him to the police beat box.",
    attribution: "Reported by: Sarita Devi (Mother)",
    attributionTitle: "Delhi Police PCR 14",
    badge: "Verified Safe Reunion"
  }
];

export const SYSTEM_STATS = {
  activeCases: 142,
  peopleFound: 3894,
  alertsSent: "1,482,900+",
  avgResponseTime: "11.4 min",
  policeStationsConnected: 742,
  volunteerGuardians: "128,450+"
};
