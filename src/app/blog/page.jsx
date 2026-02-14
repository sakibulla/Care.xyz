import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Caregiving Tips & Resources",
  description: "Expert advice and insights on baby care, elderly care, and professional caregiving services from Care.xyz.",
};

const blogPosts = [
  {
    id: 1,
    title: "Choosing the Right Caregiver for Your Baby",
    excerpt: "Learn what to look for when selecting a professional caregiver for your little one. Safety, experience, and trust are key.",
    category: "Baby Care",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    date: "Feb 10, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Essential Tips for Elderly Care at Home",
    excerpt: "Caring for elderly family members requires patience, understanding, and proper support. Discover best practices for home care.",
    category: "Elderly Care",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    date: "Feb 8, 2026",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Night Care Services: What You Need to Know",
    excerpt: "Night shifts can be challenging. Learn how professional night care services can provide peace of mind for your family.",
    category: "Night Care",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    date: "Feb 5, 2026",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Supporting Sick Family Members with Professional Care",
    excerpt: "When a loved one is ill, professional caregivers can provide medical support and companionship during recovery.",
    category: "Sick Care",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
    date: "Feb 1, 2026",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Benefits of Professional Home Help Services",
    excerpt: "From household tasks to personal care, discover how home help services can improve quality of life for your family.",
    category: "Home Help",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    date: "Jan 28, 2026",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Special Needs Care: A Comprehensive Guide",
    excerpt: "Caring for individuals with special needs requires specialized training and compassion. Learn about our dedicated services.",
    category: "Special Care",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    date: "Jan 25, 2026",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-12 py-8">
        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          Caregiving Resources
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Expert Tips & Insights
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover helpful advice, best practices, and resources for professional caregiving services.
        </p>
      </section>

      {/* Featured Post */}
      <section className="mb-16">
        <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm font-medium mb-4 w-fit">
                Featured Article
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Professional Caregiving Matters
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                Professional caregivers bring expertise, compassion, and peace of mind to families. 
                Learn why choosing certified professionals makes all the difference in quality care.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span>Feb 13, 2026</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
              <Link 
                href="/services"
                className="btn btn-primary w-fit"
              >
                Explore Our Services
              </Link>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&q=80"
                alt="Professional caregiving"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-20 mb-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest caregiving tips, service updates, and special offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered flex-1"
          />
          <button className="btn btn-primary">
            Subscribe
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Need Professional Caregiving Services?
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Book trusted, certified caregivers for your loved ones. Available 24/7 with flexible hourly and daily rates.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services" className="btn btn-primary btn-lg">
            Browse Services
          </Link>
          <Link href="/contact" className="btn btn-outline btn-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
