// src/lib/location/location-context.ts — Pan-India Canonical Location Context, District Directory & Conflict Guard

export interface IndiaLocationContext {
  country: "India";
  stateCode: string;
  stateName: string;
  unionTerritory: boolean;
  district?: string;
  pinCode?: string;
  city?: string;
  locality?: string;
  localBodyType?: "MUNICIPAL_CORPORATION" | "MUNICIPALITY" | "TOWN_PANCHAYAT" | "GRAM_PANCHAYAT" | "DISTRICT_ADMINISTRATION" | "OTHER";
  localBodyName?: string;
  ward?: string;
  addressOptional?: string;
  resolutionSource: "CITIZEN_SELECTED" | "PIN_GROUNDED" | "DISTRICT_CONFIRMED" | "FALLBACK";
  conflictStatus?: "OK" | "LOCATION_CONFIRMATION_REQUIRED";
  conflictMessage?: string;
}

export interface StateUtMetadata {
  code: string;
  name: string;
  unionTerritory: boolean;
  capital: string;
  officialLanguages: string[];
  highCourtJurisdiction: string;
  districts: string[];
}

export const ALL_STATES_AND_UTS: StateUtMetadata[] = [
  // 28 States
  {
    code: "AP",
    name: "Andhra Pradesh",
    unionTerritory: false,
    capital: "Amaravati",
    officialLanguages: ["te-IN", "en-IN"],
    highCourtJurisdiction: "High Court of Andhra Pradesh",
    districts: ["Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", "Kakinada", "Krishna", "Kurnool", "Nandyal", "NTR", "Palnadu", "Parvathipuram Manyam", "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Sri Sathya Sai", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  },
  {
    code: "AR",
    name: "Arunachal Pradesh",
    unionTerritory: false,
    capital: "Itanagar",
    officialLanguages: ["en-IN"],
    highCourtJurisdiction: "Gauhati High Court",
    districts: ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Itanagar Capital Complex"],
  },
  {
    code: "AS",
    name: "Assam",
    unionTerritory: false,
    capital: "Dispur",
    officialLanguages: ["as-IN", "bn-IN", "en-IN"],
    highCourtJurisdiction: "Gauhati High Court",
    districts: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  },
  {
    code: "BR",
    name: "Bihar",
    unionTerritory: false,
    capital: "Patna",
    officialLanguages: ["hi-IN", "ur-IN"],
    highCourtJurisdiction: "Patna High Court",
    districts: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  },
  {
    code: "CG",
    name: "Chhattisgarh",
    unionTerritory: false,
    capital: "Raipur",
    officialLanguages: ["hi-IN"],
    highCourtJurisdiction: "Chhattisgarh High Court",
    districts: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur", "Mohla-Manpur-Ambagarh Chowki", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sarangarh-Bilaigarh", "Sakti", "Sukma", "Surajpur", "Surguja", "Khairagarh-Chhuikhadan-Gandai"],
  },
  {
    code: "GA",
    name: "Goa",
    unionTerritory: false,
    capital: "Panaji",
    officialLanguages: ["kok-IN", "mr-IN", "en-IN"],
    highCourtJurisdiction: "Bombay High Court",
    districts: ["North Goa", "South Goa"],
  },
  {
    code: "GJ",
    name: "Gujarat",
    unionTerritory: false,
    capital: "Gandhinagar",
    officialLanguages: ["gu-IN", "hi-IN"],
    highCourtJurisdiction: "Gujarat High Court",
    districts: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  },
  {
    code: "HR",
    name: "Haryana",
    unionTerritory: false,
    capital: "Chandigarh",
    officialLanguages: ["hi-IN", "pa-IN"],
    highCourtJurisdiction: "Punjab and Haryana High Court",
    districts: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  },
  {
    code: "HP",
    name: "Himachal Pradesh",
    unionTerritory: false,
    capital: "Shimla",
    officialLanguages: ["hi-IN"],
    highCourtJurisdiction: "Himachal Pradesh High Court",
    districts: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  },
  {
    code: "JH",
    name: "Jharkhand",
    unionTerritory: false,
    capital: "Ranchi",
    officialLanguages: ["hi-IN", "sat-IN"],
    highCourtJurisdiction: "Jharkhand High Court",
    districts: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  },
  {
    code: "KA",
    name: "Karnataka",
    unionTerritory: false,
    capital: "Bengaluru",
    officialLanguages: ["kn-IN", "en-IN"],
    highCourtJurisdiction: "High Court of Karnataka",
    districts: ["Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagara", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayanagara", "Vijayapura", "Yadgir"],
  },
  {
    code: "KL",
    name: "Kerala",
    unionTerritory: false,
    capital: "Thiruvananthapuram",
    officialLanguages: ["ml-IN", "en-IN"],
    highCourtJurisdiction: "High Court of Kerala",
    districts: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  },
  {
    code: "MP",
    name: "Madhya Pradesh",
    unionTerritory: false,
    capital: "Bhopal",
    officialLanguages: ["hi-IN"],
    highCourtJurisdiction: "Madhya Pradesh High Court",
    districts: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Maihar", "Mandla", "Mandsaur", "Morena", "Mauganj", "Narsinghpur", "Neemuch", "Niwari", "Pandhurna", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  },
  {
    code: "MH",
    name: "Maharashtra",
    unionTerritory: false,
    capital: "Mumbai",
    officialLanguages: ["mr-IN", "en-IN"],
    highCourtJurisdiction: "Bombay High Court",
    districts: ["Ahmednagar", "Akola", "Amravati", "Chhatrapati Sambhajinagar", "Bhandara", "Beed", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Dharashiv", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  },
  {
    code: "MN",
    name: "Manipur",
    unionTerritory: false,
    capital: "Imphal",
    officialLanguages: ["mni-IN", "en-IN"],
    highCourtJurisdiction: "High Court of Manipur",
    districts: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  },
  {
    code: "ML",
    name: "Meghalaya",
    unionTerritory: false,
    capital: "Shillong",
    officialLanguages: ["en-IN"],
    highCourtJurisdiction: "High Court of Meghalaya",
    districts: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Eastern West Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  },
  {
    code: "MZ",
    name: "Mizoram",
    unionTerritory: false,
    capital: "Aizawl",
    officialLanguages: ["en-IN"],
    highCourtJurisdiction: "Gauhati High Court",
    districts: ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saitual", "Serchhip", "Siaha"],
  },
  {
    code: "NL",
    name: "Nagaland",
    unionTerritory: false,
    capital: "Kohima",
    officialLanguages: ["en-IN"],
    highCourtJurisdiction: "Gauhati High Court",
    districts: ["Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tseminyü", "Tuensang", "Wokha", "Zünheboto"],
  },
  {
    code: "OD",
    name: "Odisha",
    unionTerritory: false,
    capital: "Bhubaneswar",
    officialLanguages: ["od-IN", "en-IN"],
    highCourtJurisdiction: "Orissa High Court",
    districts: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
  },
  {
    code: "PB",
    name: "Punjab",
    unionTerritory: false,
    capital: "Chandigarh",
    officialLanguages: ["pa-IN", "en-IN"],
    highCourtJurisdiction: "Punjab and Haryana High Court",
    districts: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
  },
  {
    code: "RJ",
    name: "Rajasthan",
    unionTerritory: false,
    capital: "Jaipur",
    officialLanguages: ["hi-IN"],
    highCourtJurisdiction: "Rajasthan High Court",
    districts: ["Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Deeg", "Dholpur", "Didwana-Kuchaman", "Dudu", "Dungarpur", "Ganganagar", "Gangapur City", "Hanumangarh", "Jaipur", "Jaipur Rural", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Jodhpur Rural", "Karauli", "Kekri", "Khairthal-Tijara", "Kota", "Kotputli-Behror", "Nagaur", "Neem Ka Thana", "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", "Shahpura", "Sikar", "Sirohi", "Tonk", "Udaipur"],
  },
  {
    code: "SK",
    name: "Sikkim",
    unionTerritory: false,
    capital: "Gangtok",
    officialLanguages: ["ne-IN", "en-IN"],
    highCourtJurisdiction: "High Court of Sikkim",
    districts: ["Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng"],
  },
  {
    code: "TN",
    name: "Tamil Nadu",
    unionTerritory: false,
    capital: "Chennai",
    officialLanguages: ["ta-IN", "en-IN"],
    highCourtJurisdiction: "Madras High Court",
    districts: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  },
  {
    code: "TS",
    name: "Telangana",
    unionTerritory: false,
    capital: "Hyderabad",
    officialLanguages: ["te-IN", "ur-IN", "en-IN"],
    highCourtJurisdiction: "High Court for the State of Telangana",
    districts: ["Adilabad", "Bhadradri Kothagudem", "Hanumakonda", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"],
  },
  {
    code: "TR",
    name: "Tripura",
    unionTerritory: false,
    capital: "Agartala",
    officialLanguages: ["bn-IN", "en-IN"],
    highCourtJurisdiction: "High Court of Tripura",
    districts: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  },
  {
    code: "UP",
    name: "Uttar Pradesh",
    unionTerritory: false,
    capital: "Lucknow",
    officialLanguages: ["hi-IN", "ur-IN"],
    highCourtJurisdiction: "Allahabad High Court",
    districts: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  },
  {
    code: "UK",
    name: "Uttarakhand",
    unionTerritory: false,
    capital: "Dehradun",
    officialLanguages: ["hi-IN", "sa-IN"],
    highCourtJurisdiction: "Uttarakhand High Court",
    districts: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  },
  {
    code: "WB",
    name: "West Bengal",
    unionTerritory: false,
    capital: "Kolkata",
    officialLanguages: ["bn-IN", "en-IN", "ne-IN"],
    highCourtJurisdiction: "Calcutta High Court",
    districts: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
  },
  // 8 Union Territories
  {
    code: "AN",
    name: "Andaman and Nicobar Islands",
    unionTerritory: true,
    capital: "Port Blair",
    officialLanguages: ["hi-IN", "en-IN"],
    highCourtJurisdiction: "Calcutta High Court",
    districts: ["Nicobar", "North and Middle Andaman", "South Andaman"],
  },
  {
    code: "CH",
    name: "Chandigarh",
    unionTerritory: true,
    capital: "Chandigarh",
    officialLanguages: ["en-IN", "hi-IN", "pa-IN"],
    highCourtJurisdiction: "Punjab and Haryana High Court",
    districts: ["Chandigarh"],
  },
  {
    code: "DH",
    name: "Dadra and Nagar Haveli and Daman and Diu",
    unionTerritory: true,
    capital: "Daman",
    officialLanguages: ["gu-IN", "mr-IN", "hi-IN"],
    highCourtJurisdiction: "Bombay High Court",
    districts: ["Dadra and Nagar Haveli", "Daman", "Diu"],
  },
  {
    code: "DL",
    name: "Delhi",
    unionTerritory: true,
    capital: "New Delhi",
    officialLanguages: ["hi-IN", "en-IN", "ur-IN", "pa-IN"],
    highCourtJurisdiction: "High Court of Delhi",
    districts: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  },
  {
    code: "JK",
    name: "Jammu and Kashmir",
    unionTerritory: true,
    capital: "Srinagar / Jammu",
    officialLanguages: ["ks-IN", "ur-IN", "doi-IN", "hi-IN", "en-IN"],
    highCourtJurisdiction: "High Court of Jammu & Kashmir and Ladakh",
    districts: ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  },
  {
    code: "LA",
    name: "Ladakh",
    unionTerritory: true,
    capital: "Leh",
    officialLanguages: ["hi-IN", "en-IN"],
    highCourtJurisdiction: "High Court of Jammu & Kashmir and Ladakh",
    districts: ["Kargil", "Leh"],
  },
  {
    code: "LD",
    name: "Lakshadweep",
    unionTerritory: true,
    capital: "Kavaratti",
    officialLanguages: ["ml-IN", "en-IN"],
    highCourtJurisdiction: "High Court of Kerala",
    districts: ["Lakshadweep"],
  },
  {
    code: "PY",
    name: "Puducherry",
    unionTerritory: true,
    capital: "Puducherry",
    officialLanguages: ["ta-IN", "fr-IN", "en-IN"],
    highCourtJurisdiction: "Madras High Court",
    districts: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  },
];

/**
 * Returns the list of verified districts for a given State/UT code.
 */
export function getDistrictsForState(stateCodeOrName: string): string[] {
  const match = ALL_STATES_AND_UTS.find(
    (s) =>
      s.code.toUpperCase() === stateCodeOrName.toUpperCase() ||
      s.name.toLowerCase() === stateCodeOrName.toLowerCase()
  );
  return match ? match.districts : [];
}

/**
 * High-performance Indian PIN prefix mapping dictionary for pan-India conflict guard
 */
const PIN_PREFIX_STATE_MAP: Record<string, string> = {
  "11": "DL", // Delhi
  "12": "HR", // Haryana
  "13": "HR", // Haryana
  "14": "PB", // Punjab
  "15": "PB", // Punjab
  "16": "CH", // Chandigarh / Punjab / Haryana
  "17": "HP", // Himachal Pradesh
  "18": "JK", // Jammu and Kashmir
  "19": "JK", // Jammu and Kashmir
  "20": "UP", // Uttar Pradesh
  "21": "UP", // Uttar Pradesh
  "22": "UP", // Uttar Pradesh
  "23": "UP", // Uttar Pradesh
  "24": "UK", // Uttarakhand / UP
  "25": "UP", // Uttar Pradesh
  "26": "UK", // Uttarakhand / UP
  "27": "UP", // Uttar Pradesh
  "28": "UP", // Uttar Pradesh
  "30": "RJ", // Rajasthan
  "31": "RJ", // Rajasthan
  "32": "RJ", // Rajasthan
  "33": "RJ", // Rajasthan
  "34": "RJ", // Rajasthan
  "36": "GJ", // Gujarat
  "37": "GJ", // Gujarat
  "38": "GJ", // Gujarat
  "39": "GJ", // Gujarat / DH
  "40": "MH", // Maharashtra / Goa
  "41": "MH", // Maharashtra
  "42": "MH", // Maharashtra
  "43": "MH", // Maharashtra
  "44": "MH", // Maharashtra
  "45": "MP", // Madhya Pradesh
  "46": "MP", // Madhya Pradesh
  "47": "MP", // Madhya Pradesh
  "48": "MP", // Madhya Pradesh
  "49": "CG", // Chhattisgarh
  "50": "TS", // Telangana
  "51": "AP", // Andhra Pradesh
  "52": "AP", // Andhra Pradesh
  "53": "AP", // Andhra Pradesh
  "56": "KA", // Karnataka
  "57": "KA", // Karnataka
  "58": "KA", // Karnataka
  "59": "KA", // Karnataka
  "60": "TN", // Tamil Nadu
  "61": "TN", // Tamil Nadu
  "62": "TN", // Tamil Nadu
  "63": "TN", // Tamil Nadu
  "64": "TN", // Tamil Nadu
  "67": "KL", // Kerala
  "68": "KL", // Kerala
  "69": "KL", // Kerala
  "70": "WB", // West Bengal
  "71": "WB", // West Bengal
  "72": "WB", // West Bengal
  "73": "WB", // West Bengal
  "74": "WB", // West Bengal
  "75": "OD", // Odisha
  "76": "OD", // Odisha
  "77": "OD", // Odisha
  "78": "AS", // Assam
  "79": "NE", // North East States
  "80": "BR", // Bihar
  "81": "BR", // Bihar
  "82": "JH", // Jharkhand
  "83": "JH", // Jharkhand
  "84": "BR", // Bihar
  "85": "BR", // Bihar
};

/**
 * Resolves Pan-India location context with active conflict guard and district verification.
 */
export function resolveLocationContext(input: {
  state?: string;
  stateCode?: string;
  district?: string;
  pinCode?: string;
  city?: string;
  locality?: string;
}): IndiaLocationContext {
  const normState = input.state?.trim();
  const normCode = input.stateCode?.trim().toUpperCase();

  const matched = ALL_STATES_AND_UTS.find(
    (s) =>
      (normCode && s.code === normCode) ||
      (normState && s.name.toLowerCase() === normState.toLowerCase()) ||
      (normState && s.code.toLowerCase() === normState.toLowerCase())
  ) || {
    code: "TN",
    name: "Tamil Nadu",
    unionTerritory: false,
    capital: "Chennai",
    officialLanguages: ["ta-IN", "en-IN"],
    highCourtJurisdiction: "Madras High Court",
    districts: ["Coimbatore", "Chennai", "Madurai"],
  };

  const pin = input.pinCode?.trim();
  let conflictStatus: "OK" | "LOCATION_CONFIRMATION_REQUIRED" = "OK";
  let conflictMessage: string | undefined = undefined;

  // Conflict Guard Check: If PIN code first 2 digits conflict with selected state
  if (pin && pin.length === 6 && /^\d{6}$/.test(pin)) {
    const prefix = pin.substring(0, 2);
    const expectedStateCode = PIN_PREFIX_STATE_MAP[prefix];
    if (expectedStateCode && expectedStateCode !== "NE" && expectedStateCode !== matched.code) {
      // Special edge cases where prefixes overlap (e.g. 16 Chandigarh/Punjab/Haryana, 40 Goa/Maharashtra, 39 DH/Gujarat)
      const isSharedPrefix = (prefix === "16" && ["CH", "PB", "HR"].includes(matched.code)) ||
                            (prefix === "40" && ["MH", "GA"].includes(matched.code)) ||
                            (prefix === "39" && ["GJ", "DH"].includes(matched.code)) ||
                            (prefix === "24" && ["UK", "UP"].includes(matched.code)) ||
                            (prefix === "26" && ["UK", "UP"].includes(matched.code));
      if (!isSharedPrefix) {
        conflictStatus = "LOCATION_CONFIRMATION_REQUIRED";
        const expectedStateName = ALL_STATES_AND_UTS.find((s) => s.code === expectedStateCode)?.name || expectedStateCode;
        conflictMessage = `Your selected State (${matched.name}) and PIN code (${pin} — typically ${expectedStateName}) do not match. Please confirm your location.`;
      }
    }
  }

  return {
    country: "India",
    stateCode: matched.code,
    stateName: matched.name,
    unionTerritory: matched.unionTerritory,
    district: input.district?.trim(),
    pinCode: pin,
    city: input.city?.trim(),
    locality: input.locality?.trim(),
    resolutionSource: input.pinCode ? "PIN_GROUNDED" : input.district ? "DISTRICT_CONFIRMED" : "CITIZEN_SELECTED",
    conflictStatus,
    conflictMessage,
  };
}
