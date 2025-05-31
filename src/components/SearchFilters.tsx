
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Filters {
  platform: string;
  followers: string;
  language: string;
  category: string;
}

interface SearchFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, setFilters }) => {
  const platforms = ['YouTube', 'Instagram', 'TikTok', 'Twitter', 'LinkedIn'];
  const followerRanges = ['1K-10K', '10K-100K', '100K-1M', '1M+'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Hindi'];
  const categories = ['Technology', 'Fashion', 'Fitness', 'Food', 'Travel', 'Gaming', 'Beauty', 'Lifestyle'];

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      platform: '',
      followers: '',
      language: '',
      category: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Platform Filter */}
        <div>
          <h4 className="text-gray-300 text-sm font-medium mb-2">Platform</h4>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Badge
                key={platform}
                variant={filters.platform === platform ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.platform === platform
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'border-white/30 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => handleFilterChange('platform', platform)}
              >
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        {/* Followers Filter */}
        <div>
          <h4 className="text-gray-300 text-sm font-medium mb-2">Followers</h4>
          <div className="flex flex-wrap gap-2">
            {followerRanges.map((range) => (
              <Badge
                key={range}
                variant={filters.followers === range ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.followers === range
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'border-white/30 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => handleFilterChange('followers', range)}
              >
                {range}
              </Badge>
            ))}
          </div>
        </div>

        {/* Language Filter */}
        <div>
          <h4 className="text-gray-300 text-sm font-medium mb-2">Language</h4>
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <Badge
                key={language}
                variant={filters.language === language ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.language === language
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'border-white/30 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => handleFilterChange('language', language)}
              >
                {language}
              </Badge>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="text-gray-300 text-sm font-medium mb-2">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.category === category
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'border-white/30 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => handleFilterChange('category', category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
