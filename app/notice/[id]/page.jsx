import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function getNotice(id) {
  try {
    const res = await fetch(
      `https://jamiatussunnah.onrender.com/post/api/${id}/`,
      { cache: 'no-store' }
    );

    if (!res.ok) return null;

    return res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
}

export default async function NoticeDetails({ params }) {
  const notice = await getNotice(params.id);

  // ❌ notice null হলে crash যেত → এখন handled
  if (!notice) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Notice not found</h2>

        <Link
          href="/notice"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(
    notice.created_at || notice.date
  ).toLocaleDateString('bn-BD', {
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

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        {notice.title}
      </h1>

      {/* Date */}
      <p className="text-gray-500 text-sm mb-6">
        প্রকাশের তারিখ: {formattedDate}
      </p>

      {/* Content */}
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

