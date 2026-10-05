import React, { useState, useEffect, useRef } from 'react';
import {
  MAJOR_INDICES,
  WORLD_STOCK_INDICES,
  MOST_ACTIVE_STOCKS,
} from '../data/marketsData';
import { SelectedSymbolDetail } from './SymbolDetailModal';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (detail: SelectedSymbolDetail) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | 'Indices' | 'Stocks'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allItems: Array<{
    type: 'Indices' | 'Stocks';
    ticker: string;
    name: string;
    price: string;
    changePercent: string;
    isPositive: boolean;
    detail: SelectedSymbolDetail;
  }> = [
    ...MAJOR_INDICES.map((item) => ({
      type: 'Indices' as const,
      ticker: item.symbol,
      name: item.name,
      price: item.price,
      changePercent: item.changePercent,
      isPositive: item.isPositive,
      detail: {
        symbol: item.symbol,
        name: item.name,
        price: item.price,
        change: item.change,
        changePercent: item.changePercent,
        isPositive: item.isPositive,
        high: item.high,
        low: item.low,
        volume: item.volume,
        rating: item.rating,
        description: item.description,
        series1D: item.series1D,
        series1M: item.series1M,
        series1Y: item.series1Y,
      },
    })),
    ...WORLD_STOCK_INDICES.map((item) => ({
      type: 'Indices' as const,
      ticker: item.ticker,
      name: item.name,
      price: item.last,
      changePercent: item.chgPercent,
      isPositive: item.chgNum >= 0,
      detail: {
        symbol: `INDEX:${item.ticker}`,
        name: item.name,
        price: item.last,
        change: item.chg,
        changePercent: item.chgPercent,
        isPositive: item.chgNum >= 0,
        high: item.high,
        low: item.low,
        rating: item.rating,
        description: item.description,
        series1D: item.series1D,
      },
    })),
    ...MOST_ACTIVE_STOCKS.map((item) => ({
      type: 'Stocks' as const,
      ticker: item.ticker,
      name: item.name,
      price: item.price,
      changePercent: item.changePercent,
      isPositive: item.isPositive,
      detail: {
        symbol: `NASDAQ:${item.ticker}`,
        name: item.name,
        price: item.price,
        change: item.change,
        changePercent: item.changePercent,
        isPositive: item.isPositive,
        high: item.high,
        low: item.low,
        volume: item.volume,
        rating: item.rating,
        description: item.description,
        series1D: item.series1D,
      },
    })),
  ];

  // Deduplicate by ticker
  const seen = new Set<string>();
  const uniqueItems = allItems.filter((item) => {
    const key = item.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const filtered = uniqueItems.filter((item) => {
    const matchesCat = category === 'All' || item.type === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.ticker.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-start justify-center pt-20 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-tv-border rounded-2xl max-w-xl w-full shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-tv-border flex items-center gap-3">
          <svg
            className="w-5 h-5 text-tv-textSecondary flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, index, or company (e.g. SPX, NVDA, Nikkei)..."
            className="w-full text-sm text-tv-textPrimary placeholder-tv-textSecondary focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-xs font-medium text-tv-textSecondary hover:text-tv-textPrimary px-2 py-1 rounded bg-tv-hover"
          >
            ESC
          </button>
        </div>

        <div className="px-4 py-2.5 bg-tv-card border-b border-tv-border flex items-center gap-2">
          {(['All', 'Indices', 'Stocks'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                category === cat
                  ? 'bg-tv-blue text-white'
                  : 'text-tv-textSecondary hover:text-tv-textPrimary hover:bg-tv-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-tv-border">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-tv-textSecondary">
              No matching symbols found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={`${item.ticker}-${item.name}`}
                onClick={() => {
                  onSelectSymbol(item.detail);
                  onClose();
                }}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-tv-hover transition-colors text-left"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-tv-textPrimary">
                      {item.ticker}
                    </span>
                    <span className="text-xs text-tv-textSecondary">
                      · {item.type}
                    </span>
                  </div>
                  <div className="text-xs text-tv-textSecondary mt-0.5">
                    {item.name}
                  </div>
                </div>
                <div className="text-right num-tabular">
                  <div className="text-sm font-bold text-tv-textPrimary">
                    {item.price}
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      item.isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {item.changePercent}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
