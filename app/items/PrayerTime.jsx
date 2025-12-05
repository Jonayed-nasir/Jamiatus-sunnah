// "use client";
// import { useEffect, useState } from "react";

// export default function PrayerTime() {
//   const [timings, setTimings] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const LAT = 23.8103;  // Dhaka latitude
//   const LON = 90.4125;  // Dhaka longitude
//   const METHOD = 2;      // Muslim World League
//   const SCHOOL = 1;      // Hanafi
//   const API_KEY = "S1b3uezqxs5KGBO0WapVJXJP9EgL3LdNxtzmUBclj31671vv"; // IslamicAPI key

//   const fallback = {
//     Fajr: "05:00",
//     Dhuhr: "12:30",
//     Asr: "15:45",
//     Maghrib: "18:00",
//     Isha: "19:15",
//   };

//   useEffect(() => {
//     async function fetchPrayerTimes() {
//       try {
//         const res = await fetch(
//           `https://islamicapi.com/api/v1/prayer-time/?lat=${LAT}&lon=${LON}&method=${METHOD}&school=${SCHOOL}&api_key=${API_KEY}`
//         );
//         if (!res.ok) throw new Error("API fetch failed");
//         const data = await res.json();
//         setTimings(data.data.timings);
//       } catch (err) {
//         console.error("API error, using fallback:", err);
//         setTimings(fallback);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPrayerTimes();
//   }, []);

//   if (loading) return <p className="text-center py-5">Loading prayer times...</p>;

//   return (
//     <div className="max-w-md mx-auto p-5 bg-white shadow rounded mt-5">
//       <h2 className="text-2xl font-bold mb-4">আজকের নামাজের সময়</h2>
//       <ul className="space-y-2 text-gray-700">
//         {Object.entries(timings).map(([prayer, time]) => (
//           <li key={prayer}>
//             <span className="font-semibold">{prayer}:</span> {time}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
