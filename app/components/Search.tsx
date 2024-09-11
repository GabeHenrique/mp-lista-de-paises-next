import React, {useState} from "react";

export default function Search({onSearch}: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-full mt-10 px-5 md:px-0">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Buscar..."
        className="border rounded-l-xl px-4 py-2 flex-grow min-w-0"
      />
      <button
        onClick={handleSearch}
        className="bg-lightgreen text-white rounded-r-xl px-4 py-2 hover:bg-forestgreen focus:outline-none transition-all duration-300 "
      >
        Buscar
      </button>
    </div>
  );
};