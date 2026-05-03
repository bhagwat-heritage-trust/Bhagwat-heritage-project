import { memo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type IconName =
  | "aarti"
  | "bhajan"
  | "book"
  | "clock"
  | "diya"
  | "donate"
  | "family"
  | "gallery"
  | "hands"
  | "help"
  | "location"
  | "map"
  | "parking"
  | "phone"
  | "prasad"
  | "seva"
  | "shield"
  | "strength"
  | "temple"
  | "volunteer"
  | "washroom"
  | "water";

type InfoItem = {
  icon: IconName;
  imageIcon?: string;
  title: string;
  text: string;
};

const HERO_IMAGE = "https://res.cloudinary.com/der8zinu8/image/upload/v1777802407/WhatsApp_Image_2026-05-03_at_3.19.44_PM_q7iukd.jpg";
const CONCEPT_IMAGE = "/assets/images/gallery/kashtabhanjan-hanuman.jpg";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Bhagwat%20Dham%20Shree%20Swaminarayan%20Mandir%20Koshturbad%20Rd%20Hospital%20Ward%20Chandrapur%20Maharashtra%20442402";
const MAP_EMBED =
  "https://www.google.com/maps?q=Shree%20Swaminarayan%20Mandir%20Hospital%20Ward%20Chandrapur%20Maharashtra%20442402&output=embed";
const CONTACT_PHONE = "+918668897445";
const CONTACT_DISPLAY = "+91-866-889-7445";
const CONTACT_EMAIL = "join@bhagwatheritage.org";
const DARSHAN_TIMING_ICON = "https://res.cloudinary.com/der8zinu8/image/upload/v1777032975/ChatGPT_Image_Apr_24_2026_05_42_35_PM_hwotsz.png";

const quickInfo: InfoItem[] = [
  {
    icon: "clock",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777567681/ChatGPT_Image_Apr_30_2026_10_16_04_PM_qssfl8.png",
    title: "Darshan Hours",
    text: "09:00 AM - 12:00 PM | 04:00 PM - 09:00 PM",
  },
  {
    icon: "location",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777567675/ChatGPT_Image_Apr_30_2026_10_16_31_PM_gbzhqw.png",
    title: "Location",
    text: "Dham Chandrapur, Maharashtra",
  },
  {
    icon: "diya",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777567679/ChatGPT_Image_Apr_30_2026_10_16_00_PM_jgplqt.png",
    title: "Special Days",
    text: "Tuesday & Saturday",
  },
  {
    icon: "hands",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536352/ChatGPT_Image_Apr_30_2026_01_33_24_PM_oothr1.png",
    title: "Main Seva",
    text: "Hanuman Paath, Aarti, Bhajan, Darshan",
  },
];

const significance: InfoItem[] = [
  {
    icon: "strength",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536354/ChatGPT_Image_Apr_30_2026_01_32_28_PM_akdenf.png",
    title: "Strength and Courage",
    text: "Inspires fearlessness, discipline, and inner stability.",
  },
  {
    icon: "shield",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050237/icon-character-building.svg",
    title: "Protection from Negativity",
    text: "Guides devotees toward faith, clarity, and spiritual protection.",
  },
  {
    icon: "temple",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536353/ChatGPT_Image_Apr_30_2026_01_33_16_PM_f7vnhz.png",
    title: "Devotion to Shri Ram",
    text: "Reminds every visitor of Hanuman Ji's complete surrender to Shri Ram.",
  },
  {
    icon: "seva",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536353/ChatGPT_Image_Apr_30_2026_01_33_30_PM_bcivpo.png",
    title: "Service and Humility",
    text: "Encourages seva bhav, humility, and righteous living.",
  },
];

const paathItems = [
  {
    title: "॥ श्री हनुमान चालीसा ॥",
    content:
      `॥ हनुमान चालीसा ॥
दोहा

श्रीगुरु चरण सरोज रज, निज मन मुकुर सुधारि।
बरनऊँ रघुवर बिमल जसु, जो दायक फल चारि॥

बुद्धिहीन तनु जानिके, सुमिरौं पवन कुमार।
बल बुद्धि विद्या देहु मोहिं, हरहु कलेश विकार॥

जय हनुमान ज्ञान गुण सागर। जय कपीस तिहुँ लोक उजागर॥1॥
रामदूत अतुलित बल धामा। अंजनि पुत्र पवनसुत नामा॥2॥
महाबीर विक्रम बजरंगी। कुमति निवार सुमति के संगी॥3॥
कंचन वरन विराज सुबेसा। कानन कुण्डल कुंचित केसा॥4॥
हाथ वज्र औ ध्वजा विराजे। काँधे मूँज जनेऊ साजे॥5॥
शंकर सुवन केसरी नंदन। तेज प्रताप महा जग वंदन॥6॥
विद्यावान गुणी अति चातुर। राम काज करिबे को आतुर॥7॥
प्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥8॥
सूक्ष्म रूप धरि सियहिं दिखावा। विकट रूप धरि लंक जरावा॥9॥
भीम रूप धरि असुर संहारे। रामचंद्र के काज संवारे॥10॥
लाय सजीवन लखन जियाये। श्रीरघुवीर हरषि उर लाये॥11॥
रघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरतहि सम भाई॥12॥
सहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कंठ लगावैं॥13॥
सनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥14॥
यम कुबेर दिगपाल जहाँ ते। कवि कोविद कहि सके कहाँ ते॥15॥
तुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राज पद दीन्हा॥16॥
तुम्हरो मंत्र विभीषण माना। लंकेश्वर भए सब जग जाना॥17॥
युग सहस्र योजन पर भानू। लील्यो ताहि मधुर फल जानू॥18॥
प्रभु मुद्रिका मेलि मुख माहीं। जलधि लांघि गए अचरज नाहीं॥19॥
दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥20॥
राम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥21॥
सब सुख लहै तुम्हारी सरना। तुम रक्षक काहू को डरना॥22॥
आपन तेज सम्हारो आपै। तीनों लोक हाँक ते काँपै॥23॥
भूत पिशाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥24॥
नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥25॥
संकट ते हनुमान छुड़ावै। मन क्रम वचन ध्यान जो लावै॥26॥
सब पर राम तपस्वी राजा। तिन के काज सकल तुम साजा॥27॥
और मनोरथ जो कोई लावै। सोइ अमित जीवन फल पावै॥28॥
चारों जुग परताप तुम्हारा। है प्रसिद्ध जगत उजियारा॥29॥
साधु संत के तुम रखवारे। असुर निकंदन राम दुलारे॥30॥
अष्ट सिद्धि नौ निधि के दाता। अस बर दीन जानकी माता॥31॥
राम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥32॥
तुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥33॥
अंत काल रघुबर पुर जाई। जहाँ जन्म हरि भक्त कहाई॥34॥
और देवता चित्त न धरई। हनुमत सेइ सर्व सुख करई॥35॥
संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥36॥
जय जय जय हनुमान गोसाईं। कृपा करहु गुरुदेव की नाईं॥37॥
जो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई॥38॥
जो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा॥39॥
तुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा॥40॥

दोहा\nपवन तनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप॥`,
  },
  {
    title: "॥ श्री हनुमान आरती ॥",
    content:
      `॥ श्री हनुमान आरती ॥

आरती कीजै हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

जाके बल से गिरिवर काँपे।
रोग दोष जाके निकट न झाँके॥

अंजनि पुत्र महाबलदायी।
संतन के प्रभु सदा सहायी॥

दे बीरा रघुनाथ पठाए।
लंका जारि सिया सुधि लाए॥

लंका सो कोट समुद्र सी खाई।
जात पवनसुत बार न लाई॥

लंका जारि असुर संहारे।
सियाराम जी के काज संवारे॥

लक्ष्मण मूर्छित पड़े सकारे।
आनि सजीवन प्राण उबारे॥

पैठि पाताल तोरि जमकारे।
अहिरावण की भुजा उखारे॥

बाएँ भुजा असुर दल मारे।
दाहिने भुजा संतजन तारे॥

सुर नर मुनि आरती उतारें।
जय जय जय हनुमान उचारें॥

कंचन थार कपूर लौ छाई।
आरती करत अंजना माई॥

जो हनुमान जी की आरती गावे।
बसि बैकुंठ परम पद पावे॥

लंका विध्वंस किए रघुराई।
तुलसीदास स्वामी कीर्ति गाई॥`,
  },
  {
    title: "॥ जय कपि बलवंता ॥",
    content:
      `॥ जय कपि बलवंता ॥

जय कपि बलवंता,
प्रभु जय कपि बलवंता,
सुर नर मुनिजन वंदित,
सुर नर मुनिजन वंदित,
पदरज हनुमंता,
जय कपि बळवंता,
प्रभु जय कपि बलवंता।।

प्रौढ़ प्रताप पवनसुत,
त्रिभुवन जयकारी,
प्रभु त्रिभुवन जयकारी,
असुर रिपु मद गंजन,
असुर रिपु मद गंजन,
भय संकट हारी,
जय कपि बळवंता,
प्रभु जय कपि बलवंता।।

भूत पिशाच विकट ग्रह,
पीड़त नही जम्पे,
प्रभु पीड़त नही जम्पे,
हनुमंत हाक सुनीने,
हनुमंत हाक सुनीने,
थर थर थर कंपे,
प्रभु थर थर थर कंपे,
जय कपि बळवंता,
प्रभु जय कपि बलवंता।।

रघुवीर सहाय ओढंग्यो,
सागर आती भारी,
प्रभु सागर आती भारी,
सीता सोध ले आए,
सीता सोध ले आए,
कपि लंका जारी,
जय कपि बळवंता,
प्रभु जय कपि बलवंता।।

राम चरण रतिदायक,
शरणागत त्राता,
प्रभु शरणागत त्राता,
प्रेमानंद कहे हनुमत,
प्रेमानंद कहे हनुमंत,
वांछित फल दाता,
जय कपि बळवंता,
प्रभु जय कपि बलवंता।।

जय कपि बळवंता,
प्रभु जय कपि बळवंता,
सुर नर मुनिजन वंदित,
सुर नर मुनिजन वंदित,
पदरज हनुमंता,
जय कपि बळवंता,
प्रभु जय कपि बलवंता।।`,
  },
  {
    title: "॥ नीति प्रवीण स्तोत्रम ॥",
    content:
      `॥ नीति प्रवीण स्तोत्रम ॥

१.
नीतिप्रवीण निगमागमशास्त्रबुद्धे राजाधिराज रघुकुंजवराधिराज!
सिंदूरचर्चितकलेवर केंद्र श्री रामदूत हनुमन हर संकटम में॥
सीता निमित्त रघुत्तम भूरिकष्ट-प्रोत्सारणैक सहायता निर्दयात पति राधने॥
श्री रामदूत हनुमन हर संकटम में॥

२.
दुर्वार्यरावणविसर्जितशक्तिघात-कंठालक्ष्मणसुखातजीववल्ल!
द्रोणाचलनयननन्दितरामपक्ष! श्री रामदूत हनुमन हर संकटम में॥

३.
रामागमोक्तितरिताळितबंध्वयोग-दुःखाब्धिमग्नभरतार्पितपारिबर्ह!
रामांध्रिपद्ममधुपी भवदन्तरात्मन्! श्री रामदूत हनुमन हर संकटम में॥

४.
वातात्मकेसरिमहाकपिराट्तदीय-भार्यांजनीपुत्रतपःफलपुत्रभाव!
तार्क्ष्योपमोचितवपुर्बलतीव्रवेग! श्री रामदूत हनुमन हर संकटम में॥

५.
नानाभिचारिकविसृष्टसवीरकृत्या-विद्रावणारुणसमीक्षणदुष्प्रधर्ष!
रोगघ्नसत्सुतदवित्तदमन्रत्रजाप! श्री रामदूत हनुमन हर संकटम में॥

६.
यन्नामधेयपदकश्रुतिमात्रतोपि ये ब्रह्मराक्षसपिशाचगणाश्चभूता!
ते मारिकाश्चसभयं ह्यपयान्ति सत्वं! श्री रामदूत हनुमन हर संकटम में॥

७.
त्वं भक्तमानससमीप्सितपूर्तिशक्तो दीनस्य दुर्मदसपत्नभयार्तिभाज!
इष्टं ममापि परिपूरय पूर्णकाम! श्री रामदूत हनुमन हर संकटम में॥`,
  },
];

const blessingCards: InfoItem[] = [
  { icon: "shield", title: "Removal of Negativity", text: "Freedom from suffering, disease and negative forces." },
  { icon: "strength", title: "Strength & Prosperity", text: "Blessings of courage, wisdom and growing prosperity." },
  { icon: "family", title: "Fulfilled Wishes", text: "A path to inner courage, wish fulfillment and steady purpose." },
  { icon: "seva", title: "Divine Awakening", text: "Awakens devotion, seva bhav and divine energy within." },
  { icon: "temple", title: "Protection & Peace", text: "Powerful protection from negative forces and calm stability." },
  { icon: "water", title: "Spiritual Growth", text: "Peace, spiritual growth and stability for every devotee." },
];

const installationHistory = [
  { year: "2008", title: "Construction Began", description: "The sacred dham foundation was laid with devotion and community support." },
  { year: "2010", title: "Completion on Hanuman Jayanti", description: "The 63-foot Hanuman Murti was consecrated on the auspicious day of Hanuman Jayanti." },
  { year: "Mahahanumat Yagya", title: "3.5 Lakh Offerings", description: "A Nav-kundiya yagya led by Kashi scholars, offering deep Vedic energy." },
  { year: "Sacred Rituals", title: "Akhand Paath & Chalisa", description: "108 Akhand Ramayan Paath and 1.25 crore Hanuman Chalisa chants magnified the dham's power." },
  { year: "Pran Pratishtha", title: "Vedic Installation", description: "Installed with full Vedic rituals using a crane and devoted ceremony." },
  { year: "Divine Illumination", title: "LED Spiritual Aura", description: "Modern LED lighting enhances the mandir's spiritual atmosphere after dusk." },
];

const dailySevaTimeline = [
  { title: "Morning", time: "07:00 – 08:00", description: "Abhishek, Shringar and Aarti for the sacred Hanuman Murti." },
  { title: "Darshan", time: "08:00 – 12:00", description: "Devotee prayers, offerings and focused darshan time." },
  { title: "Midday", time: "12:00", description: "Maha Bhog Prasad offered to all devotees." },
  { title: "Daily Seva", time: "Throughout the day", description: "Garland seva, besan laddoo prasad distribution and seva support." },
  { title: "Evening", time: "19:00", description: "Sandhya Aarti and Bhog for peace and devotion." },
  { title: "Special Days", time: "Tue & Sat", description: "Sundarkand Paath and Mahaprasad on dedicated devotional days." },
];

const specialPujaCards: InfoItem[] = [
  { icon: "book", title: "108 Hanuman Chalisa Paath", text: "Collective recitation for strength, protection and peace." },
  { icon: "shield", title: "Panchmukhi Hanuman Kavach", text: "Sacred protection through chanting and ritual energy." },
  { icon: "diya", title: "Vadvanal Stotra", text: "Special stotra for divine power and spiritual upliftment." },
  { icon: "aarti", title: "Hanuman Bahuk", text: "Austere prayer for relief, healing and divine blessing." },
  { icon: "bhajan", title: "Bajrang Baan Paath", text: "Powerful recitation for courage and removal of obstacles." },
  { icon: "strength", title: "Maha Mantra Japa & Yagya", text: "Continuous mantra chanting and yagya for deep spiritual benefit." },
  { icon: "family", title: "Personal / Family Puja", text: "Dedicated rituals for families, birthdays and special intentions." },
];

const participationOptions = [
  { icon: "volunteer", title: "Personal Puja", text: "Arrange a focused personal puja for your family and household." },
  { icon: "family", title: "Family Rituals", text: "Celebrate anniversaries, birthdays and family milestones with sacred seva." },
  { icon: "diya", title: "Birthday / Anniversary Puja", text: "Offer a sacred sankalp for birthdays, anniversaries and family occasions." },
  { icon: "hands", title: "Bhajan & Kirtan Seva", text: "Join devotional music, bhajan and kirtan seva at the dham." },
  { icon: "prasad", title: "Mahaprasad Seva", text: "Share blessed prasad with the whole community." },
  { icon: "aarti", title: "Sundarkand Paath आयोजन", text: "Participate in collective Sundarkand recitation events." },
];

const socialConnectCards = [
  { icon: "/icons/icon-youtube.svg", title: "YouTube", description: "Watch Live Darshan, Aarti & Ram Katha.", to: "/links/youtube", button: "Subscribe Now", accent: "bg-[#ff0000]/10 text-[#c12b26]" },
  { icon: "/icons/icon-facebook.svg", title: "Facebook", description: "Get updates on events, seva and announcements.", to: "/links/facebook", button: "Follow Page", accent: "bg-[#1877f2]/10 text-[#154ea3]" },
  { icon: "/icons/icon-instagram.svg", title: "Instagram", description: "Explore devotional visuals and temple moments.", to: "/links/instagram", button: "Follow Us", accent: "bg-[#f7b12b]/10 text-[#a86f1a]" },
  { icon: "/icons/icon-whatsapp.svg", title: "WhatsApp", description: "Receive direct updates and join satsang groups.", to: "/links/whatsapp", button: "Join WhatsApp", accent: "bg-[#25d366]/10 text-[#1f8d4b]" },
];

const programs = [
  {
    icon: "temple" as IconName,
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471880/ChatGPT_Image_Apr_29_2026_07_39_45_PM_lsplqf.png",
    title: "Hanuman Jayanti Mahotsav",
    frequency: "Annual Grand Celebration",
    text: "Special aarti, bhajan, prasad seva and large-scale devotee participation.",
  },
  {
    icon: "book" as IconName,
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032975/ChatGPT_Image_Apr_24_2026_05_42_35_PM_hwotsz.png",
    title: "Sundarkand Paath Sabha",
    frequency: "Every Saturday Evening",
    text: "Collective Sundarkand recitation for peace, courage and spiritual upliftment.",
  },
  {
    icon: "aarti" as IconName,
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032971/ChatGPT_Image_Apr_24_2026_05_43_04_PM_xi8530.png",
    title: "Mangal Aarti Mahaseva",
    frequency: "Every Tuesday Morning",
    text: "Special Tuesday Hanuman aarti and seva participation.",
  },
  {
    icon: "bhajan" as IconName,
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029120/ChatGPT_Image_Apr_24_2026_04_39_35_PM_lyi1ew.png",
    title: "Shri Ram Bhajan Sandhya",
    frequency: "Monthly Devotional Event",
    text: "Bhajan, kirtan and satsang dedicated to Shri Ram and Hanuman Ji.",
  },
];

const sadhana: InfoItem[] = [
  {
    icon: "diya",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193608/ChatGPT_Image_Apr_26_2026_01_45_08_PM_v3dyke.png",
    title: "Morning",
    text: "Naam Smaran & Hanuman Chalisa",
  },
  {
    icon: "diya",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193609/ChatGPT_Image_Apr_26_2026_01_44_39_PM_tm24fo.png",
    title: "Tuesday",
    text: "Mangal Aarti & Seva Sankalp",
  },
  {
    icon: "diya",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777567681/ChatGPT_Image_Apr_30_2026_10_16_04_PM_qssfl8.png",
    title: "Saturday",
    text: "Sundarkand Paath",
  },
  {
    icon: "diya",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777567680/ChatGPT_Image_Apr_30_2026_10_16_08_PM_uzxkwk.png",
    title: "Evening",
    text: "Deep Daan & Shanti Prarthana",
  },
];

const facilities: InfoItem[] = [
  {
    icon: "parking",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777608795/ChatGPT_Image_May_1_2026_09_42_45_AM_lagebp.png",
    title: "Parking Guidance",
    text: "Basic guidance for devotee vehicles and arrival flow.",
  },
  {
    icon: "prasad",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777191414/ChatGPT_Image_Apr_26_2026_01_44_55_PM_mzcl2w.png",
    title: "Prasad Seva",
    text: "Prasad support during scheduled seva and utsav days.",
  },
  {
    icon: "help",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776950454/WhatsApp_Image_2026-04-23_at_18.48.24_1_t7lr6r.jpg",
    title: "Senior Citizen Support",
    text: "Assistance guidance for elders during darshan.",
  },
  {
    icon: "volunteer",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097561/ChatGPT_Image_Apr_25_2026_11_42_05_AM_bij6a0.png",
    title: "Group Visit Assistance",
    text: "Coordination support for group visits and satsang groups.",
  },
  {
    icon: "water",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776888501/ChatGPT_Image_Apr_23_2026_01_37_00_AM_yvrlwv.png",
    title: "Drinking Water",
    text: "Water facility support for devotees.",
  },
  {
    icon: "hands",
    imageIcon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967402/g5_ilegzw.png",
    title: "Volunteer Helpdesk",
    text: "Sevaks guide devotees for darshan, timing and facilities.",
  },
];

const gallery = [
  ["Hanuman Murti front view", "/images/hanuman.jpg"],
  ["Evening aarti", "/images/hanuman2.JPG"],
  ["Devotees in darshan", "/images/hanuman3.JPG"],
  ["Sundarkand paath", "/images/hanuman4.JPG"],
  ["Festival celebration", "/images/hanuman5.JPG"],
  ["Temple premises", "/images/hanuman-banner-01.jpg"],
];

const sectionClass = "mx-auto max-w-[1180px] px-4 py-10 sm:py-14";
const cardClass =
  "rounded-[24px] border border-[#ecd0a4] bg-white/95 p-5 shadow-[0_16px_34px_rgba(106,63,25,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(106,63,25,0.16)]";

function Icon({ name }: { name: IconName }) {
  const p = "stroke-current";
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
  };
  const paths: Record<IconName, ReactNode> = {
    aarti: <><path className={p} d="M12 3c2.5 2.6 4 5 4 7.2A4 4 0 0 1 8 10.2C8 8 9.5 5.6 12 3Z" /><path className={p} d="M5 19h14M8 15h8" /></>,
    bhajan: <><path className={p} d="M9 18V5l10-2v13" /><circle className={p} cx="7" cy="18" r="2" /><circle className={p} cx="17" cy="16" r="2" /></>,
    book: <><path className={p} d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21V5.5Z" /><path className={p} d="M5 5.5V21M9 7h7M9 11h7" /></>,
    clock: <><circle className={p} cx="12" cy="12" r="8" /><path className={p} d="M12 8v4l3 2" /></>,
    diya: <><path className={p} d="M12 3c2.4 2.5 3.8 4.7 3.8 6.8a3.8 3.8 0 0 1-7.6 0C8.2 7.7 9.6 5.5 12 3Z" /><path className={p} d="M5 18h14M8 14h8" /></>,
    donate: <><path className={p} d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" /></>,
    family: <><circle className={p} cx="8" cy="8" r="2.5" /><circle className={p} cx="16" cy="8" r="2.5" /><path className={p} d="M4 19a4 4 0 0 1 8 0M12 19a4 4 0 0 1 8 0" /></>,
    gallery: <><rect className={p} x="4" y="5" width="16" height="14" rx="2" /><path className={p} d="m7 15 3-3 2 2 3-4 3 5" /><circle className={p} cx="9" cy="9" r="1" /></>,
    hands: <><path className={p} d="M8 12l4 3 4-3" /><path className={p} d="M5 12h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4Z" /><path className={p} d="M8 10V6M16 10V6" /></>,
    help: <><circle className={p} cx="12" cy="12" r="8" /><path className={p} d="M9.5 10a2.5 2.5 0 1 1 4.3 1.7c-.9.8-1.8 1.3-1.8 2.8" /><path className={p} d="M12 17h.01" /></>,
    location: <><path className={p} d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle className={p} cx="12" cy="10" r="2.5" /></>,
    map: <><path className={p} d="M9 18 4 20V6l5-2 6 2 5-2v14l-5 2-6-2Z" /><path className={p} d="M9 4v14M15 6v14" /></>,
    parking: <><rect className={p} x="5" y="4" width="14" height="16" rx="3" /><path className={p} d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" /></>,
    phone: <><path className={p} d="M7 4h3l1.5 4-2 1.5a14.6 14.6 0 0 0 5 5l1.5-2L20 14v3a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 5 6.2 2 2 0 0 1 7 4Z" /></>,
    prasad: <><path className={p} d="M5 13h14" /><path className={p} d="M7 13a5 5 0 0 0 10 0" /><path className={p} d="M9 9c0-1.4 1.1-2.5 2.5-2.5" /></>,
    seva: <><path className={p} d="M8 12l4 3 4-3" /><path className={p} d="M6 10V8a2 2 0 0 1 2-2h1.5L12 8l2.5-2H16a2 2 0 0 1 2 2v2" /></>,
    shield: <><path className={p} d="M12 3l7 3v5c0 4.2-2.6 7.7-7 10-4.4-2.3-7-5.8-7-10V6l7-3Z" /><path className={p} d="m9.5 11.5 1.7 1.7 3.3-3.7" /></>,
    strength: <><path className={p} d="M7 15c-1-1-1.5-2.2-1.5-3.8V9h4v2.2c0 .8.7 1.5 1.5 1.5h2c.8 0 1.5-.7 1.5-1.5V9h4v2.2c0 1.6-.5 2.8-1.5 3.8" /><path className={p} d="M8 21h8M12 13v8" /></>,
    temple: <><path className={p} d="M3 20h18" /><path className={p} d="M5 10h14" /><path className={p} d="M7 10v10M12 10v10M17 10v10" /><path className={p} d="M4 10l8-6 8 6" /></>,
    volunteer: <><circle className={p} cx="12" cy="7" r="3" /><path className={p} d="M5 21a7 7 0 0 1 14 0" /><path className={p} d="m9 14 3 3 3-3" /></>,
    washroom: <><path className={p} d="M8 21v-7H6l2-7h3l2 7h-2v7" /><path className={p} d="M16 21V7" /><circle className={p} cx="9.5" cy="4" r="1.5" /><circle className={p} cx="16" cy="4" r="1.5" /></>,
    water: <><path className={p} d="M12 3s6 6.2 6 10a6 6 0 1 1-12 0c0-3.8 6-10 6-10Z" /><path className={p} d="M9.5 14.5A3 3 0 0 0 14 16" /></>,
  };

  return <svg {...common} stroke="currentColor">{paths[name]}</svg>;
}

