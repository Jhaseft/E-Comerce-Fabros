import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      {/* Botón de lupa */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:bg-gray-800 transition"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Input desplegable */}
      <div
        className={`overflow-hidden transition-all duration-300 mt-2 ${
          open ? 'max-w-xs max-h-40 opacity-100' : 'max-w-0 max-h-0 opacity-0'
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar..."
          className="
            w-full px-3 py-2
            rounded-2xl
            border border-gray-300
            bg-white
            text-black
            placeholder-gray-500
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
            transition-all duration-300
          "
        />
      </div>
    </div>
  );
}
