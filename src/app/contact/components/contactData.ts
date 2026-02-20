import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiLinkedinFill,
  RiTwitterFill,
  RiFacebookFill,
  RiInstagramLine,
} from "react-icons/ri";

// Philippine Regions, Provinces, and Cities
// Data based on PhilAtlas (https://www.philatlas.com/)
export const philippineRegions: Record<string, Record<string, string[]>> = {
  "National Capital Region (NCR)": {
    "Metro Manila": [
      "Manila", "Quezon City", "Caloocan", "Las Piñas", "Makati", "Malabon", "Mandaluyong",
      "Marikina", "Muntinlupa", "Navotas", "Parañaque", "Pasay", "Pasig", "Pateros", "San Juan", "Taguig", "Valenzuela"
    ]
  },
  "Cordillera Administrative Region (CAR)": {
    "Abra": ["Bangued", "Boliney", "Bucay", "Dolores", "La Paz"],
    "Apayao": ["Kabugao", "Luna", "Pudtol", "Calanasan", "Conner"],
    "Benguet": ["Baguio", "La Trinidad", "Itogon", "Mankayan", "Buguias"],
    "Ifugao": ["Lagawe", "Banaue", "Kiangan", "Hungduan", "Mayoyao"],
    "Kalinga": ["Tabuk", "Rizal", "Pinukpuk", "Balbalan", "Lubuagan"],
    "Mountain Province": ["Bontoc", "Barlig", "Bauko", "Besao", "Natonin"]
  },
  "Ilocos Region (Region I)": {
    "Ilocos Norte": ["Laoag", "Batac", "Pagudpud", "San Nicolas", "Vintar"],
    "Ilocos Sur": ["Vigan", "Candon", "Narvacan", "Santa", "Santiago"],
    "La Union": ["San Fernando", "Bauang", "Agoo", "Aringay", "Bacnotan"],
    "Pangasinan": ["Dagupan", "Urdaneta", "Alaminos", "San Carlos", "Lingayen", "Mangaldan", "Calasiao"]
  },
  "Cagayan Valley (Region II)": {
    "Batanes": ["Basco", "Mahatao", "Ivana", "Uyugan", "Sabtang"],
    "Cagayan": ["Tuguegarao", "Aparri", "Gonzaga", "Ilagan", "Santiago"],
    "Isabela": ["Ilagan", "Santiago", "Cauayan", "Roxas", "Alicia", "Echague"],
    "Nueva Vizcaya": ["Bayombong", "Solano", "Bambang", "Diadi", "Villaverde"],
    "Quirino": ["Cabarroguis", "Maddela", "Diffun", "Saguday", "Nagtipunan"]
  },
  "Central Luzon (Region III)": {
    "Aurora": ["Baler", "Maria Aurora", "Dipaculao", "Dingalan", "San Luis"],
    "Bataan": ["Balanga", "Mariveles", "Orani", "Dinalupihan", "Limay"],
    "Bulacan": ["Malolos", "Meycauayan", "Baliuag", "San Jose del Monte", "Marilao", "Santa Maria", "Plaridel"],
    "Nueva Ecija": ["Cabanatuan", "Gapan", "Muñoz", "Palayan", "San Jose", "Talavera", "Guimba"],
    "Pampanga": ["Angeles", "San Fernando", "Mabalacat", "Mexico", "Apalit", "Arayat", "Bacolor"],
    "Tarlac": ["Tarlac", "Concepcion", "Capas", "Paniqui", "Camiling", "Gerona"],
    "Zambales": ["Olongapo", "Iba", "Subic", "Castillejos", "San Marcelino", "Botolan"]
  },
  "CALABARZON (Region IV-A)": {
    "Batangas": ["Batangas", "Lipa", "Tanauan", "Calaca", "Lemery", "Nasugbu", "Bauan"],
    "Cavite": ["Cavite", "Dasmariñas", "Tagaytay", "Imus", "Bacoor", "General Trias", "Silang"],
    "Laguna": ["Calamba", "San Pablo", "Santa Rosa", "Los Baños", "Biñan", "San Pedro", "Cabuyao"],
    "Quezon": ["Lucena", "Tayabas", "Gumaca", "Infanta", "Sariaya", "Candelaria", "Tiaong"],
    "Rizal": ["Antipolo", "Cainta", "Taytay", "Angono", "Binangonan", "San Mateo", "Rodriguez"]
  },
  "MIMAROPA Region": {
    "Marinduque": ["Boac", "Gasan", "Mogpog", "Santa Cruz", "Torrijos", "Buenavista"],
    "Occidental Mindoro": ["Mamburao", "San Jose", "Sablayan", "Calintaan", "Rizal"],
    "Oriental Mindoro": ["Calapan", "Roxas", "Pinamalayan", "Bongabong", "Bansud", "Gloria"],
    "Palawan": ["Puerto Princesa", "Coron", "El Nido", "Roxas", "Taytay", "Brooke's Point"],
    "Romblon": ["Romblon", "Odiongan", "San Fernando", "San Agustin", "Looc", "Santa Fe"]
  },
  "Bicol Region (Region V)": {
    "Albay": ["Legazpi", "Tabaco", "Ligao", "Daraga", "Guinobatan", "Camalig", "Polangui"],
    "Camarines Norte": ["Daet", "Labo", "Basud", "Jose Panganiban", "Paracale", "Mercedes"],
    "Camarines Sur": ["Naga", "Iriga", "Pili", "Calabanga", "Sipocot", "Libmanan", "Canaman"],
    "Catanduanes": ["Virac", "San Andres", "Bato", "Baras", "Caramoran", "Pandan"],
    "Masbate": ["Masbate", "Mobo", "Aroroy", "Cataingan", "Placer", "Milagros"],
    "Sorsogon": ["Sorsogon", "Bulan", "Gubat", "Irosin", "Juban", "Magallanes", "Pilar"]
  },
  "Western Visayas (Region VI)": {
    "Aklan": ["Kalibo", "Banga", "New Washington", "Buruanga", "Ibajay", "Makato"],
    "Antique": ["San Jose de Buenavista", "Culasi", "Tibiao", "Hamtic", "Sibalom", "Patnongon"],
    "Capiz": ["Roxas", "Dao", "Pilar", "Panay", "Sigma", "Mambusao", "Sapian"],
    "Guimaras": ["Jordan", "Buenavista", "Nueva Valencia", "San Lorenzo", "Sibunag"],
    "Iloilo": ["Iloilo", "Passi", "Oton", "Dingle", "Dumangas", "Pavia", "Santa Barbara"]
  },
  "Central Visayas (Region VII)": {
    "Bohol": ["Tagbilaran", "Jagna", "Tubigon", "Carmen", "Dauis", "Panglao", "Corella"],
    "Cebu": ["Cebu", "Lapu-Lapu", "Mandaue", "Talisay", "Toledo", "Danao", "Carcar", "Naga"]
  },
  "Eastern Visayas (Region VIII)": {
    "Biliran": ["Naval", "Almeria", "Biliran", "Cabucgayan", "Caibiran", "Culaba"],
    "Eastern Samar": ["Borongan", "Guiuan", "Dolores", "Maydolong", "Quinapondan", "Salcedo"],
    "Leyte": ["Tacloban", "Ormoc", "Baybay", "Maasin", "Calubian", "Carigara"],
    "Northern Samar": ["Catarman", "Laoang", "Allen", "Bobon", "Lavezares", "Rosario"],
    "Samar": ["Calbayog", "Catbalogan", "Basey", "Gandara", "Paranas", "Tarangnan"],
    "Southern Leyte": ["Maasin", "Sogod", "Hinunangan", "Malitbog", "Bontoc", "Liloan"]
  },
  "Zamboanga Peninsula (Region IX)": {
    "Zamboanga del Norte": ["Dipolog", "Dapitan", "Polanco", "Roxas", "Sindangan", "Manukan"],
    "Zamboanga del Sur": ["Pagadian", "Zamboanga", "Aurora", "Bayog", "Dimataling", "Dinas"],
    "Zamboanga Sibugay": ["Ipil", "Kabasalan", "Naga", "Roseller Lim", "Siay", "Titay"]
  },
  "Northern Mindanao (Region X)": {
    "Bukidnon": ["Malaybalay", "Valencia", "Manolo Fortich", "Maramag", "Don Carlos", "Kibawe"],
    "Camiguin": ["Mambajao", "Mahinog", "Guinsiliban", "Sagay", "Catarman"],
    "Lanao del Norte": ["Iligan", "Tubod", "Baroy", "Kapatagan", "Lala", "Sultan Naga Dimaporo"],
    "Misamis Occidental": ["Oroquieta", "Ozamiz", "Tangub", "Calamba", "Clarin", "Jimenez"],
    "Misamis Oriental": ["Cagayan de Oro", "Gingoog", "El Salvador", "Initao", "Laguindingan", "Manticao"]
  },
  "Davao Region (Region XI)": {
    "Davao de Oro": ["Nabunturan", "Monkayo", "Mawab", "Maco", "Mabini", "Compostela"],
    "Davao del Norte": ["Tagum", "Panabo", "Island Garden City of Samal", "Carmen", "Kapalong", "New Corella"],
    "Davao del Sur": ["Davao", "Digos", "Santa Cruz", "Bansalan", "Hagonoy", "Malalag"],
    "Davao Occidental": ["Malita", "Santa Maria", "Don Marcelino", "Jose Abad Santos", "Sarangani"],
    "Davao Oriental": ["Mati", "Tagum", "Lupon", "Banaybanay", "Caraga", "Manay"]
  },
  "SOCCSKSARGEN (Region XII)": {
    "Cotabato": ["Kidapawan", "Koronadal", "Tacurong", "Midsayap", "Kabacan", "Isulan"],
    "Sarangani": ["Alabel", "Glan", "Malapatan", "Maasim", "Maitum", "Malungon"],
    "South Cotabato": ["Koronadal", "General Santos", "Polomolok", "Tupi", "Tantangan", "Tampakan"],
    "Sultan Kudarat": ["Isulan", "Tacurong", "Lutayan", "Bagumbayan", "Esperanza", "Lambayong"]
  },
  "Caraga Region (Region XIII)": {
    "Agusan del Norte": ["Butuan", "Cabadbaran", "Nasipit", "Carmen", "Magallanes", "Tubay"],
    "Agusan del Sur": ["Prosperidad", "Bayugan", "San Francisco", "Bunawan", "Esperanza", "La Paz"],
    "Dinagat Islands": ["San Jose", "Basilisa", "Cagdianao", "Dinagat", "Libjo", "Loreto"],
    "Surigao del Norte": ["Surigao", "Dapa", "General Luna", "San Benito", "Sison", "Tagana-an"],
    "Surigao del Sur": ["Tandag", "Bislig", "Lianga", "Lingig", "Marihatag", "San Agustin"]
  },
  "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)": {
    "Basilan": ["Isabela", "Lamitan", "Maluso", "Sumisip", "Tipo-Tipo", "Tuburan"],
    "Lanao del Sur": ["Marawi", "Malabang", "Wao", "Balabagan", "Bumbaran", "Calanogas"],
    "Maguindanao": ["Cotabato", "Shariff Aguak", "Datu Odin Sinsuat", "Buluan", "Datu Paglas", "Sultan Kudarat"],
    "Sulu": ["Jolo", "Indanan", "Maimbung", "Parang", "Patikul", "Talipao"],
    "Tawi-Tawi": ["Bongao", "Panglima Sugala", "Sapa-Sapa", "Simunul", "Sitangkai", "Tandubas"]
  }
};