function IconBadge({ name }: { name: IconName }) {
  return (
    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#efcf9c] bg-[#fff2dc] text-[#c86b17] shadow-[0_10px_22px_rgba(106,63,25,0.10)]">
      <Icon name={name} />
    </span>
  );
}

function SectionHeader({ title, subtitle, center = false }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto mb-8 max-w-3xl text-center" : "mb-8 max-w-3xl"}>
      <h2 className="text-3xl font-black leading-tight text-[#113f50] sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base leading-7 text-[#6a5948] sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

function InfoCard({ item }: { item: InfoItem }) {
  return (
    <article className={cardClass}>
      {item.imageIcon ? (
        <span className="mx-auto flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-full">
          <img src={item.imageIcon} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
        </span>
      ) : (
        <IconBadge name={item.icon} />
      )}
      <h3 className={`mt-4 text-xl font-black text-[#113f50] ${item.imageIcon ? "text-center" : ""}`}>{item.title}</h3>
      <p className={`mt-3 text-base leading-7 text-[#5f5042] ${item.imageIcon ? "text-center" : ""}`}>{item.text}</p>
    </article>
  );
}

function CtaLink({ to, children, tone = "primary" }: { to: string; children: ReactNode; tone?: "primary" | "secondary" | "teal" }) {
  const base = "inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5";
  const tones = {
    primary: "bg-[#f39718] text-white shadow-[0_14px_28px_rgba(196,104,19,0.24)] hover:bg-[#df8410]",
    secondary: "border border-[#d8943a] bg-white/90 text-[#7a4212] hover:bg-[#fff1da]",
    teal: "bg-[#0f7f84] text-white shadow-[0_14px_28px_rgba(15,127,132,0.20)] hover:bg-[#0b6970]",
  };

  if (to.startsWith("http") || to.startsWith("tel:") || to.startsWith("mailto:")) {
    return <a href={to} target={to.startsWith("http") ? "_blank" : undefined} rel={to.startsWith("http") ? "noreferrer" : undefined} className={`${base} ${tones[tone]}`}>{children}</a>;
  }

  return <Link to={to} className={`${base} ${tones[tone]}`}>{children}</Link>;
}

export default memo(function HanumanMurtiPage() {
  const [activeImage, setActiveImage] = useState<(typeof gallery)[number] | null>(null);
  const [openPaath, setOpenPaath] = useState<number | null>(null);

  usePageMeta(
    "Kashtbhanjan Hanuman Chandrapur | 63ft Hanuman Murti Darshan",
    "Experience divine darshan of 63ft Maharudra Kashtbhanjan Hanuman Ji in Chandrapur. Join puja, aarti, Sundarkand paath and seva online.",
  );

  const [openPujaModal, setOpenPujaModal] = useState(false);

  return (
    <div className="min-h-screen scroll-smooth bg-[linear-gradient(180deg,#fff6ea_0%,#fffdf8_45%,#fce6ee_100%)] pb-24 text-[#312214] md:pb-0">
      <section className="px-4 pt-6 sm:pt-8">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[34px] border border-[#eccb95] bg-[#fff0dc] shadow-[0_26px_70px_rgba(111,60,23,0.16)]">
          <div className="relative min-h-[520px] sm:min-h-[680px] lg:min-h-[760px]">
            <img src={HERO_IMAGE} alt="Maharudra Kashtbhanjan Hanuman Ji murti darshan" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 flex items-end justify-center bg-[linear-gradient(180deg,rgba(49,34,20,0.04)_0%,rgba(49,34,20,0.12)_46%,rgba(49,34,20,0.38)_100%)] px-5 pb-8 pt-24 sm:px-9 sm:pb-10 lg:px-12 lg:pb-12">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-[20px] font-black leading-tight text-[#f8d982] drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)] sm:text-[38px] lg:text-[50px]">
                  Jay Shree Maharudra Kashtbhanjan Hanuman Darshan
                </h1>
                <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-7 text-[#fff0d8] drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)] sm:text-xl sm:leading-8">
                  Experience devotion, strength, protection, courage and spiritual peace through the divine darshan of Hanuman Ji.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link to="#plan-visit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f39718] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(243,151,24,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#df8410]">
                    Plan Your Visit
                  </Link>
                  <Link to="#gallery" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1d6fb8] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(29,111,184,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#175c9b]">
                    View Gallery
                  </Link>
                  <Link to={ROUTES.donate} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c92f26] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(201,47,38,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a92821]">
                    Donate for Mandir Seva
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold text-[#4f3a1f]">
                  <a href="#introduction" className="rounded-full border border-[#ecd0a4] bg-white/80 px-4 py-2 transition hover:bg-[#fff4df]">Introduction</a>
                  <a href="#history" className="rounded-full border border-[#ecd0a4] bg-white/80 px-4 py-2 transition hover:bg-[#fff4df]">Installation History</a>
                  <a href="#blessings" className="rounded-full border border-[#ecd0a4] bg-white/80 px-4 py-2 transition hover:bg-[#fff4df]">Blessings</a>
                  <a href="#daily-seva" className="rounded-full border border-[#ecd0a4] bg-white/80 px-4 py-2 transition hover:bg-[#fff4df]">Daily Seva</a>
                  <a href="#special-puja" className="rounded-full border border-[#ecd0a4] bg-white/80 px-4 py-2 transition hover:bg-[#fff4df]">Special Puja</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="introduction" className="bg-[#fff7eb] px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-[30px] border border-[#f1d2a3] bg-white/90 p-8 shadow-[0_18px_42px_rgba(111,63,24,0.12)] sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b5f26]">Shri Maharudra Kashtbhanjan Hanuman Dham</p>
              <h2 className="mt-4 text-4xl font-black text-[#113f50] sm:text-5xl">Shri Maharudra Kashtbhanjan Hanuman Dham</h2>
              <p className="mt-6 text-base leading-8 text-[#5f5042] sm:text-lg">
                Across India, many divine idols have been स्थापित as centers of devotion, but in Central India, at Chandrapur (Chichpalli), Bhagwat Niketan Ashram, the sacred form of Shri Maharudra Kashtbhanjan Hanuman stands as a unique spiritual pilgrimage center.
              </p>
              <p className="mt-4 text-base leading-8 text-[#5f5042] sm:text-lg">
                Established through the tireless efforts of Bhagwat Acharya Sant Shri Manish Bhaiji Maharaj, this divine dham is dedicated to the welfare of devotees, removal of suffering, and protection of Dharma.
              </p>
              <p className="mt-4 text-base leading-8 text-[#5f5042] sm:text-lg">
                This sacred form of Hanuman Ji represents strength, devotion, seva and divine energy. Every devotee who visits experiences inner peace, spiritual strength, and divine blessings.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[30px] border border-[#f1d2a3] bg-white shadow-[0_18px_42px_rgba(111,63,24,0.12)]">
              <img src="/images/hanuman-murti-full.jpg" alt="Shri Maharudra Kashtbhanjan Hanuman Ji murti" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_24%)]" />
              <div className="pointer-events-none absolute right-6 top-6 h-24 w-24 rounded-full border border-white/50 bg-white/10 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickInfo.map((item) => <InfoCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid items-stretch gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
          <div className="flex h-full flex-col justify-between rounded-[28px] border border-[#ecd0a4] bg-white/95 p-6 shadow-[0_16px_34px_rgba(106,63,25,0.10)] sm:p-8">
            <SectionHeader title="63-Foot Hanuman Murti: A Symbol of Strength, Bhakti and Protection" />
            <p className="text-base leading-8 text-[#5f5042] sm:text-lg">
              The Maharudra Kashtbhanjan Hanuman Murti is envisioned as a powerful spiritual landmark where devotees experience courage, devotion, discipline and divine protection. This sacred form of Hanuman Ji inspires every visitor to overcome fear, negativity and weakness through faith, seva and naam-smaran.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {significance.map((item) => (
                <article key={item.title} className="rounded-[20px] border border-[#ecd0a4] bg-white/95 p-4 text-center shadow-[0_12px_26px_rgba(106,63,25,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(106,63,25,0.14)]">
                  <span className="mx-auto flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-full text-[#c86b17]">
                    {item.imageIcon ? (
                      <img src={item.imageIcon} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
                    ) : (
                      <Icon name={item.icon} />
                    )}
                  </span>
                  <h3 className="mt-4 text-base font-black leading-snug text-[#113f50]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5f5042]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="h-full overflow-hidden rounded-[30px] border border-[#ecd0a4] bg-white shadow-[0_16px_34px_rgba(106,63,25,0.10)]">
            <img src={CONCEPT_IMAGE} alt="63-foot Maharudra Kashtbhanjan Hanuman Murti concept visual" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section id="history" className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader title="Divine स्थापना & Pran Pratishtha" subtitle="A sacred journey of construction, yajna and the powerful Murti installation." center />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {installationHistory.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-[#ecd0a4] bg-white p-6 shadow-[0_18px_42px_rgba(106,63,25,0.10)]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ae7f29]">{item.year}</p>
                <h3 className="mt-4 text-2xl font-black text-[#113f50]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#5f5042]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-[1330px]">
          <h2 className="text-center text-4xl font-black leading-tight text-[#631ba4] sm:text-5xl">Hanuman Paath</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {paathItems.map((item, index) => {
              const isActive = openPaath === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setOpenPaath(isActive ? null : index)}
                  className={`min-h-14 rounded-full border px-7 py-3 text-base font-black transition duration-300 sm:text-xl ${
                    isActive
                      ? "border-transparent bg-[linear-gradient(90deg,#6d21a8,#e22972)] text-white shadow-[0_16px_34px_rgba(143,35,139,0.24)]"
                      : "border-[#f29ab3] bg-white text-[#6620a2] hover:-translate-y-0.5 hover:bg-[#fff6fa]"
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
          {openPaath !== null ? (
            <article className="mt-8 min-h-[520px] rounded-[22px] border border-[#e8c37e] bg-white px-7 py-8 shadow-[0_22px_48px_rgba(97,55,16,0.08)] sm:px-9 lg:px-12">
              <div key={openPaath} className="animate-[paathFade_420ms_ease-out] whitespace-pre-line text-xl leading-10 text-[#4d2d12]">
                {paathItems[openPaath].content}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader center title="Darshan Timings" subtitle="Our 63-foot Hanuman idol is a sacred center for thousands of devotees. Plan your visit according to darshan and aarti timings." />
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {[
            ["Morning Darshan", "09:00 AM - 12:00 PM", ["Morning Aarti"]],
            ["Evening Darshan", "04:00 PM - 09:00 PM", ["Evening Aarti"]],
          ].map(([title, time, badges]) => (
            <article key={title as string} className={`${cardClass} text-center`}>
              <span className="mx-auto flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-full">
                <img src={DARSHAN_TIMING_ICON} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
              </span>
              <h3 className="mt-4 text-2xl font-black text-[#113f50]">{title}</h3>
              <p className="mt-3 text-xl font-black text-[#c86b17]">{time}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {(badges as string[]).map((badge) => <span key={badge} className="rounded-full bg-[#fff0d6] px-3 py-1 text-xs font-bold text-[#9b5618]">{badge}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="daily-seva" className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader title="Complete Daily Seva System" subtitle="A full devotional rhythm for darshan, aarti, prasad and special seva." center />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-[#ecd0a4] bg-white p-6 shadow-[0_18px_42px_rgba(106,63,25,0.10)]">
              <div className="space-y-5">
                {dailySevaTimeline.map((item) => (
                  <div key={item.title} className="rounded-[22px] border border-[#f2d6a1] bg-[#fff7ee] p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ae7f29]">{item.time}</p>
                    <h3 className="mt-3 text-2xl font-black text-[#113f50]">{item.title}</h3>
                    <p className="mt-2 text-base leading-7 text-[#5f5042]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-[#ecd0a4] bg-[linear-gradient(135deg,#fff9eb_0%,#fff0d6_45%,#ffe9c9_100%)] p-6 shadow-[0_18px_42px_rgba(106,63,25,0.10)]">
              <img src="/images/hanuman-aarti-evening.jpg" alt="Evening aarti at Hanuman Dham" className="h-[420px] w-full rounded-[24px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section id="blessings" className={sectionClass}>
        <div className="rounded-[32px] border border-[#f3c98b] bg-[linear-gradient(135deg,#fff8df_0%,#ffe8b8_45%,#ffd7e7_100%)] p-6 shadow-[0_22px_54px_rgba(146,91,28,0.14)] sm:p-8">
          <SectionHeader center title="Blessings of Hanuman Bhakti" subtitle="Faith in Hanuman Ji brings strength, focus, humility and protection." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {blessingCards.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[#f0c587] bg-white/75 p-5 text-[#113f50] shadow-[0_14px_30px_rgba(146,91,28,0.10)] backdrop-blur">
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#5f5042]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader center title="Hanuman Utsav & Programs" />
        <div className="grid gap-5 md:grid-cols-2">
          {programs.map((item) => (
            <article key={item.title} className={`${cardClass} text-center`}>
              <span className="mx-auto flex h-[116px] w-[116px] items-center justify-center overflow-hidden rounded-full">
                <img src={item.imageIcon} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
              </span>
              <h3 className="mt-5 text-2xl font-black text-[#113f50]">{item.title}</h3>
              <span className="mt-3 inline-flex rounded-full bg-[#ffe7bd] px-3 py-1 text-xs font-bold text-[#a75a13]">{item.frequency}</span>
              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#5f5042]">{item.text}</p>
              <button className="mt-5 rounded-full bg-[#f39718] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#df8410]">Participate</button>
            </article>
          ))}
        </div>
      </section>

      <section id="special-puja" className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader title="Special Puja & Sacred Rituals" subtitle="Participate in powerful Hanuman puja, stotra, mantra and family rites." center />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {specialPujaCards.map((item) => (
                <article key={item.title} className={`${cardClass} text-center`}>
                  <span className="mx-auto flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full bg-[#fff3de] text-[#c86b17]">
                    <Icon name={item.icon as IconName} />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-[#113f50]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5f5042]">{item.text}</p>
                </article>
              ))}
            </div>
            <div className="rounded-[28px] border border-[#ecd0a4] bg-[linear-gradient(135deg,#fff8ea_0%,#fff5d4_45%,#fde2c7_100%)] p-6 shadow-[0_18px_42px_rgba(106,63,25,0.10)]">
              <h3 className="text-2xl font-black text-[#113f50]">Book Special Puja</h3>
              <p className="mt-4 text-base leading-7 text-[#5f5042]">
                Choose from powerful Hanuman rituals and sacred offerings to receive spiritual grace, healing and seva blessings.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => setOpenPujaModal(true)} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f39718] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(243,151,24,0.28)] transition duration-300 hover:bg-[#df8410]">
                  Book Special Puja
                </button>
                <CtaLink to={ROUTES.involved.contactUs} tone="secondary">Contact Seva Desk</CtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="rounded-[30px] border border-[#ecd0a4] bg-[linear-gradient(135deg,#fff0d2_0%,#fffdf8_58%,#fbe4ee_100%)] p-6 shadow-[0_16px_34px_rgba(106,63,25,0.10)] sm:p-8">
          <SectionHeader title="Daily Hanuman Sadhana" subtitle="Begin your day with 'Om Hanumate Namah', recite Hanuman Chalisa with devotion, and conclude with deep daan, seva sankalp and inner courage." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sadhana.map((item) => (
              <article key={item.title} className={`${cardClass} text-center`}>
                <span className="mx-auto flex h-[116px] w-[116px] items-center justify-center overflow-hidden rounded-full">
                  <img src={item.imageIcon} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
                </span>
                <h3 className="mt-4 text-xl font-black text-[#113f50]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#5f5042]">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink to={ROUTES.involved.volunteer}>Join Hanuman Sadhana</CtaLink>
            <CtaLink to={ROUTES.involved.contactUs} tone="secondary">Request Paath Seva</CtaLink>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader center title="Facilities for Devotees" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((item) => (
            <article key={item.title} className={`${cardClass} text-center`}>
              <span className="mx-auto flex h-[116px] w-[116px] items-center justify-center overflow-hidden rounded-full">
                {item.imageIcon ? (
                  <img src={item.imageIcon} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
                ) : (
                  <Icon name={item.icon} />
                )}
              </span>
              <h3 className="mt-5 text-xl font-black text-[#113f50]">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-sm text-base leading-7 text-[#5f5042]">{item.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-2xl border border-[#ecd0a4] bg-[#fff3df] p-4 text-center text-sm leading-7 text-[#6f553b]">
          Facilities may vary during large utsav days. Devotees are requested to follow mandir discipline and seva guidelines.
        </p>
      </section>

      <section id="participation" className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader title="How Devotees Can Participate" subtitle="Join the sacred dham through puja, seva, bhajan and Sundarkand offerings." center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {participationOptions.map((item) => (
              <article key={item.title} className={`${cardClass} text-center`}>
                <span className="mx-auto flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full bg-[#fff3de] text-[#c86b17]">
                  <Icon name={item.icon as IconName} />
                </span>
                <h3 className="mt-5 text-xl font-black text-[#113f50]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#5f5042]">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink to={ROUTES.involved.volunteer}>Join Seva</CtaLink>
            <button type="button" onClick={() => setOpenPujaModal(true)} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0f7f84] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,127,132,0.20)] transition duration-300 hover:bg-[#0b6970]">Book Puja</button>
          </div>
        </div>
      </section>

      <section id="social-connect" className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader title="Stay Connected with Maharudra Kashtbhanjan Hanuman Dham" subtitle="Join our spiritual community and stay updated with live darshan, aarti, bhajans and special events." center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {socialConnectCards.map((item) => (
              <a key={item.title} href={item.to} className="group overflow-hidden rounded-[24px] border border-[#ecd0a4] bg-white p-6 text-left shadow-[0_16px_34px_rgba(106,63,25,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(106,63,25,0.16)]">
                <div className="flex items-center gap-4">
                  <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.accent}`}>
                    <img src={item.icon} alt={`${item.title} icon`} className="h-8 w-8 object-contain" loading="lazy" />
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-[#113f50]">{item.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#5f5042]">{item.description}</p>
                <span className="mt-6 inline-flex rounded-full border border-[#f3d5a7] bg-[#fff4e3] px-4 py-2 text-xs font-bold text-[#8b5f26] transition group-hover:bg-[#fff7ed]">{item.button}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className={sectionClass}>
        <SectionHeader center title="Hanuman Darshan Gallery" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <button key={item[0]} type="button" onClick={() => setActiveImage(item)} className="group overflow-hidden rounded-[24px] border border-[#ecd0a4] bg-white text-left shadow-[0_16px_34px_rgba(106,63,25,0.10)]">
              <img src={item[1]} alt={item[0]} loading="lazy" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
              <p className="p-4 text-lg font-black text-[#113f50]">{item[0]}</p>
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <CtaLink to={ROUTES.media.photos} tone="teal">View Full Gallery</CtaLink>
        </div>
      </section>

      <section id="plan-visit" className={sectionClass}>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-[#ecd0a4] bg-white/95 p-6 shadow-[0_16px_34px_rgba(106,63,25,0.10)] sm:p-8">
            <SectionHeader title="Plan Your Visit" />
            <div className="space-y-4 text-base leading-7 text-[#5f5042]">
              <p><strong className="text-[#113f50]">Location:</strong> Bhagwat Dham - Shree Swaminarayan Mandir, Koshturbad Rd, Hospital Ward, Chandrapur, Maharashtra 442402</p>
              <p><strong className="text-[#113f50]">Contact:</strong> +91-866-889-7445</p>
              <p><strong className="text-[#113f50]">Email:</strong> join@bhagwatheritage.org</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaLink to={MAP_URL}>Open Google Maps</CtaLink>
              <CtaLink to={`tel:${CONTACT_PHONE}`} tone="teal">Contact Mandir Office</CtaLink>
              <CtaLink to={ROUTES.involved.contactUs} tone="secondary">Plan Group Visit</CtaLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-[28px] border border-[#ecd0a4] bg-white shadow-[0_16px_34px_rgba(106,63,25,0.10)]">
            <iframe title="Bhagwat Dham Hanuman Darshan map" src={MAP_EMBED} className="h-[420px] w-full border-0 lg:h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-[1240px] rounded-[30px] border border-[#ecd0a4] bg-[linear-gradient(135deg,#fff8dc_0%,#ffe99a_45%,#f0a14b_100%)] p-8 shadow-[0_18px_42px_rgba(106,63,25,0.12)]">
          <SectionHeader title="For Devotees Across the World" subtitle="Devotees from anywhere in the world can now connect with this divine dham through online darshan, seva participation and spiritual offerings." center />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink to="/links/youtube">Watch Live Darshan</CtaLink>
            <CtaLink to={ROUTES.involved.volunteer} tone="secondary">Join Online Seva</CtaLink>
            <CtaLink to={ROUTES.donate} tone="teal">Donate Now</CtaLink>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="relative overflow-hidden rounded-[34px] border border-[#e5b65d] bg-[linear-gradient(120deg,#ffcf73_0%,#f39718_48%,#a9471d_100%)] p-6 text-white shadow-[0_22px_54px_rgba(133,77,20,0.22)] sm:p-9">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/20" />
          <h2 className="text-3xl font-black sm:text-4xl">Participate in Hanuman Mandir Seva</h2>
          <p className="mt-3 max-w-4xl text-base leading-8 text-white/92 sm:text-lg">
            Support darshan arrangements, aarti seva, prasad seva, utsav seva, volunteer support and mandir development through your shraddha and seva.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink to={ROUTES.donate} tone="teal">Donate for Hanuman Seva</CtaLink>
            <CtaLink to={ROUTES.involved.volunteer} tone="secondary">Become a Volunteer</CtaLink>
            <CtaLink to={ROUTES.involved.sponsor} tone="secondary">Sponsor Utsav Seva</CtaLink>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="rounded-[30px] border border-[#e5b65d] bg-[linear-gradient(135deg,#fff8dc_0%,#ffe18d_48%,#f8b733_100%)] p-6 text-center shadow-[0_16px_34px_rgba(106,63,25,0.14)]">
          <h2 className="text-3xl font-black text-[#113f50]">Come for Darshan. Return with Courage, Peace and Devotion.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CtaLink to="#plan-visit">Plan Your Visit</CtaLink>
            <CtaLink to={ROUTES.donate} tone="teal">Donate</CtaLink>
            <CtaLink to="#gallery" tone="secondary">View Gallery</CtaLink>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ecd0a4] bg-white/95 px-3 py-2 shadow-[0_-8px_24px_rgba(68,41,18,0.12)] backdrop-blur md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a href={`tel:${CONTACT_PHONE}`} className="rounded-full bg-[#f39718] px-3 py-2 text-center text-xs font-bold text-white">Call</a>
          <a href={MAP_URL} target="_blank" rel="noreferrer" className="rounded-full border border-[#d8943a] px-3 py-2 text-center text-xs font-bold text-[#7a4212]">Directions</a>
          <Link to={ROUTES.donate} className="rounded-full bg-[#0f7f84] px-3 py-2 text-center text-xs font-bold text-white">Donate</Link>
        </div>
      </div>

      <a
        href="https://wa.me/918668897445"
        target="_blank"
        rel="noreferrer"
        aria-label="Connect on WhatsApp"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-[0_18px_34px_rgba(37,211,102,0.32)] transition hover:-translate-y-1 md:bottom-6"
      >
        <img src="/icons/icon-whatsapp.svg" alt="" className="h-9 w-9" />
      </a>

      {openPujaModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#24170b]/75 p-4" role="dialog" aria-modal="true" aria-labelledby="book-puja-title">
          <div className="w-full max-w-2xl rounded-[28px] border border-[#ecd0a4] bg-[#fffdf8] p-6 shadow-[0_24px_70px_rgba(34,20,8,0.28)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ae7f29]">Special Puja Booking</p>
                <h2 id="book-puja-title" className="mt-2 text-3xl font-black text-[#113f50]">Book Puja Seva</h2>
              </div>
              <button type="button" onClick={() => setOpenPujaModal(false)} className="rounded-full border border-[#e5c28d] px-4 py-2 text-sm font-bold text-[#7a4212] transition hover:bg-[#fff4df]">
                Close
              </button>
            </div>
            <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold text-[#5f5042]">
                  Devotee Name
                  <input type="text" name="name" className="mt-2 w-full rounded-2xl border border-[#e8c37e] bg-white px-4 py-3 text-base font-semibold text-[#113f50] outline-none focus:border-[#f39718]" placeholder="Full name" />
                </label>
                <label className="text-sm font-bold text-[#5f5042]">
                  Phone / WhatsApp
                  <input type="tel" name="phone" className="mt-2 w-full rounded-2xl border border-[#e8c37e] bg-white px-4 py-3 text-base font-semibold text-[#113f50] outline-none focus:border-[#f39718]" placeholder={CONTACT_DISPLAY} />
                </label>
              </div>
              <label className="text-sm font-bold text-[#5f5042]">
                Puja / Anushthan
                <select name="puja" className="mt-2 w-full rounded-2xl border border-[#e8c37e] bg-white px-4 py-3 text-base font-semibold text-[#113f50] outline-none focus:border-[#f39718]">
                  {specialPujaCards.map((item) => <option key={item.title}>{item.title}</option>)}
                </select>
              </label>
              <label className="text-sm font-bold text-[#5f5042]">
                Sankalp / Message
                <textarea name="message" rows={4} className="mt-2 w-full resize-none rounded-2xl border border-[#e8c37e] bg-white px-4 py-3 text-base font-semibold text-[#113f50] outline-none focus:border-[#f39718]" placeholder="Share family name, date, gotra or special intention" />
              </label>
              <div className="flex flex-wrap gap-3 pt-2">
                <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f39718] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(243,151,24,0.28)] transition hover:bg-[#df8410]">
                  Submit Puja Request
                </button>
                <a href="https://wa.me/918668897445" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0f7f84] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,127,132,0.20)] transition hover:bg-[#0b6970]">
                  Continue on WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {activeImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true">
          <button type="button" className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#113f50]" onClick={() => setActiveImage(null)}>
            Close
          </button>
          <figure className="max-h-[88vh] max-w-5xl overflow-hidden rounded-[24px] bg-white">
            <img src={activeImage[1]} alt={activeImage[0]} className="max-h-[76vh] w-full object-contain" />
            <figcaption className="p-4 text-center text-lg font-black text-[#113f50]">{activeImage[0]}</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
});
