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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-orange-100 text-[#FF8C00]">
          <Newspaper className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {language === "am" ? "?????? ???? ??? ???? ?? ??????" : "Ethiopian Automotive News & Insights"}
        </h1>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          {language === "am"
            ? "?? ?????? ?????? ???? ???? ?? ??? ???? ?????? ???? ?????"
            : "Stay updated on EV tax exemptions, customs tariffs, Addis Ababa vehicle regulations, and car care."}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xs text-slate-400">Loading articles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map(blog => {
            const title = language === "am" && blog.titleAm ? blog.titleAm : blog.title;
            const summary = language === "am" && blog.summaryAm ? blog.summaryAm : blog.summary;
            const author = language === "am" && blog.authorAm ? blog.authorAm : blog.author;

            return (
              <article
                key={blog.id}
                className="group flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-400/80 transition"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={blog.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-orange-600 shadow-xs">
                    {language === "am" && blog.categoryAm ? blog.categoryAm : blog.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
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
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF8C00] transition line-clamp-2">
                        {title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-3">
                      {summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{author}</span>
                    </span>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:underline"
                    >
                      <span>{language === "am" ? "???? ????" : "Read Article"}</span>
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