export const interestOptions = [
  { value: "", label: "Select Interest" },
  // Products
  { value: "ev-charging-station", label: "EV Charging Station" },
  { value: "solar-street-lights", label: "Solar Street Lights" },
  { value: "smart-home-ips", label: "Smart Home IPS" },
  { value: "cabinet-type-power-supply", label: "Power Supplies" },
  { value: "container-type-power-supply", label: "Container Type Power Supply" },
  // Services - EV Charging
  { value: "ev-charging-installation", label: "EV Charging Installation" },
  { value: "ev-charging-quote", label: "EV Charging Quote" },
  { value: "ac-charger-installation", label: "AC Charger Installation (7kW)" },
  { value: "dc-fast-charger-installation", label: "DC Fast Charger Installation (60-400kW)" },
  // Services - Solar Installation
  { value: "solar-energy-installation", label: "Solar Energy Installation" },
  { value: "solar-installation-quote", label: "Solar Installation Quote" },
  { value: "street-light-installation", label: "Street Light Installation" },
  { value: "solar-street-light-quote", label: "Solar Street Light Quote" },
  { value: "off-grid-power-generation", label: "Off-Grid Power Generation System" },
  { value: "energy-storage-installation", label: "Energy Storage Installation" },
  // Sector-Specific
  { value: "residential-solutions", label: "Residential Solutions" },
  { value: "commercial-solutions", label: "Commercial Solutions" },
  { value: "industrial-solutions", label: "Industrial Solutions" },
  { value: "rural-projects", label: "Rural Projects" },
  // General
  { value: "general-inquiry", label: "General Inquiry" },
  { value: "technical-support", label: "Technical Support" },
  { value: "maintenance-service", label: "Maintenance Service" },
];

export const contactInfo = [
  {
    icon: RiPhoneLine,
    title: "Phone",
    detail: "+63 9682323704",
    link: "tel:+639682323704",
  },
  {
    icon: RiMailLine,
    title: "Email",
    detail: "admin@volthub.ph",
    link: "mailto:admin@volthub.ph",
  },
  {
    icon: RiMapPinLine,
    title: "Address",
    detail: "High Street South Corporate Plaza Tower 2, 11th Ave",
    detail2: "Bonifacio Global City, Taguig",
    detail3: "Philippines",
  },
];

export const socialIcons = [
  { icon: RiLinkedinFill, href: "https://linkedin.com", label: "Visit VoltHub on LinkedIn" },
  { icon: RiTwitterFill, href: "https://twitter.com", label: "Visit VoltHub on Twitter" },
  { icon: RiFacebookFill, href: "https://facebook.com", label: "Visit VoltHub on Facebook" },
  { icon: RiInstagramLine, href: "https://instagram.com", label: "Visit VoltHub on Instagram" },
];
