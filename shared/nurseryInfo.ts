export const NURSERY_INFO = {
  name: "Little Ava Nursery",
  tagline: "Where Little Minds Grow Big",
  description: "A warm, nurturing environment where children aged 3 months to 5 years can learn, play, and thrive.",
  location: "West Midlands, England",
  address: "Address coming soon",
  phone: "+44 7386 096634",
  whatsapp: "+447386096634",
  email: "info@littleavanursery.co.uk",
  website: "littleavanursery.co.uk",
  companyNumber: "17116408",
  logo: "/logo.png",
  ageRange: "3 months to 5 years",
  capacity: "15-20 children",
  rooms: [
    {
      name: "Baby Room",
      ageRange: "3-12 months",
      ratio: "1:3",
      color: "#E8D5E0",
      description: "A gentle, sensory-rich environment for our youngest learners."
    },
    {
      name: "Toddler Room",
      ageRange: "1-2 years",
      ratio: "1:3",
      color: "#D5E8D5",
      description: "An active space encouraging exploration and early independence."
    },
    {
      name: "Pre-School Room",
      ageRange: "2-3 years",
      ratio: "1:4",
      color: "#D5E0E8",
      description: "Building confidence and social skills through structured play."
    },
    {
      name: "School Readiness Room",
      ageRange: "3-5 years",
      ratio: "1:8",
      color: "#E8E5D5",
      description: "Preparing children for their exciting journey into school."
    }
  ],
  openingHours: {
    weekdays: "7:30 AM - 6:00 PM",
    saturday: "Closed",
    sunday: "Closed"
  },
  sessionTypes: [
    { name: "Full Day", time: "7:30 AM - 6:00 PM" },
    { name: "Morning Session", time: "7:30 AM - 1:00 PM" },
    { name: "Afternoon Session", time: "1:00 PM - 6:00 PM" }
  ]
} as const;
