'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Store, Gavel, Tag, Loader2, ArrowRight } from 'lucide-react';
import { globalSearch } from '@/actions/search';
import { SectionedResults, SearchResult, SearchEntityType } from '@/lib/mockData/search';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Maps entity type to its icon and color
const getEntityIcon = (type: SearchEntityType) => {
    switch (type) {
        case 'Storefront': return { icon: Store, color: 'text-teal-600' };
        case 'Auction': return { icon: Gavel, color: 'text-red-600' };
        case 'Category': return { icon: Tag, color: 'text-blue-600' };
        default: return { icon: Search, color: 'text-gray-500' };
    }
};

const SearchAutocomplete: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SectionedResults>({ Storefront: [], Auction: [], Category: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Debounce the search query
  useEffect(() => {
    if (!query) {
      setResults({ Storefront: [], Auction: [], Category: [] });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const handler = setTimeout(async () => {
      try {
        const data = await globalSearch(query);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(handler);
  }, [query]);
  
  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate total number of results
  const totalResults = useMemo(() => {
    return Object.values(results).flat().length;
  }, [results]);

  // Handle Enter keypress for full search page
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
      }
    }
  };

  const ResultItem: React.FC<{ result: SearchResult, isLast?: boolean }> = ({ result, isLast = false }) => {
    const { icon: Icon, color } = getEntityIcon(result.type);
    return (
        <Link 
            href={result.link}
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className={`flex items-center p-3 hover:bg-gray-100 transition duration-150 ${!isLast ? 'border-b border-gray-100' : ''}`}
        >
            <Icon className={`w-5 h-5 mr-3 ${color}`} />
            <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-gray-800 truncate">{result.title}</p>
                <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
            </div>
            <ArrowRight className="w-4 h-4 ml-2 text-gray-400" />
        </Link>
    );
  };
  
  // Get the first 5 results for the dropdown preview
  const previewResults = Object.values(results).flat().slice(0, 5);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative flex items-center w-full">
        <Search className="w-5 h-5 text-gray-400 absolute left-3" />
        <input
          type="text"
          placeholder="Search the marketplace, auctions, and stores..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (totalResults > 0) setIsOpen(true); }}
          onKeyDown={handleKeyDown}
          className="search-bar w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
        {isLoading && (
          <Loader2 className="w-4 h-4 text-teal-500 absolute right-3 animate-spin" />
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-2xl z-30 origin-top-left animate-in fade-in-0 zoom-in-95">
          {totalResults === 0 && !isLoading ? (
            <div className="p-4 text-center text-gray-500">No results found for "{query}"</div>
          ) : (
            <>
              {/* Result Preview List */}
              <div className="divide-y divide-gray-100">
                {previewResults.map((result, index) => (
                    <ResultItem 
                        key={`${result.type}-${result.id}`} 
                        result={result}
                        isLast={index === previewResults.length - 1}
                    />
                ))}
              </div>

              {/* View All Button */}
              {totalResults > 0 && (
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="block p-3 text-center text-sm font-semibold text-teal-600 hover:bg-teal-50 rounded-b-xl transition"
                >
                  View All {totalResults} Results &rarr;
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
