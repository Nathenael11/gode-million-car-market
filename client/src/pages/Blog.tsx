import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Newspaper, Calendar, Clock, ChevronRight, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { apiRequest } from "../utils/api";

export const Blog: React.FC = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await apiRequest("/blogs");
        if (res.success && res.data) {
          setBlogs(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex p-3 rounded-2xl bg-[#FF8C00]/10 text-[#FF8C00] mb-3">
          <Newspaper className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {language === "am" ? "የኢትዮጵያ የመኪና ገበያ ዜናዎች እና መመሪያዎች" : "Ethiopian Automotive News & Insights"}
        </h1>
        <p className="text-xs text-gray-400 max-w-lg mx-auto mt-1">
          {language === "am"
            ? "ስለ ኤሌክትሪክ መኪናዎች፣ የቀረጥ ማሻሻያ እና የስም ዝውውር መመሪያዎች ወቅታዊ መረጃዎች"
            : "Stay updated on EV tax exemptions, customs tariffs, Addis Ababa vehicle regulations, and car care."}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xs text-gray-400">Loading articles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map(blog => {
            const title = language === "am" && blog.titleAm ? blog.titleAm : blog.title;
            const summary = language === "am" && blog.summaryAm ? blog.summaryAm : blog.summary;
            const author = language === "am" && blog.authorAm ? blog.authorAm : blog.author;

            return (
              <article
                key={blog.id}
                className="group flex flex-col bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:border-[#FF8C00]/40 transition"
              >
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  <img
                    src={blog.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gray-950/80 backdrop-blur-md text-[10px] font-bold text-[#FF8C00]">
                    {language === "am" && blog.categoryAm ? blog.categoryAm : blog.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#FF8C00]" />
                        <span>{blog.publishedAt}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF8C00]" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    <Link to={`/blog/${blog.slug}`}>
                      <h3 className="text-base font-bold text-white group-hover:text-[#FF8C00] transition line-clamp-2">
                        {title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-400 leading-relaxed mt-2 line-clamp-3">
                      {summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      <span>{author}</span>
                    </span>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#FF8C00] hover:underline"
                    >
                      <span>{language === "am" ? "ሙሉውን አንብብ" : "Read Article"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
