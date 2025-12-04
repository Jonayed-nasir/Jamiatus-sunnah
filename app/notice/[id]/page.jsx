import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
async function getNotice(id) {
  try {
    const res = await fetch(`https://jamiatussunnah.onrender.com/post/api/${id}/`, {
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    return null; // অথবা 404 page redirect করতে পারো
  }
}


export default async function NoticeDetails({ params }) {
  const notice = await getNotice(params.id);

  const formattedDate = new Date(notice.created_at || notice.date).toLocaleDateString('bn-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Back Button */}
      <Link
        href="/notice"
        className="flex items-center text-blue-500 hover:underline mb-6"
      >
        <ArrowLeft className="mr-2" size={20} /> Back
      </Link>

      {/* Notice Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        {notice.title}
      </h1>

      {/* Published Date */}
      <p className="text-gray-500 text-sm mb-6">
        প্রকাশের তারিখ: {formattedDate}
      </p>

      {/* Notice Content */}
      <div className="prose dark:prose-invert max-w-full mb-6">
        {notice.content}
      </div>

      {/* Attachment */}
      {notice.attachment && (
        <div className="mt-6">
          <Link
            href={notice.attachment}
            target="_blank"
            className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded transition-all duration-300"
          >
            Attachment Download
          </Link>
        </div>
      )}
    </div>
  );
}
