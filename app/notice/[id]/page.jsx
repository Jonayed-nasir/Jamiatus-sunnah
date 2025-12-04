// // app/notice/[id]/page.jsx
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { notFound } from "next/navigation";

// async function getNotice(id) {
//   try {
//     const res = await fetch(`https://jamiatussunnah.onrender.com/post/api/${id}/`, {
//       cache: "no-store",
//     });
//     if (!res.ok) return null; // ID না থাকলে null
//     return res.json();
//   } catch (err) {
//     console.error("Fetch error:", err);
//     return null;
//   }
// }

// export default async function NoticeDetails({ params }) {
//   const { id } = params;
//   // console.log("Fetching notice ID:", id);
//   console.log(params);

//   // 🔹 যদি ID না থাকে বা খালি হয়
//   if (!id) notFound();

//   // 🔹 API থেকে নোটিশ ফেচ
//   const notice = await getNotice(Number(id));

//   // 🔹 যদি নোটিশ না পাওয়া যায়
//   if (!notice) notFound();

//   // 🔹 created_at date format
//   const dateObj = new Date(notice.created_at);
//   const formattedDate = dateObj.toLocaleDateString('bn-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   });

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* Back Button */}
//       <Link href="/home" className="flex items-center text-blue-500 hover:underline mb-6">
//         <ArrowLeft className="mr-2" size={20} /> Back
//       </Link>

//       {/* Title */}
//       <h1 className="text-3xl md:text-4xl font-bold mb-4">{notice.title}</h1>

//       {/* Date */}
//       <p className="text-gray-500 text-sm mb-6">{formattedDate}</p>

//       {/* Content */}
//       <div dangerouslySetInnerHTML={{ __html: notice.content }} className="prose max-w-none text-gray-800" />

//       {/* Attachment */}
//       {notice.attachment && (
//         <Link
//           href={notice.attachment}
//           target="_blank"
//           className="mt-6 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Download Attachment
//         </Link>
//       )}
//     </div>
//   );
// }
