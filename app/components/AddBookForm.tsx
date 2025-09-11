'use client';
import React, { useEffect, useState } from 'react';
import { BookOpen, User, Calendar, Tag, Image, Hash, Package, FileText, Clock } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface FormData {
  title: string;
  author: string;
  isbn: string;
  year: string;
  genre: string;
  image_url: string;
  description: string;
  publisher: string;
  language: string;
  pages: string;
  duration: string;
  format: string;
  subject: string;
  keywords: string;
  quantity: string;
  location: string;
  item_type: string;
}

const initialForm: FormData = {
  title: '',
  author: '',
  isbn: '',
  year: '',
  genre: '',
  image_url: '',
  description: '',
  publisher: '',
  language: '',
  pages: '',
  duration: '',
  format: '',
  subject: '',
  keywords: '',
  quantity: '1',
  location: '',
  item_type: 'book',
};

const years = Array.from({ length: 200 }, (_, i) =>
  String(new Date().getFullYear() - i)
);

const itemTypes = [
  { value: 'book', label: 'Book' },
  { value: 'journal', label: 'Journal' },
  { value: 'multimedia', label: 'Multimedia' },
  { value: 'newspaper', label: 'Newspaper' },
  { value: 'magazine', label: 'Magazine' },
  { value: 'thesis', label: 'Thesis' },
  { value: 'report', label: 'Report' },
  { value: 'other', label: 'Other' },
];

