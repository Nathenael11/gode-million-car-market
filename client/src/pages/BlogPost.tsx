import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, ChevronLeft, Share2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { apiRequest } from "../utils/api";
import { ShareButtons } from "../components/common/ShareButtons";

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await apiRequest(`/blogs/${slug}`);
        if (res.success && res.data) {
          setBlog(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (loading) {
    return <div className="py-20 text-center text-xs text-gray-400">Loading article...</div>;
  }

  if (!blog) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-[#111827] text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Article Not Found</h2>
        <Link to="/blog" className="inline-block px-5 py-2.5 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs">
          Back to Blog
        </Link>
      </div>
    );
  }

  const title = language === "am" && blog.titleAm ? blog.titleAm : blog.title;
  const author = language === "am" && blog.authorAm ? blog.authorAm : blog.author;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#FF8C00] transition mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>{language === "am" ? "ወደ ዜና ዝርዝር ተመለስ" : "Back to All Articles"}</span>
      </Link>

      <div className="space-y-6">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#FF8C00]/15 text-[#FF8C00] text-xs font-bold">
            {language === "am" && blog.categoryAm ? blog.categoryAm : blog.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-gray-400 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#FF8C00]" />
                <span className="font-semibold text-gray-300">{author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{blog.publishedAt}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{blog.readTime}</span>
              </span>
            </div>

            <ShareButtons title={title} />
          </div>
        </div>

        <div className="h-72 sm:h-96 rounded-3xl overflow-hidden bg-gray-900">
          <img src={blog.image} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-gray-800 text-sm leading-relaxed text-gray-300 space-y-4 whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </article>
  );
};
