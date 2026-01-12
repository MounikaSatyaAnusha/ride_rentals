import { Router } from 'express';
import { Vehicle, Driver, User, Booking } from "./db/models.ts";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const router = Router();

router.post('/seed', async (req, res) => {
  try {
    const vehicleCount = await Vehicle.countDocuments();
    const driverCount = await Driver.countDocuments();

    if (vehicleCount === 0) {
      const vehicles = [
        // 20 cars
  { name: "Hyundai Aura", category: "car", model: "Aura", year: 2020, pricePerDay: 2200, transmission: "Manual", fuelType: "Petrol", seats: 4, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://imgd.aeplcdn.com/1056x594/n/v3kfq0b_1639123.jpg?q=80", available: true },
  { name: "Maruti Dzire", category: "car", model: "Dzire", year: 2019, pricePerDay: 2100, transmission: "Manual", fuelType: "Petrol", seats: 4, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://www.v3cars.com/media/model-imgs/200492splendid-silver.webp", available: true },
  { name: "Hyundai Verna", category: "car", model: "Verna", year: 2021, pricePerDay: 3200, transmission: "Automatic", fuelType: "Petrol", seats: 4, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://media.spinny.com/sp-file-system/public/2025-01-28/ac080a13ae83433daf92853feb0ffa9f/file.JPG", available: true },
  { name: "Honda City", category: "car", model: "City", year: 2018, pricePerDay: 2800, transmission: "Manual", fuelType: "Petrol", seats: 4, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://images.hindustantimes.com/auto/img/2020/01/17/1600x900/Honda_City_1579231621108.JPG", available: true },
  { name: "Skoda Rapid", category: "car", model: "Rapid", year: 2017, pricePerDay: 2600, transmission: "Manual", fuelType: "Diesel", seats: 4, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://auto-preprod.economictimes.indiatimes.com/files/retail_files/rapid-1504255779-prod-var.b60a09edb4ec11941e5ac40386ef1092.fill-960x548.jpg", available: true },
  { name: "Tata Nexon", category: "car", model: "Nexon", year: 2022, pricePerDay: 3000, transmission: "Manual", fuelType: "Petrol", seats: 5, description: "Located in Andhra Pradesh, Rajahmundry.", city: "Rajahmundry", imageUrl: "https://images.91wheels.com/assets/c_images/gallery/tata/nexon-ev/tata-nexon-ev-0-1738987688.jpg?w=840&q=50", available: true },
  { name: "Mahindra XUV300", category: "car", model: "XUV300", year: 2020, pricePerDay: 2900, transmission: "Manual", fuelType: "Diesel", seats: 5, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://gaadiwaadi.com/wp-content/uploads/2020/07/mahindra-xuv300-mstallion-1.2L-3.jpg", available: true },
  { name: "Toyota Innova Crysta", category: "car", model: "Innova Crysta", year: 2019, pricePerDay: 4500, transmission: "Automatic", fuelType: "Diesel", seats: 7, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://www.team-bhp.com/forum/attachments/official-new-car-reviews/2192828d1628939804-toyota-innova-crysta-official-review-img_3839.jpg", available: true },
  { name: "Kia Seltos", category: "car", model: "Seltos", year: 2021, pricePerDay: 3500, transmission: "Automatic", fuelType: "Petrol", seats: 5, description: "Located in Andhra Pradesh, Kurnool.", city: "Kurnool", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFB9ycgBqSBqUDBfAaHj3q2t-gmVaHLI4fzw&s", available: true },
  { name: "Volkswagen Vento", category: "car", model: "Vento", year: 2016, pricePerDay: 1950, transmission: "Manual", fuelType: "Diesel", seats: 4, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://imgd-ct.aeplcdn.com/664x415/n/zb8klsa_1471001.jpg?q=80", available: true },
  { name: "Tata Altroz", category: "car", model: "Altroz", year: 2021, pricePerDay: 2000, transmission: "Manual", fuelType: "Petrol", seats: 5, description: "Located in Andhra Pradesh, Ongole.", city: "Ongole", imageUrl: "https://img.autocarindia.com/Galleries/20210707010126_Altroz_Dark_Exterior.jpg?w=640&q=75", available: true },
  { name: "Hyundai i20", category: "car", model: "i20", year: 2022, pricePerDay: 2400, transmission: "Automatic", fuelType: "Petrol", seats: 5, description: "Located in Andhra Pradesh, Eluru.", city: "Eluru", imageUrl: "https://www.team-bhp.com/sites/default/files/styles/check_high_res/public/i20n.jpg", available: true },
  { name: "Maruti Baleno", category: "car", model: "Baleno", year: 2020, pricePerDay: 2300, transmission: "Manual", fuelType: "Petrol", seats: 5, description: "Located in Andhra Pradesh, Vizianagaram.", city: "Vizianagaram", imageUrl: "https://img.autocarindia.com/ExtraImages/20220228061914_Maruti_Baleno_2022_front.jpg?w=700&c=1", available: true },
  { name: "Honda Amaze", category: "car", model: "Amaze", year: 2021, pricePerDay: 2100, transmission: "Manual", fuelType: "Diesel", seats: 5, description: "Located in Andhra Pradesh, Srikakulam.", city: "Srikakulam", imageUrl: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/184377/amaze-2024-exterior-left-front-three-quarter.jpeg?isig=0&q=80&q=80", available: true },
  { name: "Toyota Glanza", category: "car", model: "Glanza", year: 2022, pricePerDay: 2600, transmission: "Automatic", fuelType: "Petrol", seats: 5, description: "Located in Andhra Pradesh, Vizag.", city: "Visakhapatnam", imageUrl: "https://images.overdrive.in/wp-content/uploads/2019/06/Toyota-Glanza_launch_012.jpg", available: true },
  { name: "Renault Kiger", category: "car", model: "Kiger", year: 2021, pricePerDay: 2700, transmission: "Manual", fuelType: "Petrol", seats: 5, description: "Located in Andhra Pradesh, Chittoor.", city: "Chittoor", imageUrl: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/208550/kiger-exterior-right-front-three-quarter-30.png?isig=0&q=80&q=80", available: true },
  { name: "Nissan Magnite", category: "car", model: "Magnite", year: 2022, pricePerDay: 2800, transmission: "Automatic", fuelType: "Petrol", seats: 5, description: "Located in Andhra Pradesh, Hindupur.", city: "Hindupur", imageUrl: "https://www.group1nissan.co.za/blog/wp-content/uploads/refreshed-nissan-magnite-blog-image-02.jpg", available: true },
  { name: "Mahindra Scorpio N", category: "car", model: "Scorpio N", year: 2023, pricePerDay: 5000, transmission: "Automatic", fuelType: "Diesel", seats: 7, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/10818/1755775730308/front-left-side-47.jpg", available: true },
  { name: "Hyundai Creta", category: "car", model: "Creta", year: 2021, pricePerDay: 3600, transmission: "Automatic", fuelType: "Diesel", seats: 5, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://trident-group.s3.ap-south-1.amazonaws.com/hyundai/models/colors/1705922962.png", available: true },
  { name: "MG Hector", category: "car", model: "Hector", year: 2023, pricePerDay: 5200, transmission: "Automatic", fuelType: "Petrol", seats: 5, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://media.assettype.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2021%2F08%2F12%2Fdownload-1018893-1628758021.png?w=undefined&auto=format%2Ccompress&fit=max", available: true },

        //20bikes
  { name: "Yamaha MT-15", category: "bike", model: "MT-15", year: 2021, pricePerDay: 1000, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://imgd.aeplcdn.com/424x424/n/cw/ec/95105/right-front-three-quarter.jpeg?q=80", available: true },
  { name: "Hero Xtreme 160R", category: "bike", model: "Xtreme 160R", year: 2020, pricePerDay: 850, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/127127/xtreme-right-side-view-2.jpeg?isig=0", available: true },
  { name: "TVS Raider 125", category: "bike", model: "Raider", year: 2022, pricePerDay: 780, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://financialexpresswpcontent.s3.amazonaws.com/uploads/2021/09/2-16.jpg", available: true },
  { name: "Bajaj Dominar 400", category: "bike", model: "Dominar 400", year: 2021, pricePerDay: 1300, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://imgd.aeplcdn.com/1056x594/n/4mmelgb_1848766.avif?q=80", available: true },
  { name: "Royal Enfield Hunter 350", category: "bike", model: "Hunter 350", year: 2023, pricePerDay: 1250, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://cdn.bikedekho.com/upload/standoutfeatures/65e6ec8173c8f.jpg", available: true },
  { name: "Suzuki Gixxer SF", category: "bike", model: "Gixxer SF", year: 2020, pricePerDay: 950, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Rajahmundry.", city: "Rajahmundry", imageUrl: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/suzuki-select-model-glass-sparkle-black-1671516770018.png?q=80", available: true },
  { name: "KTM RC 200", category: "bike", model: "RC 200", year: 2022, pricePerDay: 1150, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://cdn.bikedekho.com/upload/standoutfeatures/6606cf9a29ddf.jpg", available: true },
  { name: "Honda Hornet 2.0", category: "bike", model: "Hornet 2.0", year: 2021, pricePerDay: 900, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://lh6.googleusercontent.com/proxy/ZqqrkPb-ODskfZBm2cm0VLbPLNK9YM_OIfy7aThzV5UGC5UnslL5aLLQiTEyFDHs9FtUkx25cm3FkSTTQqfrGwhNZ7BKPhTkF87R0w76on3a-RwqvslLHYlEW_b2nRemf-hiRw", available: true },
  { name: "Bajaj Pulsar N160", category: "bike", model: "Pulsar N160", year: 2023, pricePerDay: 880, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Kurnool.", city: "Kurnool", imageUrl: "https://imgd.aeplcdn.com/1056x594/n/bw/models/colors/bajaj-select-model-brooklyn-black-1682766008984.jpg?q=80", available: true },
  { name: "Royal Enfield Himalayan", category: "bike", model: "Himalayan", year: 2022, pricePerDay: 1400, transmission: "Manual", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://www.royalenfield.com/content/dam/royal-enfield/usa/motorcycles/himalayan/colours/new-colors/studio-shots/mirage-silver/side-view.png", available: true },

  { name: "Honda Activa 6G", category: "bike", model: "Activa 6G", year: 2022, pricePerDay: 600, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg", available: true },
  { name: "TVS Jupiter Classic", category: "bike", model: "Jupiter", year: 2021, pricePerDay: 580, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://www.bikes4sale.in/pictures/default/tvs-jupiter-classic/tvs-jupiter-classic-640.jpg", available: true },
  { name: "Suzuki Access 125", category: "bike", model: "Access 125", year: 2020, pricePerDay: 620, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/188491/access-125-2025-right-front-three-quarter-5.jpeg?isig=0", available: true },
  { name: "Yamaha Fascino 125", category: "bike", model: "Fascino 125", year: 2023, pricePerDay: 650, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://shantimotors.in/wp-content/uploads/2024/03/VIVID-RED-STD-1-1.webp", available: true },
  { name: "Hero Pleasure Plus", category: "bike", model: "Pleasure Plus", year: 2019, pricePerDay: 500, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://imgd.aeplcdn.com/1056x594/n/bw/models/colors/hero-select-model-bluish-teal-1707151706460.png?q=80", available: true },
  { name: "TVS Ntorq 125", category: "bike", model: "Ntorq 125", year: 2022, pricePerDay: 670, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Rajahmundry.", city: "Rajahmundry", imageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/102709/ntorq-125-left-rear-three-quarter.jpeg?isig=0&q=80", available: true },
  { name: "Aprilia SR 160", category: "bike", model: "SR 160", year: 2023, pricePerDay: 800, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://apriliaindia.com/images/SR_160_Race.jpg", available: true },
  { name: "Honda Dio", category: "bike", model: "Dio", year: 2021, pricePerDay: 590, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/201061/dio-125-right-front-three-quarter.jpeg?isig=0", available: true },
  { name: "Vespa SXL 150", category: "bike", model: "SXL 150", year: 2022, pricePerDay: 750, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Kurnool.", city: "Kurnool", imageUrl: "https://imgd.aeplcdn.com/1056x594/n/bw/models/colors/vespa-select-model-white-1683718934261.jpg?q=80", available: true },
  { name: "Ola S1 Air", category: "bike", model: "S1 Air", year: 2024, pricePerDay: 900, transmission: "Automatic", fuelType: "Electric", seats: 2, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://images.timesdrive.in/photo/msid-151057203,thumbsize-399090/151057203.jpg", available: true },

  //20trucks
  { name: "Tata Intra V30", category: "truck", model: "Intra V30", year: 2021, pricePerDay: 4600, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2025-01/2_high_power_0.jpg?VersionId=6ZDqE0LInd7hh8zK62VUjvjkZ9ej8FNp", available: true },
  { name: "Ashok Leyland Partner 4T", category: "truck", model: "Partner 4T", year: 2020, pricePerDay: 4700, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/293817486/AM/LY/MD/95718596/4-tyre-ashok-leyland-partner-mini-truck.jpeg", available: true },
  { name: "Mahindra Furio 7", category: "truck", model: "Furio 7", year: 2022, pricePerDay: 4900, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://www.mahindratruckandbus.com/english/images/lcv/furio7/furio7-cargo/furio-7-overview-1.jpg", available: true },
  { name: "Eicher Pro 2049", category: "truck", model: "Pro 2049", year: 2021, pricePerDay: 4800, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://cms.eichertrucksandbuses.com/uploads/truck/img/e3fed9072b0258e30fc3c8685f5651b9.png", available: true },
  { name: "BharatBenz 1015R", category: "truck", model: "1015R", year: 2019, pricePerDay: 5300, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://autobahntrucking.com/storage/app/vehicles/images/Bharatbenz-truck-1015R.jpg", available: true },
  { name: "Force Shaktiman 400", category: "truck", model: "Shaktiman 400", year: 2020, pricePerDay: 4200, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Rajahmundry.", city: "Rajahmundry", imageUrl: "https://truckcdn.cardekho.com/in/force/shaktiman-400/force-shaktiman-400.jpg", available: true },
  { name: "Isuzu D-Max S-Cab", category: "truck", model: "D-Max S-Cab", year: 2021, pricePerDay: 5000, transmission: "Manual", fuelType: "Diesel", seats: 2, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://cdn.trucksfloor.com/vehicles/truck/trf/isuzu-s-cab-z/isuzu-s-cab-z-2wd-hr-1.jpg", available: true },
  { name: "Piaggio Ape Xtra LDX", category: "truck", model: "Ape Xtra LDX", year: 2022, pricePerDay: 3500, transmission: "Manual", fuelType: "Diesel", seats: 2, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://img.gaadibazaar.in/new-vehicle-images/1445851/conversions/63b6dd5b-c11a-4a73-ac3f-a38e89bef157-vdp.webp", available: true },
  { name: "Mahindra Supro Maxitruck", category: "truck", model: "Supro Maxitruck", year: 2019, pricePerDay: 4000, transmission: "Manual", fuelType: "Diesel", seats: 2, description: "Located in Andhra Pradesh, Kurnool.", city: "Kurnool", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgC_SuWadLZk0Y6c9uiqetHyPq8uS9i6QGQA&s", available: true },
  { name: "Tata Ultra T.7", category: "truck", model: "Ultra T.7", year: 2021, pricePerDay: 5100, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/ULTRA-T16.jpg?VersionId=V6SQyAAfw35DlXkgD9hmWXalYZ8XF0ps", available: true },
  { name: "Ashok Leyland Bada Dost", category: "truck", model: "Bada Dost", year: 2022, pricePerDay: 4700, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://5.imimg.com/data5/XV/PH/IQ/NSDMERP-33993010/33993010-product-1566289991640.jpg", available: true },
  { name: "Eicher Pro 3015", category: "truck", model: "Pro 3015", year: 2020, pricePerDay: 5500, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://cms.eichertrucksandbuses.com/uploads/truck/exterior/b745823d1ce0f75f4c625fdcbeca63c6.jpg", available: true },
  { name: "Mahindra Jayo", category: "truck", model: "Jayo", year: 2019, pricePerDay: 4400, transmission: "Manual", fuelType: "Diesel", seats: 2, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://www.mahindratruckandbus.com/english/images/lcv/jayo/jayo.jpg", available: true },
  { name: "Tata Yodha Pickup", category: "truck", model: "Yodha Pickup", year: 2023, pricePerDay: 4800, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://www.motorindiaonline.in/wp-content/uploads/2022/12/Tata-Yodha-pic-2.jpg", available: true },
  { name: "BharatBenz 1217C", category: "truck", model: "1217C", year: 2018, pricePerDay: 5600, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://images.91trucks.com/trucks/models/46/923/bharat-benz-2823c-631159959.jpg", available: true },
  { name: "Tata Ace Gold Diesel+", category: "truck", model: "Ace Gold Diesel+", year: 2021, pricePerDay: 3900, transmission: "Manual", fuelType: "Diesel", seats: 2, description: "Located in Andhra Pradesh, Rajahmundry.", city: "Rajahmundry", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2020/9/YF/OU/JI/73084014/tata-ace-gold-diesel-bs-vi.png", available: true },
  { name: "Force Traveller Delivery Van", category: "truck", model: "Traveller DV", year: 2020, pricePerDay: 4600, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/7/432462556/MV/TX/RZ/92148596/force-traveller-delivery-van-500x500.jpg", available: true },
  { name: "Ashok Leyland Ecomet 1215", category: "truck", model: "Ecomet 1215", year: 2022, pricePerDay: 5400, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://images.jdmagicbox.com/quickquotes/images_main/icv-distribution-ecomet-ecomet-1215-he-271956677-fw25abr2.jpg", available: true },
  { name: "Eicher Pro 1110XPT", category: "truck", model: "Pro 1110XPT", year: 2019, pricePerDay: 5200, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Kurnool.", city: "Kurnool", imageUrl: "https://truckcdn.cardekho.com/in/eicher/pro-1110-xp/eicher-pro-1110-xp.jpg?imwidth=360&impolicy=resize", available: true },
  { name: "Mahindra Blazo X 28", category: "truck", model: "Blazo X 28", year: 2023, pricePerDay: 5800, transmission: "Manual", fuelType: "Diesel", seats: 3, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/2/CP/JL/OT/140396460/mahindra-blazo-x-28-tipper.jpg", available: true },
  
// 20 buses
  { name: "Volvo B11R", category: "bus", model: "Volvo", year: 2015, pricePerDay: 10000, transmission: "Manual", fuelType: "Diesel", seats: 40, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/3/GN/ZT/ZQ/24161730/volvo-9400-b11r-6x2-14-5m-55-seat-coach-bus.jpg", available: true },
  { name: "Mercedes-Benz Multi-Axle", category: "bus", model: "Mercedes-Benz", year: 2018, pricePerDay: 12000, transmission: "Manual", fuelType: "Diesel", seats: 45, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmrmH9fTszRkh_VK7CRCL-dUrMfy9_Gjbf95YpdlTb-mmVtm_u5uYzaT5Q5CyLLOlm594&usqp=CAU", available: true },
  { name: "Scania Metrolink", category: "bus", model: "Scania", year: 2017, pricePerDay: 9500, transmission: "Manual", fuelType: "Diesel", seats: 35, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://i.pinimg.com/736x/24/eb/0b/24eb0b6565b25eaab85b28f8c328dbf9.jpg", available: true },
  { name: "Ashok Leyland Intercity", category: "bus", model: "Ashok Leyland", year: 2016, pricePerDay: 11000, transmission: "Manual", fuelType: "Diesel", seats: 38, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://images.jdmagicbox.com/quickquotes/images_main/-aq7y0qf9.png", available: true },
  { name: "Tata Starbus Ultra", category: "bus", model: "Tata", year: 2019, pricePerDay: 9800, transmission: "Manual", fuelType: "Diesel", seats: 36, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/12/372859027/SP/GN/TL/10286337/tata-starbus-prime-40-d-812-52-500x500.png", available: true },
  { name: "Eicher Skyline Pro", category: "bus", model: "Eicher", year: 2015, pricePerDay: 9000, transmission: "Manual", fuelType: "Diesel", seats: 34, description: "Located in Andhra Pradesh, Rajahmundry.", city: "Rajahmundry", imageUrl: "https://img.autocarpro.in/autocarpro/IMG/251/16251/web-eicher-skyline-pro.jpg", available: true },
  { name: "Volvo 9400", category: "bus", model: "Volvo", year: 2020, pricePerDay: 13000, transmission: "Automatic", fuelType: "Diesel", seats: 48, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-volvo-9600?size=1280,720&scl=1", available: true },
  { name: "Force Traveller 4020", category: "bus", model: "Force", year: 2018, pricePerDay: 15000, transmission: "Automatic", fuelType: "Diesel", seats: 45, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGORuqtLcfx9biRw_j1FgrHRGGapTR4VVvVw&s", available: true },
  { name: "BharatBenz Staff Bus", category: "bus", model: "BharatBenz", year: 2019, pricePerDay: 14500, transmission: "Automatic", fuelType: "Diesel", seats: 50, description: "Located in Andhra Pradesh, Kurnool.", city: "Kurnool", imageUrl: "https://www.91trucks.com/_next/image?url=https%3A%2F%2Fimages.91trucks.com%2Fbuses%2Fmodels%2F77%2F1604%2Fscania-touring-bus-hd-1251639234.jpg%3Fw%3D350%26h%3D180%3Fh%3D180%26v%3D1234&w=640&q=75", available: true },
  { name: "Mercedes-Benz OF 917", category: "bus", model: "Mercedes-Benz", year: 2017, pricePerDay: 14000, transmission: "Automatic", fuelType: "Diesel", seats: 46, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOkOgyvv5sI7Kf7DSWkxgolXd_43eYJiYUQ&s", available: true },
  { name: "Ashok Leyland JanBus", category: "bus", model: "Ashok Leyland", year: 2016, pricePerDay: 10100, transmission: "Manual", fuelType: "Diesel", seats: 40, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://buscdn.cardekho.com/in/ashok-leyland/janbus-midi/ashok-leyland-janbus-midi.jpg?imwidth=480&impolicy=resize", available: true },
  { name: "Volvo Hybrid Bus", category: "bus", model: "Volvo", year: 2018, pricePerDay: 12100, transmission: "Manual", fuelType: "Diesel", seats: 45, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://buscdn.cardekho.com/in/volvo/hybrid-city-bus/volvo-hybrid-city-bus.jpg?imwidth=480&impolicy=resize", available: true },
  { name: "Isuzu LT134", category: "bus", model: "Isuzu", year: 2017, pricePerDay: 9600, transmission: "Manual", fuelType: "Diesel", seats: 35, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://img.gaadibazaar.in/new-vehicle-images/1446468/conversions/ba69f2cd-f684-4fb5-b2d7-195d5b131422-vdp.webp", available: true },
  { name: "Tata Magna", category: "bus", model: "Tata", year: 2016, pricePerDay: 11100, transmission: "Manual", fuelType: "Diesel", seats: 38, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://www.shutterstock.com/image-vector/logo-icon-sign-symbol-white-260nw-2388314325.jpg", available: true },
  { name: "Eicher 20.15N", category: "bus", model: "Eicher", year: 2020, pricePerDay: 9900, transmission: "Manual", fuelType: "Diesel", seats: 36, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://cms.eichertrucksandbuses.com/uploads/ib/exterior/fabbea97fd7fec9cd1fa535c0717877a.jpg", available: true },
  { name: "SML Isuzu Executive LX", category: "bus", model: "SML Isuzu", year: 2019, pricePerDay: 9100, transmission: "Manual", fuelType: "Diesel", seats: 34, description: "Located in Andhra Pradesh, Rajahmundry.", city: "Rajahmundry", imageUrl: "https://cdn.motorfloor.com/vehicles/bus/sml-isuzu-exclusive-lx-school-bus-bs6.jpg", available: true },
  { name: "Scania Citywide", category: "bus", model: "Scania", year: 2021, pricePerDay: 13100, transmission: "Automatic", fuelType: "Diesel", seats: 48, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://www.91trucks.com/_next/image?url=https%3A%2F%2Fimages.91trucks.com%2Fbuses%2Fmodels%2F77%2F1605%2Fscania-citywide-1954738419.jpg%3Fv%3D1234&w=640&q=75", available: true },
  { name: "Volvo B8R", category: "bus", model: "Volvo", year: 2019, pricePerDay: 15100, transmission: "Automatic", fuelType: "Diesel", seats: 45, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://live.staticflickr.com/4888/32341297178_55f602e91d_h.jpg", available: true },
  { name: "BharatBenz Executive Coach", category: "bus", model: "BharatBenz", year: 2018, pricePerDay: 14600, transmission: "Automatic", fuelType: "Diesel", seats: 50, description: "Located in Andhra Pradesh, Kurnool.", city: "Kurnool", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdkmaqGJfkufjgo7CGJx8e3gw-RwKIZEu-g&s", available: true },
  { name: "Ashok Leyland Mitr", category: "bus", model: "Ashok Leyland", year: 2016, pricePerDay: 14100, transmission: "Automatic", fuelType: "Diesel", seats: 46, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://buscdn.cardekho.com/in/ashok-leyland/mitr/ashok-leyland-mitr.jpg?imwidth=480&impolicy=resize", available: true },

  // 20 bicycles 
  { name: "Hero Sprint", category: "bicycle", model: "Sprint", year: 2021, pricePerDay: 180, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://assetscdn1.paytm.com/images/catalog/product/S/SC/SCOHERO-SPRINT-NEW-10834856A0BDCD2/0.jpg?imwidth=320&impolicy=hq", available: true },
  { name: "Btwin Riverside 120", category: "bicycle", model: "Riverside", year: 2020, pricePerDay: 160, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://contents.mediadecathlon.com/p1670555/ac8a7f35f2c32fe8ffd847e6f5f14274/p1670555.jpg?format=auto&quality=70&f=1024x0", available: true },
  { name: "Montra Trance Pro", category: "bicycle", model: "Trance", year: 2022, pricePerDay: 200, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://montra.in/wp-content/uploads/2021/09/trance_pro_red.png", available: true },
  { name: "Firefox Bad Attitude", category: "bicycle", model: "Attitude", year: 2021, pricePerDay: 220, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://images.jdmagicbox.com/quickquotes/images_main/firefox_bad_attitude_26_14_inch_bicycle_black_14031698_0.JPG", available: true },
  { name: "Giant Escape 3", category: "bicycle", model: "Escape", year: 2019, pricePerDay: 150, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2020/escape-3/thumbs/1000/badb3.jpeg", available: true },
  { name: "Trek Marlin 5", category: "bicycle", model: "Marlin", year: 2020, pricePerDay: 240, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Rajahmundry.", city: "Rajahmundry", imageUrl: "https://yellowjersey.co.in/wp-content/uploads/2023/07/Marlin5_22_34587_A_Portrait.webp", available: true },
  { name: "Hercules Roadeo A75", category: "bicycle", model: "Roadeo", year: 2022, pricePerDay: 260, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://hercules.in/wp-content/uploads/2022/09/Image2-2.jpg", available: true },
  { name: "Cannondale Trail 8", category: "bicycle", model: "Trail", year: 2021, pricePerDay: 270, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://www.sefiles.net/images/library/zoom/cannondale-women's-trail-8---2023-442656-3342087-1.png", available: true },
  { name: "Scott Aspect 950", category: "bicycle", model: "Aspect", year: 2019, pricePerDay: 200, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Kurnool.", city: "Kurnool", imageUrl: "https://d1mgeijqpfaspl.cloudfront.net/uploads/bike/image_side/63e0c0e8d91cb_IMG_20230206_094021.webp", available: true },
  { name: "Polygon Cascade 4", category: "bicycle", model: "Cascade", year: 2020, pricePerDay: 230, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://www.cyclop.in/cdn/shop/products/CASCADE-FOUR-TA.png?v=1622134224", available: true },
  { name: "BSA Photon", category: "bicycle", model: "Photon", year: 2021, pricePerDay: 185, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://m.media-amazon.com/images/I/61iCgZhrkiL.jpg", available: true },
  { name: "Lectro EHX20", category: "bicycle", model: "EHX20", year: 2023, pricePerDay: 300, transmission: "Electric Assist", fuelType: "Battery", seats: 1, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://choosemybicycle.com/cdn/shop/files/lectro-ehx20.jpg?v=1750228155", available: true },
  { name: "Ninety One Wanderer", category: "bicycle", model: "Wanderer", year: 2022, pricePerDay: 210, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://d2f9uwgpmber13.cloudfront.net/public/image_new/43e43ac9dc1b84811753961619298.jpg", available: true },
  { name: "Emotorad T-Rex", category: "bicycle", model: "T-Rex", year: 2023, pricePerDay: 320, transmission: "Electric", fuelType: "Battery", seats: 1, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productpage/cardandcartImages/T-Rex%2BAir_orange.jpg", available: true },
  { name: "Urban Terrain UT3000", category: "bicycle", model: "UT3000", year: 2021, pricePerDay: 200, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://www.dealsmagnet.com/images/urban-terrain-ut3000a27-5-alloy-mtb-hardtail-cycle-o-15TP02OT.jpg", available: true },
  { name: "Vaux Freedom", category: "bicycle", model: "Freedom", year: 2021, pricePerDay: 185, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://m.media-amazon.com/images/I/81FhGGavNEL._UF350,350_QL80_.jpg", available: true },
  { name: "Leader Scout MTB", category: "bicycle", model: "Scout", year: 2020, pricePerDay: 190, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://m.media-amazon.com/images/I/81MFfnpOQGL._AC_UF894,1000_QL80_.jpg", available: true },
  { name: "Firefox Road Runner Pro", category: "bicycle", model: "Road Runner", year: 2023, pricePerDay: 250, transmission: "N/A", fuelType: "N/A", seats: 1, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://m.media-amazon.com/images/I/71B4RQcpOdL._AC_UF894,1000_QL80_.jpg", available: true }
];

      await Vehicle.insertMany(vehicles);
      console.log('Seeded vehicles:', vehicles.length);
    }

    if (driverCount === 0) {
      const drivers = [
        { name: "Ramesh Kumar", phone: "+91-9012345678", experienceYears: 12, rating: 4.8, languages: ["Telugu","English"], specialty: "Intercity Andhra Pradesh", licenseNumber: "DL-AP-1001", pricePerDay: 1200, city: "Vijayawada", available: true },
        { name: "Suresh Babu", phone: "+91-9023456789", experienceYears: 8, rating: 4.6, languages: ["Telugu"], specialty: "City & Highway", licenseNumber: "DL-AP-1002", pricePerDay: 1000, city: "Visakhapatnam", available: true },
        { name: "Anil Reddy", phone: "+91-9034567890", experienceYears: 15, rating: 4.9, languages: ["Telugu","English"], specialty: "Long Distance", licenseNumber: "DL-AP-1003", pricePerDay: 1500, city: "Tirupati", available: true },
        { name: "Kiran Kumar", phone: "+91-9045678901", experienceYears: 7, rating: 4.5, languages: ["Telugu"], specialty: "Airport Transfers", licenseNumber: "DL-AP-1004", pricePerDay: 1100, city: "Guntur", available: true },
        { name: "Sasidhar", phone: "+91-9056789012", experienceYears: 10, rating: 4.7, languages: ["Telugu","Hindi"], specialty: "Family Tours", licenseNumber: "DL-AP-1005", pricePerDay: 1250, city: "Nellore", available: true },
        { name: "Pradeep", phone: "+91-9067890123", experienceYears: 9, rating: 4.6, languages: ["Telugu"], specialty: "Business Travel", licenseNumber: "DL-AP-1006", pricePerDay: 1150, city: "Rajahmundry", available: true },
        { name: "Venkatesh", phone: "+91-9078901234", experienceYears: 20, rating: 4.9, languages: ["Telugu","English"], specialty: "Senior Driver", licenseNumber: "DL-AP-1007", pricePerDay: 1600, city: "Kakinada", available: true },
        { name: "Manoj", phone: "+91-9089012345", experienceYears: 6, rating: 4.4, languages: ["Telugu"], specialty: "Short Trips", licenseNumber: "DL-AP-1008", pricePerDay: 950, city: "Anantapur", available: true },
        { name: "Hari", phone: "+91-9090123456", experienceYears: 11, rating: 4.7, languages: ["Telugu","English"], specialty: "Tour Guide Driver", licenseNumber: "DL-AP-1009", pricePerDay: 1300, city: "Kurnool", available: true },
        { name: "Ajay", phone: "+91-9101234567", experienceYears: 5, rating: 4.3, languages: ["Telugu"], specialty: "City", licenseNumber: "DL-AP-1010", pricePerDay: 900, city: "Kadapa", available: true },
        { name: "Raju", phone: "+91-9112345678", experienceYears: 13, rating: 4.8, languages: ["Telugu","Hindi"], specialty: "Intercity", licenseNumber: "DL-AP-1011", pricePerDay: 1350, city: "Vijayawada", available: true },
        { name: "Vijay", phone: "+91-9123456789", experienceYears: 14, rating: 4.9, languages: ["Telugu","English"], specialty: "Long Hauls", licenseNumber: "DL-AP-1012", pricePerDay: 1550, city: "Visakhapatnam", available: true },
        { name: "Siddharth", phone: "+91-9134567890", experienceYears: 4, rating: 4.2, languages: ["Telugu"], specialty: "Short Trips", licenseNumber: "DL-AP-1013", pricePerDay: 850, city: "Tirupati", available: true },
        { name: "Lokesh", phone: "+91-9145678901", experienceYears: 16, rating: 4.9, languages: ["Telugu"], specialty: "Touring Andhra Pradesh", licenseNumber: "DL-AP-1014", pricePerDay: 1700, city: "Guntur", available: true },
        { name: "Kalyan", phone: "+91-9156789012", experienceYears: 8, rating: 4.5, languages: ["Telugu"], specialty: "Event Driver", licenseNumber: "DL-AP-1015", pricePerDay: 1050, city: "Nellore", available: true },
        { name: "Naveen", phone: "+91-9167890123", experienceYears: 9, rating: 4.6, languages: ["Telugu","English"], specialty: "Airport & City", licenseNumber: "DL-AP-1016", pricePerDay: 1200, city: "Rajahmundry", available: true },
        { name: "Anwar", phone: "+91-9178901234", experienceYears: 7, rating: 4.4, languages: ["Telugu","Hindi"], specialty: "Driver for Bikes", licenseNumber: "DL-AP-1017", pricePerDay: 950, city: "Kakinada", available: true },
        { name: "Rangan", phone: "+91-9189012345", experienceYears: 10, rating: 4.7, languages: ["Telugu"], specialty: "Long Distance", licenseNumber: "DL-AP-1018", pricePerDay: 1300, city: "Anantapur", available: true },
        { name: "Bhanu", phone: "+91-9190123456", experienceYears: 12, rating: 4.8, languages: ["Telugu"], specialty: "Family Tours", licenseNumber: "DL-AP-1019", pricePerDay: 1400, city: "Kurnool", available: true },
        { name: "Chandra", phone: "+91-9201234567", experienceYears: 11, rating: 4.7, languages: ["Telugu","English"], specialty: "Senior Driver", licenseNumber: "DL-AP-1020", pricePerDay: 1500, city: "Kadapa", available: true },
        { name: "Deepak", phone: "+91-9212345678", experienceYears: 6, rating: 4.5, languages: ["Telugu"], specialty: "Local Trips", licenseNumber: "DL-AP-1021", pricePerDay: 980, city: "Vijayawada", available: true },
        { name: "Eeshan", phone: "+91-9223456789", experienceYears: 3, rating: 4.1, languages: ["Telugu"], specialty: "Short Trips", licenseNumber: "DL-AP-1022", pricePerDay: 800, city: "Visakhapatnam", available: true },
        { name: "Farhan", phone: "+91-9234567890", experienceYears: 9, rating: 4.6, languages: ["Telugu","English"], specialty: "Weekend Trips", licenseNumber: "DL-AP-1023", pricePerDay: 1250, city: "Tirupati", available: true },
        { name: "Gopal", phone: "+91-9245678901", experienceYears: 18, rating: 4.9, languages: ["Telugu"], specialty: "Very Experienced", licenseNumber: "DL-AP-1024", pricePerDay: 1750, city: "Guntur", available: true },
        { name: "Hemanth", phone: "+91-9256789012", experienceYears: 7, rating: 4.4, languages: ["Telugu"], specialty: "Event Driver", licenseNumber: "DL-AP-1025", pricePerDay: 1000, city: "Nellore", available: true },
        { name: "Irfan", phone: "+91-9267890123", experienceYears: 10, rating: 4.7, languages: ["Telugu","English"], specialty: "Intercity", licenseNumber: "DL-AP-1026", pricePerDay: 1300, city: "Rajahmundry", available: true }
      ];

      await Driver.insertMany(drivers);
      console.log('Seeded drivers:', drivers.length);
    }

    return res.json({ ok: true, seededVehicles: vehicleCount === 0, seededDrivers: driverCount === 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Seeding failed', details: err.message });
  }
});

router.get('/vehicles', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = { $regex: new RegExp(`^${category}$`, "i") };

    const vehicles = await Vehicle.find(filter).lean();
    return res.json(vehicles);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/vehicle/:id", async (req, res) => {
  try {
    const v = await Vehicle.findById(req.params.id).lean();
    if (!v) return res.status(404).json({ error: "Vehicle not found" });
    return res.json(v);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/vehicles/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const vehicles = await Vehicle.find({ category: { $regex: new RegExp(`^${category}$`, "i") } }).lean();

    if (vehicles.length === 0) {
      return res.status(404).json({ message: `No ${category}s found` });
    }

    return res.json(vehicles);
  } catch (err) {
    console.error("❌ Error fetching vehicles by category:", err);
    return res.status(500).json({ error: "Failed to fetch vehicles", details: err.message });
  }
});

router.get('/drivers', async (req, res) => {
  try {
    const { city } = req.query;
    const filter = { available: true };
    if (city) filter.city = city;
    const drivers = await Driver.find(filter).lean();
    return res.json(drivers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/bookings', async (req, res) => {
  try {
    let { userId, vehicleId, driverId, startDate, endDate, totalPrice } = req.body;
    if ((!userId || userId === "") && req.user && req.user.id) {
      userId = req.user.id;
    }
    if (!userId || !vehicleId || !startDate || !endDate) {
      const missing = [];
      if (!userId) missing.push("userId");
      if (!vehicleId) missing.push("vehicleId");
      if (!startDate) missing.push("startDate");
      if (!endDate) missing.push("endDate");
      return res.status(400).json({ ok: false, error: `Missing required fields: ${missing.join(", ")}` });
    }
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) {
      return res.status(400).json({ ok: false, error: "Invalid date format for startDate or endDate" });
    }
    if (e < s) {
      return res.status(400).json({ ok: false, error: "endDate must be same or after startDate" });
    }
    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ ok: false, error: 'User not found' });

    const vehicleExists = await Vehicle.findById(vehicleId);
    if (!vehicleExists) return res.status(404).json({ ok: false, error: 'Vehicle not found' });
    const booking = new Booking({
      userId,
      vehicleId,
      driverId: driverId || null,
      startDate: s.toISOString(),
      endDate: e.toISOString(),
      totalPrice: totalPrice || 0,
      createdAt: new Date(),
      status: "confirmed", 
    });

    await booking.save();

    return res.status(201).json({ ok: true, bookingId: booking._id });
  } catch (err) {
    console.error('Booking error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.get('/bookings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId })
      .populate('vehicleId')
      .populate('driverId')
      .lean();

    return res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/auth/signup", async (req, res) => {
  try {
    const { username, email, password, fullName, phone } = req.body;
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "Email or username already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      name: fullName,
      email,
      passwordHash, 
      phone,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.name,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/auth/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash); 
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.name,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Failed to sign in" });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("📩 New contact message:");
    console.log({ name, email, subject, message });
    return res.status(200).json({
      success: true,
      message: "Your message has been received!",
    });
  } catch (error) {
    console.error("Error in /contact route:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

router.post("/add-bikes", async (req, res) => {
  try {
    const newBikes = [
      
  { name: "Honda Activa 6G", category: "bike", model: "Activa 6G", year: 2022, pricePerDay: 600, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Visakhapatnam.", city: "Visakhapatnam", imageUrl: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg", available: true },
  { name: "TVS Jupiter Classic", category: "bike", model: "Jupiter", year: 2021, pricePerDay: 580, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Vijayawada.", city: "Vijayawada", imageUrl: "https://www.bikes4sale.in/pictures/default/tvs-jupiter-classic/tvs-jupiter-classic-640.jpg", available: true },
  { name: "Suzuki Access 125", category: "bike", model: "Access 125", year: 2020, pricePerDay: 620, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Guntur.", city: "Guntur", imageUrl: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/188491/access-125-2025-right-front-three-quarter-5.jpeg?isig=0", available: true },
  { name: "Yamaha Fascino 125", category: "bike", model: "Fascino 125", year: 2023, pricePerDay: 650, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Tirupati.", city: "Tirupati", imageUrl: "https://shantimotors.in/wp-content/uploads/2024/03/VIVID-RED-STD-1-1.webp", available: true },
  { name: "Hero Pleasure Plus", category: "bike", model: "Pleasure Plus", year: 2019, pricePerDay: 500, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Nellore.", city: "Nellore", imageUrl: "https://imgd.aeplcdn.com/1056x594/n/bw/models/colors/hero-select-model-bluish-teal-1707151706460.png?q=80", available: true },
  { name: "TVS Ntorq 125", category: "bike", model: "Ntorq 125", year: 2022, pricePerDay: 670, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Rajahmundry.", city: "Rajahmundry", imageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/102709/ntorq-125-left-rear-three-quarter.jpeg?isig=0&q=80", available: true },
  { name: "Aprilia SR 160", category: "bike", model: "SR 160", year: 2023, pricePerDay: 800, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Kakinada.", city: "Kakinada", imageUrl: "https://apriliaindia.com/images/SR_160_Race.jpg", available: true },
  { name: "Honda Dio", category: "bike", model: "Dio", year: 2021, pricePerDay: 590, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Anantapur.", city: "Anantapur", imageUrl: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/201061/dio-125-right-front-three-quarter.jpeg?isig=0", available: true },
  { name: "Vespa SXL 150", category: "bike", model: "SXL 150", year: 2022, pricePerDay: 750, transmission: "Automatic", fuelType: "Petrol", seats: 2, description: "Located in Andhra Pradesh, Kurnool.", city: "Kurnool", imageUrl: "https://imgd.aeplcdn.com/1056x594/n/bw/models/colors/vespa-select-model-white-1683718934261.jpg?q=80", available: true },
  { name: "Ola S1 Air", category: "bike", model: "S1 Air", year: 2024, pricePerDay: 900, transmission: "Automatic", fuelType: "Electric", seats: 2, description: "Located in Andhra Pradesh, Kadapa.", city: "Kadapa", imageUrl: "https://images.timesdrive.in/photo/msid-151057203,thumbsize-399090/151057203.jpg", available: true },

        
    ];

    await Vehicle.insertMany(newBikes);
    console.log(`✅ Added ${newBikes.length} bikes (scooties under bike category).`);
    return res.json({ message: "Bikes added successfully", count: newBikes.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to add bikes", details: err.message });
  }
});
export default router;