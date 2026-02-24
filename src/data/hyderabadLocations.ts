export interface HydLocation {
  name: string;
  lat: number;
  lon: number;
  category: string;
}

export const hyderabadLocations: HydLocation[] = [
  // Famous Places & Landmarks
  { name: "Charminar", lat: 17.3616, lon: 78.4747, category: "Landmark" },
  { name: "Golconda Fort", lat: 17.3833, lon: 78.4011, category: "Landmark" },
  { name: "Hussain Sagar Lake", lat: 17.4239, lon: 78.4738, category: "Landmark" },
  { name: "Birla Mandir", lat: 17.4063, lon: 78.4691, category: "Temple" },
  { name: "Salar Jung Museum", lat: 17.3713, lon: 78.4804, category: "Landmark" },
  { name: "Ramoji Film City", lat: 17.2543, lon: 78.6808, category: "Landmark" },
  { name: "Snow World", lat: 17.4234, lon: 78.4739, category: "Landmark" },
  { name: "Lumbini Park", lat: 17.4100, lon: 78.4734, category: "Landmark" },
  { name: "NTR Gardens", lat: 17.4087, lon: 78.4725, category: "Landmark" },
  { name: "Shilparamam", lat: 17.4525, lon: 78.3816, category: "Landmark" },
  { name: "Chowmahalla Palace", lat: 17.3576, lon: 78.4718, category: "Landmark" },
  { name: "Qutb Shahi Tombs", lat: 17.3945, lon: 78.3953, category: "Landmark" },
  { name: "Nehru Zoological Park", lat: 17.3500, lon: 78.4513, category: "Landmark" },

  // Temples
  { name: "Chilkur Balaji Temple", lat: 17.3172, lon: 78.3383, category: "Temple" },
  { name: "Jagannath Temple, Hyderabad", lat: 17.3958, lon: 78.3882, category: "Temple" },
  { name: "Peddamma Temple, Jubilee Hills", lat: 17.4318, lon: 78.4115, category: "Temple" },
  { name: "Karmanghat Hanuman Temple", lat: 17.3500, lon: 78.5258, category: "Temple" },
  { name: "Mecca Masjid", lat: 17.3604, lon: 78.4736, category: "Temple" },
  { name: "Sri Rama Temple, Secunderabad", lat: 17.4359, lon: 78.4983, category: "Temple" },
  { name: "ISKCON Temple, Abids", lat: 17.3932, lon: 78.4738, category: "Temple" },
  { name: "Keesaragutta Temple", lat: 17.4203, lon: 78.6281, category: "Temple" },

  // Engineering Colleges — Ghatkesar & Nearby
  { name: "Nalla Narasimha Reddy Engineering College (NNRG), Ghatkesar", lat: 17.4500, lon: 78.6200, category: "Engineering College" },
  { name: "CVR College of Engineering, Ghatkesar", lat: 17.5024, lon: 78.6464, category: "Engineering College" },
  { name: "Anurag University, Ghatkesar", lat: 17.4380, lon: 78.6350, category: "Engineering College" },
  { name: "Geethanjali College of Engineering & Technology, Keesara", lat: 17.4700, lon: 78.6100, category: "Engineering College" },
  { name: "Sreenidhi Institute of Science & Tech (SNIST), Ghatkesar", lat: 17.3734, lon: 78.5800, category: "Engineering College" },
  { name: "Stanley College of Engineering, Keesara", lat: 17.4450, lon: 78.6050, category: "Engineering College" },
  { name: "ACE Engineering College, Ghatkesar", lat: 17.4520, lon: 78.6280, category: "Engineering College" },
  { name: "Sphoorthy Engineering College, Ghatkesar", lat: 17.4600, lon: 78.6150, category: "Engineering College" },
  { name: "Avanthi Institute of Engineering, Ghatkesar", lat: 17.4650, lon: 78.6300, category: "Engineering College" },
  { name: "Narsimha Reddy Engineering College (VNRVJIET Campus), Ghatkesar", lat: 17.4480, lon: 78.6180, category: "Engineering College" },

  // Engineering Colleges — Hyderabad (All Major)
  { name: "IIT Hyderabad, Kandi", lat: 17.5915, lon: 78.1234, category: "Engineering College" },
  { name: "NIT Warangal (Reference)", lat: 17.9842, lon: 79.5300, category: "Engineering College" },
  { name: "JNTU Hyderabad", lat: 17.4933, lon: 78.3918, category: "Engineering College" },
  { name: "Osmania University College of Engineering", lat: 17.4126, lon: 78.5228, category: "Engineering College" },
  { name: "IIIT Hyderabad, Gachibowli", lat: 17.4455, lon: 78.3489, category: "Engineering College" },
  { name: "BITS Pilani Hyderabad Campus", lat: 17.5449, lon: 78.5718, category: "Engineering College" },
  { name: "University of Hyderabad", lat: 17.4604, lon: 78.3340, category: "Engineering College" },
  { name: "CBIT, Gandipet", lat: 17.3500, lon: 78.3194, category: "Engineering College" },
  { name: "Vasavi College of Engineering, Ibrahimbagh", lat: 17.3893, lon: 78.4483, category: "Engineering College" },
  { name: "VNR VJIET, Bachupally", lat: 17.5382, lon: 78.3833, category: "Engineering College" },
  { name: "MVSR Engineering College, Nadergul", lat: 17.3327, lon: 78.5522, category: "Engineering College" },
  { name: "Muffakham Jah College of Engineering", lat: 17.4336, lon: 78.4458, category: "Engineering College" },
  { name: "Gokaraju Rangaraju Institute (GRIET), Bachupally", lat: 17.5157, lon: 78.3674, category: "Engineering College" },
  { name: "BVRIT, Narsapur", lat: 17.5620, lon: 78.3000, category: "Engineering College" },
  { name: "MLR Institute of Technology, Dundigal", lat: 17.5560, lon: 78.3778, category: "Engineering College" },
  { name: "Vardhaman College of Engineering, Shamshabad", lat: 17.5308, lon: 78.2880, category: "Engineering College" },
  { name: "Matrusri Engineering College, Saidabad", lat: 17.3872, lon: 78.5193, category: "Engineering College" },
  { name: "IST (Institute of Science and Technology), Gachibowli", lat: 17.4426, lon: 78.3536, category: "Engineering College" },
  { name: "Mahindra University, Bahadurpally", lat: 17.5850, lon: 78.4100, category: "Engineering College" },
  { name: "CMR College of Engineering, Kandlakoya", lat: 17.5490, lon: 78.4860, category: "Engineering College" },
  { name: "CMR Institute of Technology, Kandlakoya", lat: 17.5510, lon: 78.4880, category: "Engineering College" },
  { name: "CMR Engineering College, Kandlakoya", lat: 17.5530, lon: 78.4900, category: "Engineering College" },
  { name: "JNTUH College of Engineering Sultanpur", lat: 17.5390, lon: 78.3690, category: "Engineering College" },
  { name: "JNTUH College of Engineering Manthani", lat: 18.6500, lon: 79.6600, category: "Engineering College" },
  { name: "Malla Reddy College of Engineering, Secunderabad", lat: 17.5000, lon: 78.5600, category: "Engineering College" },
  { name: "Malla Reddy Engineering College (MREC)", lat: 17.4950, lon: 78.5580, category: "Engineering College" },
  { name: "Malla Reddy Institute of Technology (MRIT)", lat: 17.4970, lon: 78.5620, category: "Engineering College" },
  { name: "Malla Reddy Engineering College for Women", lat: 17.5020, lon: 78.5650, category: "Engineering College" },
  { name: "Guru Nanak Institutions, Ibrahimpatnam", lat: 17.2800, lon: 78.5700, category: "Engineering College" },
  { name: "TKR College of Engineering, Medbowli", lat: 17.3280, lon: 78.5400, category: "Engineering College" },
  { name: "Keshav Memorial Institute of Technology (KMIT)", lat: 17.4850, lon: 78.3740, category: "Engineering College" },
  { name: "Bhoj Reddy Engineering College for Women, Vinay Nagar", lat: 17.3550, lon: 78.5100, category: "Engineering College" },
  { name: "G Narayanamma Institute of Technology (GNITS)", lat: 17.3700, lon: 78.3820, category: "Engineering College" },
  { name: "Maturi Venkata Subba Rao Engineering College (MVSREC)", lat: 17.3330, lon: 78.5520, category: "Engineering College" },
  { name: "Jayamukhi Institute of Tech & Science, Narsampet", lat: 17.9280, lon: 79.8930, category: "Engineering College" },
  { name: "Siddhartha Institute of Technology, Puttur (Reference)", lat: 17.2250, lon: 78.5350, category: "Engineering College" },
  { name: "Nizam Institute of Engineering & Technology (NIET)", lat: 17.3000, lon: 78.5500, category: "Engineering College" },
  { name: "Lords Institute of Engineering and Technology", lat: 17.3650, lon: 78.4700, category: "Engineering College" },
  { name: "Deccan College of Engineering and Technology", lat: 17.3630, lon: 78.4420, category: "Engineering College" },
  { name: "ISL Engineering College, Bandlaguda", lat: 17.3330, lon: 78.3900, category: "Engineering College" },
  { name: "Aurora's Technological and Research Institute", lat: 17.3500, lon: 78.5480, category: "Engineering College" },
  { name: "Vidya Jyothi Institute of Technology (VJIT), Aziz Nagar", lat: 17.3200, lon: 78.5300, category: "Engineering College" },
  { name: "Kommuri Pratap Reddy Institute of Technology (KPRIT)", lat: 17.4560, lon: 78.6400, category: "Engineering College" },
  { name: "Vignan Institute of Technology & Science (VITS), Deshmukhi", lat: 17.4200, lon: 78.6500, category: "Engineering College" },
  { name: "Swami Ramanand Teerth Institute, Nalgonda Rd", lat: 17.3100, lon: 78.6000, category: "Engineering College" },
  { name: "Princeton College of Engineering, Ghatkesar", lat: 17.4550, lon: 78.6250, category: "Engineering College" },
  { name: "Samskruti College of Engineering, Ghatkesar", lat: 17.4420, lon: 78.6320, category: "Engineering College" },
  { name: "Scient Institute of Technology, Ibrahimpatnam", lat: 17.2700, lon: 78.5800, category: "Engineering College" },
  { name: "St. Martin's Engineering College, Kompally", lat: 17.5400, lon: 78.4900, category: "Engineering College" },
  { name: "Pallavi Engineering College, Kompally", lat: 17.5350, lon: 78.4850, category: "Engineering College" },
  { name: "Sree Dattha Institute of Engineering, Sheriguda", lat: 17.2900, lon: 78.5600, category: "Engineering College" },
  { name: "Annamacharya Institute of Technology, Rajampet (Reference)", lat: 14.1800, lon: 79.1600, category: "Engineering College" },
  { name: "Gurunanak Engineering College, Ibrahimpatnam", lat: 17.2850, lon: 78.5650, category: "Engineering College" },
  { name: "KG Reddy College of Engineering, Chilkur", lat: 17.3200, lon: 78.3500, category: "Engineering College" },
  { name: "Hyderabad Institute of Technology (HITAM), Gowdavelly", lat: 17.5100, lon: 78.6000, category: "Engineering College" },
  { name: "Nigama Engineering College, Karim Nagar (Reference)", lat: 18.4386, lon: 79.1289, category: "Engineering College" },

  // Medical Colleges
  { name: "Gandhi Medical College", lat: 17.3819, lon: 78.4744, category: "Medical College" },
  { name: "Osmania Medical College", lat: 17.3762, lon: 78.4830, category: "Medical College" },
  { name: "Deccan College of Medical Sciences", lat: 17.3661, lon: 78.4436, category: "Medical College" },
  { name: "NIMS, Punjagutta", lat: 17.4217, lon: 78.4522, category: "Medical College" },
  { name: "ESIC Medical College", lat: 17.3797, lon: 78.5647, category: "Medical College" },
  { name: "Apollo Medical College", lat: 17.4131, lon: 78.4380, category: "Medical College" },
  { name: "MediCiti Institute", lat: 17.2800, lon: 78.6200, category: "Medical College" },

  // Schools
  { name: "Hyderabad Public School, Begumpet", lat: 17.4425, lon: 78.4614, category: "School" },
  { name: "Chirec International School", lat: 17.4555, lon: 78.3877, category: "School" },
  { name: "Oakridge International School", lat: 17.3736, lon: 78.3477, category: "School" },
  { name: "DPS, Miyapur", lat: 17.4960, lon: 78.3540, category: "School" },
  { name: "Meridian School, Madhapur", lat: 17.4510, lon: 78.3860, category: "School" },
  { name: "Glendale Academy, Bandlaguda", lat: 17.3365, lon: 78.3879, category: "School" },
  { name: "Johnson Grammar School, Habsiguda", lat: 17.4053, lon: 78.5360, category: "School" },
  { name: "St. Ann's High School, Secunderabad", lat: 17.4380, lon: 78.4960, category: "School" },
  { name: "Kendriya Vidyalaya, Picket", lat: 17.4541, lon: 78.5019, category: "School" },
  { name: "Slate The School, Kondapur", lat: 17.4600, lon: 78.3700, category: "School" },

  // Restaurants & Food Areas
  { name: "Paradise Restaurant, Secunderabad", lat: 17.4399, lon: 78.4983, category: "Restaurant" },
  { name: "Bawarchi Restaurant, RTC X Roads", lat: 17.4037, lon: 78.4906, category: "Restaurant" },
  { name: "Shah Ghouse, Tolichowki", lat: 17.3958, lon: 78.4160, category: "Restaurant" },
  { name: "Chutneys, Banjara Hills", lat: 17.4152, lon: 78.4367, category: "Restaurant" },
  { name: "Ohri's, Banjara Hills", lat: 17.4154, lon: 78.4480, category: "Restaurant" },
  { name: "Pista House, Charminar", lat: 17.3616, lon: 78.4747, category: "Restaurant" },
  { name: "Cafe Bahar, Basheerbagh", lat: 17.3989, lon: 78.4749, category: "Restaurant" },
  { name: "Minerva Coffee Shop, Himayatnagar", lat: 17.4011, lon: 78.4880, category: "Restaurant" },
  { name: "10 Downing Street, Begumpet", lat: 17.4425, lon: 78.4650, category: "Restaurant" },
  { name: "AB's, Jubilee Hills", lat: 17.4294, lon: 78.4050, category: "Restaurant" },

  // IT & Business Hubs
  { name: "Hitech City", lat: 17.4435, lon: 78.3772, category: "IT Hub" },
  { name: "Gachibowli", lat: 17.4400, lon: 78.3489, category: "IT Hub" },
  { name: "Madhapur", lat: 17.4486, lon: 78.3908, category: "IT Hub" },
  { name: "Kondapur", lat: 17.4600, lon: 78.3650, category: "IT Hub" },
  { name: "Financial District", lat: 17.4218, lon: 78.3400, category: "IT Hub" },
  { name: "Mindspace, Madhapur", lat: 17.4447, lon: 78.3817, category: "IT Hub" },
  { name: "DLF Cyber City, Gachibowli", lat: 17.4292, lon: 78.3434, category: "IT Hub" },
  { name: "Raheja Mindspace", lat: 17.4460, lon: 78.3810, category: "IT Hub" },

  // Residential Areas
  { name: "Jubilee Hills", lat: 17.4318, lon: 78.4073, category: "Area" },
  { name: "Banjara Hills", lat: 17.4138, lon: 78.4382, category: "Area" },
  { name: "Ameerpet", lat: 17.4375, lon: 78.4483, category: "Area" },
  { name: "Kukatpally", lat: 17.4849, lon: 78.3992, category: "Area" },
  { name: "Dilsukhnagar", lat: 17.3687, lon: 78.5247, category: "Area" },
  { name: "LB Nagar", lat: 17.3457, lon: 78.5522, category: "Area" },
  { name: "Secunderabad Junction", lat: 17.4344, lon: 78.5013, category: "Area" },
  { name: "Begumpet", lat: 17.4444, lon: 78.4680, category: "Area" },
  { name: "Uppal", lat: 17.3984, lon: 78.5600, category: "Area" },
  { name: "Habsiguda", lat: 17.4053, lon: 78.5360, category: "Area" },
  { name: "Tarnaka", lat: 17.4222, lon: 78.5311, category: "Area" },
  { name: "Miyapur", lat: 17.4975, lon: 78.3526, category: "Area" },
  { name: "Manikonda", lat: 17.4050, lon: 78.3775, category: "Area" },
  { name: "Narsingi", lat: 17.3853, lon: 78.3464, category: "Area" },
  { name: "Chandanagar", lat: 17.4950, lon: 78.3260, category: "Area" },
  { name: "Kompally", lat: 17.5375, lon: 78.4857, category: "Area" },
  { name: "Alwal", lat: 17.5025, lon: 78.5168, category: "Area" },
  { name: "Malkajgiri", lat: 17.4534, lon: 78.5230, category: "Area" },
  { name: "ECIL", lat: 17.4700, lon: 78.5700, category: "Area" },
  { name: "Nacharam", lat: 17.4300, lon: 78.5565, category: "Area" },
  { name: "Sainikpuri", lat: 17.4870, lon: 78.5540, category: "Area" },
  { name: "AS Rao Nagar", lat: 17.4670, lon: 78.5456, category: "Area" },
  { name: "Bowenpally", lat: 17.4650, lon: 78.4795, category: "Area" },
  { name: "Shamshabad Airport (RGIA)", lat: 17.2403, lon: 78.4294, category: "Area" },
  { name: "Nampally", lat: 17.3889, lon: 78.4686, category: "Area" },
  { name: "Abids", lat: 17.3932, lon: 78.4738, category: "Area" },
  { name: "Koti", lat: 17.3858, lon: 78.4855, category: "Area" },
  { name: "Lakdi Ka Pul", lat: 17.4050, lon: 78.4600, category: "Area" },
  { name: "Mehdipatnam", lat: 17.3942, lon: 78.4386, category: "Area" },
  { name: "Tolichowki", lat: 17.3944, lon: 78.4123, category: "Area" },
  { name: "Attapur", lat: 17.3718, lon: 78.4220, category: "Area" },
  { name: "Rajendranagar", lat: 17.3264, lon: 78.4400, category: "Area" },
  { name: "Shamirpet", lat: 17.5700, lon: 78.5600, category: "Area" },
  { name: "Patancheru", lat: 17.5327, lon: 78.2640, category: "Area" },

  // Hospitals
  { name: "Apollo Hospital, Jubilee Hills", lat: 17.4258, lon: 78.4100, category: "Hospital" },
  { name: "KIMS Hospital, Secunderabad", lat: 17.4465, lon: 78.4961, category: "Hospital" },
  { name: "Care Hospital, Banjara Hills", lat: 17.4140, lon: 78.4440, category: "Hospital" },
  { name: "Yashoda Hospital, Somajiguda", lat: 17.4261, lon: 78.4577, category: "Hospital" },
  { name: "Continental Hospital, Gachibowli", lat: 17.4250, lon: 78.3410, category: "Hospital" },
  { name: "Osmania General Hospital", lat: 17.3762, lon: 78.4830, category: "Hospital" },

  // Shopping Malls
  { name: "Inorbit Mall, Madhapur", lat: 17.4352, lon: 78.3847, category: "Mall" },
  { name: "GVK One Mall, Banjara Hills", lat: 17.4192, lon: 78.4458, category: "Mall" },
  { name: "Forum Sujana Mall, Kukatpally", lat: 17.4853, lon: 78.3910, category: "Mall" },
  { name: "Sarath City Capital Mall", lat: 17.4573, lon: 78.3658, category: "Mall" },
  { name: "Manjeera Mall, Kukatpally", lat: 17.4879, lon: 78.3940, category: "Mall" },
  { name: "City Center Mall, Banjara Hills", lat: 17.4137, lon: 78.4430, category: "Mall" },

  // Metro Stations
  { name: "Miyapur Metro Station", lat: 17.4969, lon: 78.3510, category: "Metro" },
  { name: "Ameerpet Metro Station", lat: 17.4375, lon: 78.4480, category: "Metro" },
  { name: "Nagole Metro Station", lat: 17.3857, lon: 78.5567, category: "Metro" },
  { name: "LB Nagar Metro Station", lat: 17.3455, lon: 78.5520, category: "Metro" },
  { name: "Raidurg Metro Station", lat: 17.4382, lon: 78.3705, category: "Metro" },
  { name: "Parade Grounds Metro Station", lat: 17.4560, lon: 78.4830, category: "Metro" },
  { name: "JNTU Metro Station", lat: 17.4933, lon: 78.3900, category: "Metro" },
  { name: "Kukatpally Metro Station", lat: 17.4849, lon: 78.3990, category: "Metro" },
  { name: "Balanagar Metro Station", lat: 17.4700, lon: 78.4370, category: "Metro" },
  { name: "Moosapet Metro Station", lat: 17.4720, lon: 78.4220, category: "Metro" },
  { name: "Bharat Nagar Metro Station", lat: 17.4630, lon: 78.4310, category: "Metro" },
  { name: "Erragadda Metro Station", lat: 17.4530, lon: 78.4380, category: "Metro" },
  { name: "ESI Hospital Metro Station", lat: 17.4490, lon: 78.4420, category: "Metro" },
  { name: "SR Nagar Metro Station", lat: 17.4420, lon: 78.4450, category: "Metro" },
  { name: "Punjagutta Metro Station", lat: 17.4280, lon: 78.4500, category: "Metro" },
  { name: "Irrum Manzil Metro Station", lat: 17.4170, lon: 78.4560, category: "Metro" },
  { name: "Khairatabad Metro Station", lat: 17.4100, lon: 78.4600, category: "Metro" },
  { name: "Assembly Metro Station", lat: 17.4020, lon: 78.4680, category: "Metro" },
  { name: "Nampally Metro Station", lat: 17.3889, lon: 78.4686, category: "Metro" },
  { name: "Gandhi Bhavan Metro Station", lat: 17.3850, lon: 78.4740, category: "Metro" },
  { name: "Osmania Medical College Metro Station", lat: 17.3762, lon: 78.4830, category: "Metro" },
  { name: "MG Bus Station Metro Station", lat: 17.3750, lon: 78.4850, category: "Metro" },
  { name: "Malakpet Metro Station", lat: 17.3700, lon: 78.5040, category: "Metro" },
  { name: "New Market Metro Station", lat: 17.3650, lon: 78.5130, category: "Metro" },
  { name: "Musarambagh Metro Station", lat: 17.3600, lon: 78.5200, category: "Metro" },
  { name: "Dilsukhnagar Metro Station", lat: 17.3687, lon: 78.5247, category: "Metro" },
  { name: "Chaitanyapuri Metro Station", lat: 17.3580, lon: 78.5350, category: "Metro" },
  { name: "Victoria Memorial Metro Station", lat: 17.3520, lon: 78.5420, category: "Metro" },
  { name: "Habsiguda Metro Station", lat: 17.4053, lon: 78.5360, category: "Metro" },
  { name: "Tarnaka Metro Station", lat: 17.4222, lon: 78.5311, category: "Metro" },
  { name: "Mettuguda Metro Station", lat: 17.4300, lon: 78.5100, category: "Metro" },
  { name: "Secunderabad East Metro Station", lat: 17.4344, lon: 78.5050, category: "Metro" },

  // Bus Stations
  { name: "Mahatma Gandhi Bus Station (MGBS)", lat: 17.3750, lon: 78.4850, category: "Bus Station" },
  { name: "Jubilee Bus Station (JBS)", lat: 17.4530, lon: 78.4870, category: "Bus Station" },
  { name: "KPHB Bus Stop", lat: 17.4830, lon: 78.3870, category: "Bus Station" },
  { name: "Dilsukhnagar Bus Station", lat: 17.3687, lon: 78.5247, category: "Bus Station" },
  { name: "Mehdipatnam Bus Stop", lat: 17.3942, lon: 78.4386, category: "Bus Station" },
  { name: "Uppal Bus Depot", lat: 17.3984, lon: 78.5600, category: "Bus Station" },

  // Railway Stations
  { name: "Secunderabad Railway Station", lat: 17.4344, lon: 78.5013, category: "Railway" },
  { name: "Hyderabad Deccan (Nampally) Station", lat: 17.3889, lon: 78.4686, category: "Railway" },
  { name: "Kacheguda Railway Station", lat: 17.3850, lon: 78.4930, category: "Railway" },
  { name: "Lingampally Railway Station", lat: 17.4920, lon: 78.3170, category: "Railway" },
  { name: "Begumpet Railway Station", lat: 17.4444, lon: 78.4680, category: "Railway" },
  { name: "Ghatkesar Railway Station", lat: 17.4500, lon: 78.6200, category: "Railway" },

  // Cinema Halls & Entertainment
  { name: "PVR ICON, Hitech City", lat: 17.4435, lon: 78.3772, category: "Entertainment" },
  { name: "AMB Cinemas, Gachibowli", lat: 17.4292, lon: 78.3434, category: "Entertainment" },
  { name: "Prasads IMAX, Necklace Road", lat: 17.4100, lon: 78.4734, category: "Entertainment" },
  { name: "Asian Cinemas, Attapur", lat: 17.3718, lon: 78.4220, category: "Entertainment" },
  { name: "Sudarshan Theatre, RTC X Roads", lat: 17.4037, lon: 78.4906, category: "Entertainment" },

  // Parks & Gardens
  { name: "KBR National Park", lat: 17.4230, lon: 78.4250, category: "Park" },
  { name: "Botanical Garden, Kondapur", lat: 17.4600, lon: 78.3650, category: "Park" },
  { name: "Indira Park, Domalguda", lat: 17.4100, lon: 78.4820, category: "Park" },
  { name: "Sanjeevaiah Park", lat: 17.4270, lon: 78.4700, category: "Park" },
  { name: "Nehru Zoological Park", lat: 17.3500, lon: 78.4513, category: "Park" },
  { name: "Durgam Cheruvu Park", lat: 17.4350, lon: 78.3780, category: "Park" },

  // Vignan's Institute
  { name: "Vignan's Institute of Management and Technology for Women, Ghatkesar", lat: 17.4530, lon: 78.6230, category: "Engineering College" },

  // Telangana Districts — Tourist Places
  // Adilabad
  { name: "Kawal Wildlife Sanctuary, Adilabad", lat: 19.2500, lon: 78.8200, category: "Tourist Place" },
  { name: "Basar Saraswati Temple, Adilabad", lat: 18.8600, lon: 77.9800, category: "Tourist Place" },
  { name: "Kuntala Falls, Adilabad", lat: 19.5100, lon: 78.3700, category: "Tourist Place" },

  // Bhadradri Kothagudem
  { name: "Bhadrachalam Temple, Bhadradri Kothagudem", lat: 17.6686, lon: 80.8936, category: "Tourist Place" },
  { name: "Papi Kondalu, Bhadradri Kothagudem", lat: 17.4500, lon: 81.1500, category: "Tourist Place" },
  { name: "Bogatha Waterfalls, Bhadradri Kothagudem", lat: 17.8200, lon: 80.6000, category: "Tourist Place" },

  // Hanumakonda
  { name: "Thousand Pillar Temple, Hanumakonda", lat: 17.9741, lon: 79.5619, category: "Tourist Place" },
  { name: "Warangal Fort, Hanumakonda", lat: 17.9548, lon: 79.5941, category: "Tourist Place" },

  // Jagtial
  { name: "Jagtial Fort, Jagtial", lat: 18.7950, lon: 78.9150, category: "Tourist Place" },

  // Jangaon
  { name: "Yadagirigutta Temple, Jangaon", lat: 17.5908, lon: 78.9500, category: "Tourist Place" },

  // Jayashankar Bhupalpally
  { name: "Ramappa Temple (UNESCO), Jayashankar Bhupalpally", lat: 18.2500, lon: 79.9400, category: "Tourist Place" },

  // Jogulamba Gadwal
  { name: "Jogulamba Temple, Gadwal", lat: 15.9700, lon: 77.8100, category: "Tourist Place" },
  { name: "Alampur Temples, Gadwal", lat: 15.8800, lon: 78.1300, category: "Tourist Place" },

  // Kamareddy
  { name: "Nizamsagar Dam, Kamareddy", lat: 18.1600, lon: 78.3000, category: "Tourist Place" },

  // Karimnagar
  { name: "Vemulawada Temple, Karimnagar", lat: 18.4700, lon: 78.8700, category: "Tourist Place" },
  { name: "Kondagattu Anjaneya Temple, Karimnagar", lat: 18.5500, lon: 79.0200, category: "Tourist Place" },

  // Khammam
  { name: "Khammam Fort, Khammam", lat: 17.2473, lon: 80.1514, category: "Tourist Place" },
  { name: "Kinnerasani Wildlife Sanctuary, Khammam", lat: 17.5800, lon: 80.7300, category: "Tourist Place" },

  // Komaram Bheem Asifabad
  { name: "Komaram Bheem Dam, Asifabad", lat: 19.3600, lon: 79.2800, category: "Tourist Place" },

  // Mahabubabad
  { name: "Pandavula Gutta, Mahabubabad", lat: 17.6000, lon: 80.0000, category: "Tourist Place" },

  // Mahabubnagar
  { name: "Pillalamarri Banyan Tree, Mahabubnagar", lat: 16.7370, lon: 77.9850, category: "Tourist Place" },
  { name: "Koilsagar Dam, Mahabubnagar", lat: 16.5600, lon: 77.7100, category: "Tourist Place" },

  // Mancherial
  { name: "Mancherial Wildlife Area, Mancherial", lat: 18.8700, lon: 79.4400, category: "Tourist Place" },

  // Medak
  { name: "Medak Cathedral, Medak", lat: 18.0445, lon: 78.2600, category: "Tourist Place" },
  { name: "Medak Fort, Medak", lat: 18.0500, lon: 78.2620, category: "Tourist Place" },

  // Medchal-Malkajgiri
  { name: "Shamirpet Lake, Medchal-Malkajgiri", lat: 17.5700, lon: 78.5600, category: "Tourist Place" },
  { name: "Genome Valley, Medchal-Malkajgiri", lat: 17.5400, lon: 78.5100, category: "Tourist Place" },

  // Mulugu
  { name: "Sammakka-Saralamma Jatara, Mulugu", lat: 18.0300, lon: 80.3200, category: "Tourist Place" },
  { name: "Eturnagaram Wildlife Sanctuary, Mulugu", lat: 18.3300, lon: 80.3000, category: "Tourist Place" },

  // Nagarkurnool
  { name: "Mallela Theertham Waterfalls, Nagarkurnool", lat: 16.2200, lon: 78.5300, category: "Tourist Place" },
  { name: "Nagarjuna Sagar, Nagarkurnool", lat: 16.5720, lon: 79.3120, category: "Tourist Place" },

  // Nalgonda
  { name: "Nagarjuna Sagar Dam, Nalgonda", lat: 16.5720, lon: 79.3120, category: "Tourist Place" },
  { name: "Bhongir Fort, Nalgonda", lat: 17.5100, lon: 78.8900, category: "Tourist Place" },

  // Narayanpet
  { name: "Handwoven Sarees Heritage, Narayanpet", lat: 16.7400, lon: 77.5000, category: "Tourist Place" },

  // Nirmal
  { name: "Nirmal Paintings Heritage, Nirmal", lat: 19.0960, lon: 78.3440, category: "Tourist Place" },
  { name: "Kawal Tiger Reserve, Nirmal", lat: 19.2500, lon: 78.8200, category: "Tourist Place" },

  // Nizamabad
  { name: "Dichpally Ramalayam, Nizamabad", lat: 18.6200, lon: 78.2000, category: "Tourist Place" },

  // Peddapalli
  { name: "Ramagundam, Peddapalli", lat: 18.7600, lon: 79.4700, category: "Tourist Place" },

  // Rajanna Sircilla
  { name: "Vemulawada Temple, Rajanna Sircilla", lat: 18.4700, lon: 78.8700, category: "Tourist Place" },
  { name: "Handloom Heritage, Sircilla", lat: 18.3900, lon: 78.8300, category: "Tourist Place" },

  // Rangareddy
  { name: "Chilkur Balaji Temple, Rangareddy", lat: 17.3172, lon: 78.3383, category: "Tourist Place" },
  { name: "Himayat Sagar, Rangareddy", lat: 17.3300, lon: 78.3800, category: "Tourist Place" },

  // Sangareddy
  { name: "Sangareddy Jail Museum, Sangareddy", lat: 17.6167, lon: 78.0833, category: "Tourist Place" },

  // Siddipet
  { name: "Komuravelli Mallanna Temple, Siddipet", lat: 18.0500, lon: 78.8400, category: "Tourist Place" },

  // Suryapet
  { name: "Ancient Temples, Suryapet", lat: 17.1400, lon: 79.6300, category: "Tourist Place" },

  // Vikarabad
  { name: "Ananthagiri Hills, Vikarabad", lat: 17.3500, lon: 78.0800, category: "Tourist Place" },

  // Wanaparthy
  { name: "Wanaparthy Palace, Wanaparthy", lat: 16.3600, lon: 78.0600, category: "Tourist Place" },

  // Warangal
  { name: "Ramappa Temple, Warangal", lat: 18.2500, lon: 79.9400, category: "Tourist Place" },
  { name: "Warangal Fort, Warangal", lat: 17.9548, lon: 79.5941, category: "Tourist Place" },

  // Yadadri Bhuvanagiri
  { name: "Yadagirigutta Temple, Yadadri Bhuvanagiri", lat: 17.5908, lon: 78.9500, category: "Tourist Place" },
  { name: "Bhongir Fort, Yadadri Bhuvanagiri", lat: 17.5100, lon: 78.8900, category: "Tourist Place" },
];
