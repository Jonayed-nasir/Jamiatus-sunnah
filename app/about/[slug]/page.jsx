import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm'; // 1. এটি ইমপোর্ট করুন
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function AboutPage({ params }) {
  const { slug } = await params; 

  const filePath = path.join(process.cwd(), 'content/about', `${slug}.md`);

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

<h1 className='text-4xl text-center py-15'>Google maps এ জামিয়াতে সুন্নাহ</h1>
 <div className="w-full h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4024.4598113501643!2d90.15660777532479!3d23.385764278920924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37559d164483f5f3%3A0x2827356d440e83bc!2zSmFtaWF0dXMgU3VubmFoIE1hZHJhc2Eg4Kac4Ka-4Kau4Ka_4Kav4Ka84Ka-4Kak4KeB4Ka4IOCmuOCngeCmqOCnjeCmqOCmvuCmuSDgpq7gpr7gpqbgp43gprDgpr7gprjgpr4!5e1!3m2!1sen!2sbd!4v1763713369063!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

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

