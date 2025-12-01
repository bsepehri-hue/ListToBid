import React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { globalSearch } from '@/actions/search';
import { SearchResult, SearchEntityType, SectionedResults } from '@/lib/mockData/search';
import Link from 'next/link';
import { Store, Gavel, Tag, Search, Loader2 } from 'lucide-react';

interface SearchPageProps {
  searchParams: { q?: string };
}

// Maps entity type to its icon and color (reused from Autocomplete)
const getEntityIcon = (type: SearchEntityType) => {
    switch (type) {
        case 'Storefront': return { icon: Store, color: 'text-teal-600' };
        case 'Auction': return { icon: Gavel, color: 'text-red-600' };
        case 'Category': return { icon: Tag, color: 'text-blue-600' };
        default: return { icon: Search, color: 'text-gray-500' };
    }
};

// Component to render a single result item
const SearchResultItem: React.FC<{ result: SearchResult }> = ({ result }) => {
    const { icon: Icon, color } = getEntityIcon(result.type);
    
    return (
        <Link 
            href={result.link}
            className="flex items-center p-4 transition duration-150 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
        >
            <div className={`p-2 rounded-lg bg-gray-100 mr-4 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-lg font-semibold text-gray-800 truncate">{result.title}</p>
                <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
            </div>
            <div className="flex-shrink-0 text-sm font-medium text-teal-600 ml-4">{result.type} &rarr;</div>
        </Link>
    );
};

// Component to render a section of results
const ResultSection: React.FC<{ title: string, results: SearchResult[] }> = ({ title, results }) => {
    if (results.length === 0) return null;
    
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                {title} ({results.length})
            </h2>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden divide-y divide-gray-100">
                {results.map((result) => (
                    <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                ))}
            </div>
        </div>
    );
};


// Main data fetching component (Server Component)
async function SearchResultsFetcher({ query }: { query: string }) {
    
    const sectionedResults: SectionedResults = await globalSearch(query);

    const totalResults = Object.values(sectionedResults).flat().length;
    const sections = Object.keys(sectionedResults) as (keyof SectionedResults)[];

    return (
        <>
            <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4 mb-8 flex items-center">
                <Search className="w-7 h-7 mr-3 text-teal-600" />
                Search Results for: <span className="text-teal-600 ml-2">"{query}"</span>
            </h1>

            <p className="text-gray-600 text-xl font-medium mb-10">
                Found {totalResults} result{totalResults !== 1 ? 's' : ''} across ListToBid.
            </p>

            {totalResults === 0 ? (
                <div className="p-10 text-center bg-white rounded-xl shadow-lg">
                    <p className="text-lg text-gray-500">No matching results found.</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {sections.map((sectionName) => (
                        <ResultSection 
                            key={sectionName}
                            title={`${sectionName}s`}
                            results={sectionedResults[sectionName]}
                        />
                    ))}
                </div>
            )}
        </>
    );
}


// Main Page Component
export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  if (!query) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-lg mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Global Search</h1>
        <p className="text-gray-600">Enter a term in the search bar above to find storefronts, auctions, or categories.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Suspense fallback={<SearchLoadingSkeleton query={query} />}>
        <SearchResultsFetcher query={query} />
      </Suspense>
    </div>
  );
}

function SearchLoadingSkeleton({ query }: { query: string }) {
    return (
        <div className="p-8 animate-pulse">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4 mb-8">
                Searching for: "{query}"
            </h1>
            <p className="text-gray-400 text-xl font-medium mb-10 h-6 w-1/3 bg-gray-200 rounded"></p>
            
            <div className="space-y-12">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden divide-y divide-gray-100">
                            {[...Array(2)].map((_, j) => (
                                <div key={j} className="flex items-center p-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg mr-4"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                                        <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                                    </div>
                                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
