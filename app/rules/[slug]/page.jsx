import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm'; // 1. এটি ইমপোর্ট করুন
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function RulePage({ params }) {
  const { slug } = await params; 

  const filePath = path.join(process.cwd(), 'content/rules', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  const title = slug.replace(/-/g, ' ');

  // 2. এখানে .use(remarkGfm) যুক্ত করুন
  const processedContent = await remark()
    .use(remarkGfm) // টেবিল, চেকবক্স, লিংক ঠিকভাবে কাজ করার জন্য
    .use(html)
    .process(content);
    
  const htmlContent = processedContent.toString();

  return (
    <main className="p-6 w-full container lg:max-w-[70%] mx-auto mt-12">
      {/* <h1 className="text-3xl font-bold mb-6 capitalize border-b pb-2">{title}</h1> */}
      
      {/* 3. 'prose' ক্লাসটি এখন কাজ করবে যদি প্লাগিন ইনস্টল থাকে */}
      <article className="prose lg:prose-xl max-w-none prose-headings:mt-4 prose-a:text-blue-600 prose-table:border prose-th:bg-gray-100 prose-th:p-2 prose-td:p-2">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
      </article>

     <div className="mt-8">
      <Link 
        href="/" 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>

      </div>



      
    </main>
    
  );
}