export default function ItemForm({ isEdit = false }: { isEdit?: boolean }) {
  const params = useParams();
  const itemId = isEdit && params?.id ? String(params.id) : null;
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchItem = async () => {
      if (!isEdit || !itemId) return;
      try {
        const res = await fetch(`/api/librarian/items/${itemId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.success && data.item) {
          const item = data.item;
          setForm({
            title: item.title || '',
            author: item.author || '',
            isbn: item.isbn || '',
            year: item.year?.toString() || '',
            genre: item.genre || '',
            image_url: item.image_url || '',
            description: item.description || '',
            publisher: item.publisher || '',
            language: item.language || '',
            pages: item.pages?.toString() || '',
            duration: item.duration?.toString() || '',
            format: item.format || '',
            subject: item.subject || '',
            keywords: item.keywords || '',
            quantity: item.totalCopies?.toString(),
            location: item.location || '',
            item_type: item.item_type,
          });
        } else {
          setMessage('❌ Failed to load item.');
        }
      } catch (error) {
        console.error('Error loading item:', error);
        setMessage('❌ Error loading item.');
      }
    };
    fetchItem();
  }, [isEdit, itemId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      if (!form.title.trim()) {
        setMessage('❌ Title is required');
        setLoading(false);
        return;
      }
      
      if (!form.author.trim()) {
        setMessage('❌ Author is required');
        setLoading(false);
        return;
      }
      
      if (!form.quantity || Number(form.quantity) < 1) {
        setMessage('❌ Quantity must be at least 1');
        setLoading(false);
        return;
      }

      if (!form.item_type) {
        setMessage('❌ Item type is required');
        setLoading(false);
        return;
      }

      const requestBody = {
        title: form.title.trim(),
        author: form.author.trim(),
        isbn: form.isbn.trim() || null,
        year: form.year ? Number(form.year) : null,
        genre: form.genre.trim() || null,
        image_url: form.image_url.trim() || null,
        description: form.description.trim() || null,
        publisher: form.publisher.trim() || null,
        language: form.language.trim() || null,
        pages: form.pages ? Number(form.pages) : null,
        duration: form.duration ? Number(form.duration) : null,
        format: form.format.trim() || null,
        subject: form.subject.trim() || null,
        keywords: form.keywords.trim() || null,
        quantity: Number(form.quantity),
        location: form.location.trim() || null,
        item_type: form.item_type,
      };

      const response = await fetch(
        isEdit ? `/api/librarian/items/${itemId}/edit` : '/api/librarian/items/add',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );
      
      const data = await response.json();

      console.log("::: ",data)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.message || 'Unknown error'}`);
      }
      
      if (data.success) {
        setMessage(isEdit ? '✅ Item updated!' : '✅ Item added!');
        if (isEdit) {
          setTimeout(() => {
            router.replace(`/librarian/items/${itemId}`);
          }, 1500);
        } else {
          setForm(initialForm);
        }
      } else {
        setMessage(data.message || '❌ Operation failed.');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Network error'}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              {isEdit ? 'Edit Item' : 'Add New Item'}
            </h1>
            <p className="text-slate-600 text-lg">Manage your library collection</p>
          </div>

          {/* Main grid inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Title */}
            <div className="lg:col-span-2">
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <BookOpen className="w-4 h-4 mr-2 text-indigo-600" />
                Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Enter the title..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Author */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <User className="w-4 h-4 mr-2 text-indigo-600" />
                Author *
              </label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                required
                placeholder="Author name..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Item Type */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Package className="w-4 h-4 mr-2 text-indigo-600" />
                Item Type *
              </label>
              <select
                name="item_type"
                value={form.item_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800"
              >
                {itemTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                Year
              </label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800"
              >
                <option value="">Select year...</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Genre */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Tag className="w-4 h-4 mr-2 text-indigo-600" />
                Genre
              </label>
              <input
                name="genre"
                value={form.genre}
                onChange={handleChange}
                placeholder="Fiction, Mystery, Romance..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* ISBN */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Hash className="w-4 h-4 mr-2 text-indigo-600" />
                ISBN
              </label>
              <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                placeholder="978-3-16-148410-0"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Package className="w-4 h-4 mr-2 text-indigo-600" />
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Library shelf or section"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Publisher */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                Publisher
              </label>
              <input
                name="publisher"
                value={form.publisher}
                onChange={handleChange}
                placeholder="Publisher name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Language */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Tag className="w-4 h-4 mr-2 text-indigo-600" />
                Language
              </label>
              <input
                name="language"
                value={form.language}
                onChange={handleChange}
                placeholder="e.g., English, Spanish"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Pages */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                Pages
              </label>
              <input
                name="pages"
                type="number"
                min={1}
                value={form.pages}
                onChange={handleChange}
                placeholder="Number of pages"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                Duration (minutes)
              </label>
              <input
                name="duration"
                type="number"
                min={0}
                value={form.duration}
                onChange={handleChange}
                placeholder="For multimedia items"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Format */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Package className="w-4 h-4 mr-2 text-indigo-600" />
                Format (DVD, CD, etc.)
              </label>
              <input
                name="format"
                value={form.format}
                onChange={handleChange}
                placeholder="Format for multimedia"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Tag className="w-4 h-4 mr-2 text-indigo-600" />
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject category"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Hash className="w-4 h-4 mr-2 text-indigo-600" />
                Quantity *
              </label>
              <input
                name="quantity"
                type="number"
                min={1}
                value={form.quantity}
                onChange={handleChange}
                required
                placeholder="Number of copies"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-gray-400"
              />
            </div>

            {/* Keywords */}
            <div className="lg:col-span-2">
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Tag className="w-4 h-4 mr-2 text-indigo-600" />
                Keywords (comma-separated)
              </label>
              <textarea
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                rows={3}
                placeholder="Keyword1, keyword2, keyword3"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
              <Image className="w-4 h-4 mr-2 text-indigo-600" />
              Cover Image URL
            </label>
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>

          {/* Image Preview */}
          {form.image_url && (
            <div className="flex justify-center items-center p-4 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200 mt-4">
              <img
                src={form.image_url}
                alt="Item cover preview"
                className="rounded-lg w-32 h-40 object-cover shadow-lg mx-auto mb-2 border border-slate-200"
              />
              <p className="text-xs text-slate-500">Cover Preview</p>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
              <FileText className="w-4 h-4 mr-2 text-indigo-600" />
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Brief description or summary..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[160px]"
            >
              <span className="flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    {isEdit ? "Editing..." : "Adding..."}
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    {isEdit ? "Edit Item" : "Add Item"}
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`text-center p-4 rounded-xl font-medium transition-all duration-300 ${message.startsWith('✅')
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
                }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}