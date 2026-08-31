import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ChevronRight, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { apiRequest } from "../utils/api";

export const Blog: React.FC = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/blogs")
      .then(r => { if (r.success && r.data) setBlogs(r.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          {language === "am" ? "ዜናዎች እና መመሪያዎች" : "Ethiopian Auto News & Guides"}
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto">
          {language === "am"
            ? "ስለ EV ቀረጥ ነፃ ሁኔታ፣ የቀረጥ ማሻሻያ እና ምክሮች ወቅታዊ ጽሁፎች"
            : "Stay updated on EV tax exemptions, customs changes, and car care tips for the Ethiopian market."}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-sm text-gray-400">
          {language === "am" ? "ጥቂት ቆዩ..." : "Loading articles..."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {blogs.map(b => {
            const title = language === "am" && b.titleAm ? b.titleAm : b.title;
            const summary = language === "am" && b.summaryAm ? b.summaryAm : b.summary;
            const author = language === "am" && b.authorAm ? b.authorAm : b.author;
            const cat = language === "am" && b.categoryAm ? b.categoryAm : b.category;
            return (
              <article key={b.id} className="group flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-200 transition">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img src={b.image} alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=70"; }} />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#FF8C00] shadow-xs">{cat}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#FF8C00]" />{b.publishedAt}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#FF8C00]" />{b.readTime}</span>
                    </div>
                    <Link to={`/blog/${b.slug}`}>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#FF8C00] transition line-clamp-2">{title}</h3>
                    </Link>
                    <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-3">{summary}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
                      <User className="w-3 h-3 text-gray-400" />{author}
                    </span>
                    <Link to={`/blog/${b.slug}`} className="flex items-center gap-1 text-xs font-bold text-[#FF8C00] hover:underline">
                      <span>{language === "am" ? "ሙሉውን አንብብ" : "Read More"}</span>
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
