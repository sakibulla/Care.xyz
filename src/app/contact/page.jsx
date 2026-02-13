export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Contact Us</span>
        </h1>
        <p className="text-gray-600 text-lg">We're here to help and answer any questions you might have</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6 bg-gradient-to-br from-pink-50 to-blue-50 p-8 rounded-2xl shadow-lg border-2 border-white">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Get in Touch</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Have questions about our services or products? We'd love to hear from you!
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/70 p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-secondary">📧 Email</h3>
              <p className="text-gray-700">hasanfahmidul2002@gmail.com</p>
            </div>
            
            <div className="bg-white/70 p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-secondary">📞 Phone</h3>
              <p className="text-gray-700">+880 1971 699644</p>
            </div>
            
            <div className="bg-white/70 p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-secondary">📍 Address</h3>
              <p className="text-gray-700">
                Dhaka, Bangladesh
              </p>
            </div>
            
            <div className="bg-white/70 p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-secondary">🕐 Business Hours</h3>
              <p className="text-gray-700">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-gradient-to-br from-yellow-50 to-pink-50 p-8 rounded-2xl shadow-lg border-2 border-white">
          <h2 className="text-2xl font-bold mb-6 text-primary">Send us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Name</label>
              <input 
                type="text" 
                className="input input-bordered w-full bg-white shadow-sm focus:ring-2 focus:ring-primary" 
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Email</label>
              <input 
                type="email" 
                className="input input-bordered w-full bg-white shadow-sm focus:ring-2 focus:ring-primary" 
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Subject</label>
              <input 
                type="text" 
                className="input input-bordered w-full bg-white shadow-sm focus:ring-2 focus:ring-primary" 
                placeholder="How can we help?"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Message</label>
              <textarea 
                className="textarea textarea-bordered w-full h-32 bg-white shadow-sm focus:ring-2 focus:ring-primary" 
                placeholder="Your message..."
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Send Message 💌
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
