/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  MAJOR_INDICES,
  WORLD_STOCK_INDICES,
  MOST_ACTIVE_STOCKS,
  RegionFilter,
  TechnicalRating,
  MajorIndexCardData,
  WorldIndexRow,
  ActiveStock,
} from './data/marketsData';
import { CountryFlag } from './components/CountryFlag';
import { SymbolDetailModal, SelectedSymbolDetail } from './components/SymbolDetailModal';
import { SearchModal } from './components/SearchModal';
import {
  HeatmapScreen,
  ProductsScreen,
  CommunityScreen,
  BrokersScreen,
} from './components/SecondaryScreens';

type ActiveScreen = 'Markets' | 'Products' | 'Community' | 'Brokers' | 'Heatmap';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('Markets');
  const [selectedPillId, setSelectedPillId] = useState<string>('spx');
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('All');
  const [sortColumn, setSortColumn] = useState<'ticker' | 'last' | 'chg' | 'chgPercent' | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedSymbol, setSelectedSymbol] = useState<SelectedSymbolDetail | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>(['INDEX:SPX', 'NASDAQ:NVDA', 'NASDAQ:AAPL']);

  const [marketScopeMenuOpen, setMarketScopeMenuOpen] = useState<boolean>(false);
  const [marketScopeLabel, setMarketScopeLabel] = useState<string>('Markets, everywhere');

  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('EN');

  const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false);
  const [accountModalOpen, setAccountModalOpen] = useState<boolean>(false);
  const [footerModalTitle, setFooterModalTitle] = useState<string | null>(null);

  // Global Ctrl+K / Cmd+K shortcut for Symbol Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setMarketScopeMenuOpen(false);
        setLangMenuOpen(false);
        setMoreMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  // Compute the 3 major index cards to display:
  // Default ('spx' pill active) shows SPX, NDX, DJI (exact match to screenshot)
  const displayedMajorCards: MajorIndexCardData[] = React.useMemo(() => {
    if (selectedPillId === 'spx' || selectedPillId === 'ndx' || selectedPillId === 'dji') {
      return MAJOR_INDICES.slice(0, 3);
    }
    const chosen = MAJOR_INDICES.find((item) => item.id === selectedPillId);
    if (!chosen) return MAJOR_INDICES.slice(0, 3);
    const others = MAJOR_INDICES.filter((item) => item.id !== selectedPillId).slice(0, 2);
    return [chosen, ...others];
  }, [selectedPillId]);

  // Compute filtered & sorted World Stock Indices rows
  const displayedWorldRows: WorldIndexRow[] = React.useMemo(() => {
    const base =
      regionFilter === 'All'
        ? WORLD_STOCK_INDICES.filter((r) => r.inDefaultAll)
        : WORLD_STOCK_INDICES.filter((r) => r.region === regionFilter);

    if (!sortColumn) return base;

    return [...base].sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;
      if (sortColumn === 'ticker') {
        valA = a.ticker;
        valB = b.ticker;
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (sortColumn === 'last') {
        valA = a.lastNum;
        valB = b.lastNum;
      } else if (sortColumn === 'chg') {
        valA = a.chgNum;
        valB = b.chgNum;
      } else if (sortColumn === 'chgPercent') {
        valA = a.chgPercentNum;
        valB = b.chgPercentNum;
      }
      return sortAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
    });
  }, [regionFilter, sortColumn, sortAsc]);

  const handleSort = (col: 'ticker' | 'last' | 'chg' | 'chgPercent') => {
    if (sortColumn === col) {
      if (sortAsc) {
        setSortColumn(null);
      } else {
        setSortAsc(true);
      }
    } else {
      setSortColumn(col);
      setSortAsc(false);
    }
  };

  const openMajorIndexDetail = (card: MajorIndexCardData) => {
    setSelectedSymbol({
      symbol: card.symbol,
      name: card.name,
      price: card.price,
      change: card.change,
      changePercent: card.changePercent,
      isPositive: card.isPositive,
      high: card.high,
      low: card.low,
      volume: card.volume,
      rating: card.rating,
      description: card.description,
      series1D: card.series1D,
      series1M: card.series1M,
      series1Y: card.series1Y,
    });
  };

  const openWorldRowDetail = (row: WorldIndexRow) => {
    setSelectedSymbol({
      symbol: `INDEX:${row.ticker}`,
      name: row.name,
      price: row.last,
      change: row.chg,
      changePercent: row.chgPercent,
      isPositive: row.chgNum >= 0,
      high: row.high,
      low: row.low,
      rating: row.rating,
      description: row.description,
      series1D: row.series1D,
    });
  };

  const openStockDetail = (stock: ActiveStock) => {
    setSelectedSymbol({
      symbol: `NASDAQ:${stock.ticker}`,
      name: stock.name,
      price: stock.price,
      change: stock.change,
      changePercent: stock.changePercent,
      isPositive: stock.isPositive,
      high: stock.high,
      low: stock.low,
      volume: stock.volume,
      rating: stock.rating,
      description: stock.description,
      series1D: stock.series1D,
    });
  };

  const getRatingBadge = (rating: TechnicalRating) => {
    if (rating === 'Strong Buy' || rating === 'Buy') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-tv-green bg-emerald-50 rounded">
          {rating}
        </span>
      );
    }
    if (rating === 'Sell' || rating === 'Strong Sell') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-tv-red bg-rose-50 rounded">
          {rating}
        </span>
      );
    }
    return (
      <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-tv-textSecondary bg-gray-100 rounded">
        {rating}
      </span>
    );
  };

  return (
    <div className="bg-white text-tv-textPrimary antialiased min-h-screen flex flex-col">
      {/* BEGIN: MainHeader */}
      <header className="sticky top-0 z-40 bg-white border-b border-tv-border">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left side: Logo & Navigation & Search */}
          <div className="flex items-center gap-6 flex-1">
            {/* TradingView Brand Logo */}
            <a
              aria-label="TradingView Home"
              className="flex-shrink-0 flex items-center text-black"
              href="#markets"
              onClick={(e) => {
                e.preventDefault();
                setActiveScreen('Markets');
              }}
            >
              <svg
                className="w-9 h-7 fill-current"
                fill="none"
                viewBox="0 0 36 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 22H7V6h7v16zm8-22h-7v28h7V0zm8 11h-7v17h7V11z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Search Input Bar */}
            <div className="relative w-64 md:w-72 hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-tv-textSecondary">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <input
                onClick={() => setIsSearchOpen(true)}
                className="w-full h-9 pl-10 pr-4 text-xs lg:text-sm bg-tv-hover hover:bg-[#e6ebf4] text-tv-textSecondary rounded-full border-none focus:ring-1 focus:ring-tv-blue cursor-pointer transition-colors"
                readOnly
                type="text"
                value="Search (Ctrl+K)"
              />
            </div>

            {/* Primary Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium tracking-tight">
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveScreen('Products');
                }}
                className={
                  activeScreen === 'Products'
                    ? 'text-tv-blue font-semibold border-b-2 border-tv-blue py-5 inline-block'
                    : 'text-tv-textPrimary hover:text-tv-blue transition-colors'
                }
              >
                Products
              </a>
              <a
                href="#community"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveScreen('Community');
                }}
                className={
                  activeScreen === 'Community'
                    ? 'text-tv-blue font-semibold border-b-2 border-tv-blue py-5 inline-block'
                    : 'text-tv-textPrimary hover:text-tv-blue transition-colors'
                }
              >
                Community
              </a>
              <a
                href="#markets"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveScreen('Markets');
                }}
                className={
                  activeScreen === 'Markets' || activeScreen === 'Heatmap'
                    ? 'text-tv-blue font-semibold border-b-2 border-tv-blue py-5 inline-block'
                    : 'text-tv-textPrimary hover:text-tv-blue transition-colors'
                }
              >
                Markets
              </a>
              <a
                href="#brokers"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveScreen('Brokers');
                }}
                className={
                  activeScreen === 'Brokers'
                    ? 'text-tv-blue font-semibold border-b-2 border-tv-blue py-5 inline-block'
                    : 'text-tv-textPrimary hover:text-tv-blue transition-colors'
                }
              >
                Brokers
              </a>
              <div className="relative">
                <a
                  href="#more"
                  onClick={(e) => {
                    e.preventDefault();
                    setMoreMenuOpen((prev) => !prev);
                  }}
                  className="text-tv-textPrimary hover:text-tv-blue transition-colors"
                >
                  More
                </a>
                {moreMenuOpen && (
                  <div className="absolute left-0 mt-3 w-48 bg-white border border-tv-border rounded-xl shadow-lg py-1.5 z-50 text-sm">
                    <button
                      onClick={() => {
                        setActiveScreen('Heatmap');
                        setMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-tv-textPrimary hover:bg-tv-hover transition-colors"
                    >
                      Market Heatmaps
                    </button>
                    <button
                      onClick={() => {
                        setIsSearchOpen(true);
                        setMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-tv-textPrimary hover:bg-tv-hover transition-colors"
                    >
                      Symbol Search (Ctrl+K)
                    </button>
                    <button
                      onClick={() => {
                        setAccountModalOpen(true);
                        setMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-tv-textPrimary hover:bg-tv-hover transition-colors"
                    >
                      My Watchlist ({watchlist.length})
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right side: Utility & CTA */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-[14px] font-medium text-tv-textPrimary hover:text-tv-blue p-1.5 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-tv-textPrimary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                  <path
                    d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                    strokeWidth="1.8"
                  />
                </svg>
                <span>{language}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-tv-border rounded-xl shadow-lg py-1 z-50 text-xs font-medium">
                  {(['EN', 'DE', 'FR', 'JP', 'ES'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left hover:bg-tv-hover flex items-center justify-between ${
                        language === lang ? 'text-tv-blue font-bold' : 'text-tv-textPrimary'
                      }`}
                    >
                      <span>{lang}</span>
                      {language === lang && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Icon */}
            <button
              aria-label="Account"
              onClick={() => setAccountModalOpen(true)}
              className="p-1.5 text-tv-textPrimary hover:text-tv-blue transition-colors rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>

            {/* Get Started CTA Button */}
            <button
              onClick={() => setAccountModalOpen(true)}
              className="bg-gradient-to-r from-[#2962ff] to-[#9333ea] hover:opacity-95 text-white text-[14px] font-medium px-5 py-2 rounded-full shadow-sm transition-all duration-150 ease-in-out whitespace-nowrap"
            >
              Get started
            </button>
          </div>
        </div>
      </header>
      {/* END: MainHeader */}

      {/* BEGIN: MainContent */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-6 pt-10 pb-16">
        {activeScreen === 'Heatmap' && (
          <HeatmapScreen
            onBackToMarkets={() => setActiveScreen('Markets')}
            onSelectSymbol={(detail) => setSelectedSymbol(detail)}
          />
        )}

        {activeScreen === 'Products' && (
          <ProductsScreen
            onOpenHeatmap={() => setActiveScreen('Heatmap')}
            onBackToMarkets={() => setActiveScreen('Markets')}
          />
        )}

        {activeScreen === 'Community' && <CommunityScreen />}

        {activeScreen === 'Brokers' && <BrokersScreen />}

        {activeScreen === 'Markets' && (
          <>
            {/* Title Header */}
            <div className="text-center my-6 relative">
              <button
                onClick={() => setMarketScopeMenuOpen((prev) => !prev)}
                className="group inline-flex items-center gap-3 text-4xl sm:text-5xl font-bold tracking-tight text-tv-textPrimary hover:text-gray-800 transition-colors"
              >
                <span>{marketScopeLabel}</span>
                <svg
                  className="w-7 h-7 mt-1.5 text-tv-textPrimary group-hover:translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {marketScopeMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-white border border-tv-border rounded-2xl shadow-xl py-2 z-30 text-left">
                  {[
                    { label: 'Markets, everywhere', region: 'All' as RegionFilter },
                    { label: 'North & South America', region: 'Americas' as RegionFilter },
                    { label: 'European Markets', region: 'Europe' as RegionFilter },
                    { label: 'Asia-Pacific Markets', region: 'Asia-Pacific' as RegionFilter },
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => {
                        setMarketScopeLabel(option.label);
                        setRegionFilter(option.region);
                        setMarketScopeMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-sm font-medium hover:bg-tv-hover flex items-center justify-between ${
                        marketScopeLabel === option.label
                          ? 'text-tv-blue font-semibold'
                          : 'text-tv-textPrimary'
                      }`}
                    >
                      <span>{option.label}</span>
                      {marketScopeLabel === option.label && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* BEGIN: IndicesSection */}
            <section className="mt-12" data-purpose="indices-explorer">
              {/* Section Title Link */}
              <div className="mb-4">
                <a
                  className="group inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight text-tv-textPrimary hover:text-tv-blue transition-colors"
                  href="#indices"
                  onClick={(e) => {
                    e.preventDefault();
                    openMajorIndexDetail(
                      MAJOR_INDICES.find((m) => m.id === selectedPillId) || MAJOR_INDICES[0]
                    );
                  }}
                >
                  <span>Indices</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-0.5 transition-transform text-tv-textPrimary group-hover:text-tv-blue"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-3">
                {MAJOR_INDICES.map((item) => {
                  const isActive = selectedPillId === item.id;
                  const smallFont =
                    item.badgeText.length >= 2 && item.badgeText !== '30' && item.badgeText !== '500' && item.badgeText !== '100'
                      ? 'text-[10px]'
                      : 'text-[11px]';
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPillId(item.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-pointer flex-shrink-0 border border-transparent transition-all ${
                        isActive
                          ? 'bg-tv-hover hover:border-tv-border'
                          : 'hover:bg-tv-hover'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full text-white ${smallFont} font-bold flex items-center justify-center shadow-xs`}
                        style={{ backgroundColor: item.badgeBg }}
                      >
                        {item.badgeText}
                      </span>
                      <span className="font-semibold text-sm text-tv-textPrimary">
                        {item.pillLabel}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Major Indices Visual Cards */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6"
                data-purpose="major-index-cards"
              >
                {displayedMajorCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => openMajorIndexDetail(card)}
                    className="bg-white border border-tv-border hover:border-gray-300 rounded-2xl p-5 shadow-xs transition-shadow cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center"
                          style={{ backgroundColor: card.badgeBg }}
                        >
                          {card.badgeText}
                        </span>
                        <div>
                          <h3 className="font-bold text-base text-tv-textPrimary leading-none">
                            {card.name}
                          </h3>
                          <span className="text-xs text-tv-textSecondary uppercase font-medium">
                            {card.symbol}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                          card.isPositive
                            ? 'bg-emerald-50 text-tv-green'
                            : 'bg-rose-50 text-tv-red'
                        }`}
                      >
                        {card.changePercent}
                      </span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-2xl font-bold num-tabular tracking-tight">
                        {card.price}
                      </span>
                      <span
                        className={`text-xs font-medium num-tabular ${
                          card.isPositive ? 'text-tv-green' : 'text-tv-red'
                        }`}
                      >
                        {card.change}
                      </span>
                    </div>
                    {/* Sparkline representation */}
                    <div className="mt-4 h-14 w-full">
                      <svg
                        className={`w-full h-full ${
                          card.isPositive
                            ? 'stroke-tv-green fill-emerald-50/40'
                            : 'stroke-tv-red fill-rose-50/40'
                        }`}
                        preserveAspectRatio="none"
                        viewBox="0 0 200 60"
                      >
                        <path
                          d={card.sparklinePathClosed}
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                        />
                        <path
                          d={card.sparklinePathLine}
                          fill="none"
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* END: IndicesSection */}

            {/* BEGIN: WorldMarketsTableSection */}
            <section className="mt-14" data-purpose="global-overview">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-tv-border gap-3">
                <h2 className="text-xl font-bold tracking-tight text-tv-textPrimary">
                  World stock indices
                </h2>
                <div className="flex items-center gap-2">
                  {(['All', 'Americas', 'Europe', 'Asia-Pacific'] as const).map(
                    (reg) => (
                      <button
                        key={reg}
                        onClick={() => setRegionFilter(reg)}
                        className={
                          regionFilter === reg
                            ? 'text-xs font-semibold px-3 py-1.5 rounded-full bg-tv-hover text-tv-textPrimary'
                            : 'text-xs font-medium px-3 py-1.5 rounded-full text-tv-textSecondary hover:text-tv-textPrimary'
                        }
                      >
                        {reg}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Financial Data Table */}
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs text-tv-textSecondary uppercase border-b border-tv-border font-medium">
                      <th
                        onClick={() => handleSort('ticker')}
                        className="py-3 px-2 cursor-pointer hover:text-tv-textPrimary select-none"
                        scope="col"
                      >
                        Ticker / Name
                      </th>
                      <th
                        onClick={() => handleSort('last')}
                        className="py-3 px-4 text-right cursor-pointer hover:text-tv-textPrimary select-none"
                        scope="col"
                      >
                        Last
                      </th>
                      <th
                        onClick={() => handleSort('chg')}
                        className="py-3 px-4 text-right cursor-pointer hover:text-tv-textPrimary select-none"
                        scope="col"
                      >
                        Chg
                      </th>
                      <th
                        onClick={() => handleSort('chgPercent')}
                        className="py-3 px-4 text-right cursor-pointer hover:text-tv-textPrimary select-none"
                        scope="col"
                      >
                        Chg %
                      </th>
                      <th
                        className="py-3 px-4 text-right hidden md:table-cell"
                        scope="col"
                      >
                        High
                      </th>
                      <th
                        className="py-3 px-4 text-right hidden md:table-cell"
                        scope="col"
                      >
                        Low
                      </th>
                      <th className="py-3 px-4 text-right" scope="col">
                        Technical Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tv-border text-sm">
                    {displayedWorldRows.map((row) => {
                      const isPositive = row.chgNum >= 0;
                      return (
                        <tr
                          key={row.ticker}
                          onClick={() => openWorldRowDetail(row)}
                          className="hover:bg-tv-card transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 px-2 flex items-center gap-3">
                            <CountryFlag code={row.countryCode} />
                            <div>
                              <div className="font-bold text-tv-textPrimary">
                                {row.ticker}
                              </div>
                              <div className="text-xs text-tv-textSecondary">
                                {row.name}
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-medium num-tabular">
                            {row.last}
                          </td>
                          <td
                            className={`py-3.5 px-4 text-right font-semibold num-tabular ${
                              isPositive ? 'text-tv-green' : 'text-tv-red'
                            }`}
                          >
                            {row.chg}
                          </td>
                          <td
                            className={`py-3.5 px-4 text-right font-semibold num-tabular ${
                              isPositive ? 'text-tv-green' : 'text-tv-red'
                            }`}
                          >
                            {row.chgPercent}
                          </td>
                          <td className="py-3.5 px-4 text-right num-tabular text-tv-textSecondary hidden md:table-cell">
                            {row.high}
                          </td>
                          <td className="py-3.5 px-4 text-right num-tabular text-tv-textSecondary hidden md:table-cell">
                            {row.low}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {getRatingBadge(row.rating)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
            {/* END: WorldMarketsTableSection */}

            {/* BEGIN: MoversSection */}
            <section className="mt-14" data-purpose="market-movers">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-tv-textPrimary">
                    Most active stocks
                  </h2>
                  <p className="text-sm text-tv-textSecondary mt-0.5">
                    Top traded symbols today by total volume and momentum
                  </p>
                </div>
                <a
                  className="text-xs font-semibold text-tv-blue hover:underline"
                  href="#heatmaps"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveScreen('Heatmap');
                  }}
                >
                  View full market heatmaps →
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOST_ACTIVE_STOCKS.map((stock) => (
                  <div
                    key={stock.ticker}
                    onClick={() => openStockDetail(stock)}
                    className="p-4 bg-tv-card hover:bg-tv-hover rounded-xl border border-tv-border transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base tracking-tight">
                        {stock.ticker}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          stock.isPositive
                            ? 'text-tv-green bg-emerald-50'
                            : 'text-tv-red bg-rose-50'
                        }`}
                      >
                        {stock.changePercent}
                      </span>
                    </div>
                    <div className="text-xs text-tv-textSecondary mt-0.5 truncate">
                      {stock.name}
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-lg font-bold num-tabular">
                        {stock.price}
                      </span>
                      <span className="text-xs text-tv-textSecondary">
                        Vol: {stock.volume}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* END: MoversSection */}
          </>
        )}
      </main>
      {/* END: MainContent */}

      {/* BEGIN: MinimalFooter */}
      <footer className="border-t border-tv-border py-8 text-center text-xs text-tv-textSecondary bg-white mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2025 TradingView. Look first / Then leap.</div>
          <div className="flex items-center gap-6">
            {['Terms of service', 'Privacy policy', 'Cookies policy', 'Security'].map(
              (item) => (
                <a
                  key={item}
                  className="hover:underline"
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFooterModalTitle(item);
                  }}
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </footer>
      {/* END: MinimalFooter */}

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSymbol={(detail) => setSelectedSymbol(detail)}
      />

      <SymbolDetailModal
        symbolDetail={selectedSymbol}
        onClose={() => setSelectedSymbol(null)}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
      />

      {/* Watchlist & Get Started Modal */}
      {accountModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setAccountModalOpen(false)}
        >
          <div
            className="bg-white border border-tv-border rounded-2xl max-w-md w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-tv-border">
              <div>
                <h3 className="text-lg font-bold text-tv-textPrimary">
                  TradingView Workspace
                </h3>
                <p className="text-xs text-tv-textSecondary mt-0.5">
                  Personal Watchlist &amp; Paper Trading Account
                </p>
              </div>
              <button
                onClick={() => setAccountModalOpen(false)}
                className="p-1.5 text-tv-textSecondary hover:text-tv-textPrimary rounded-full hover:bg-tv-hover"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-tv-textSecondary uppercase">
                Saved Watchlist Symbols ({watchlist.length})
              </div>
              <div className="mt-2 divide-y divide-tv-border border border-tv-border rounded-xl overflow-hidden">
                {watchlist.length === 0 ? (
                  <div className="p-4 text-xs text-tv-textSecondary text-center">
                    Click any index or stock card to add symbols to your watchlist.
                  </div>
                ) : (
                  watchlist.map((sym) => (
                    <div
                      key={sym}
                      className="px-3.5 py-2.5 flex items-center justify-between text-sm bg-tv-card/40"
                    >
                      <span className="font-bold text-tv-textPrimary">{sym}</span>
                      <button
                        onClick={() => toggleWatchlist(sym)}
                        className="text-xs text-tv-red hover:underline font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-tv-border flex items-center justify-between">
              <div className="text-xs text-tv-textSecondary">
                Paper Account Balance:{' '}
                <span className="font-bold text-tv-textPrimary num-tabular">
                  $100,000.00
                </span>
              </div>
              <button
                onClick={() => setAccountModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-tv-blue text-white hover:opacity-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Legal Info Modal */}
      {footerModalTitle && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setFooterModalTitle(null)}
        >
          <div
            className="bg-white border border-tv-border rounded-2xl max-w-md w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-tv-border">
              <h3 className="text-base font-bold text-tv-textPrimary">
                {footerModalTitle}
              </h3>
              <button
                onClick={() => setFooterModalTitle(null)}
                className="p-1 text-tv-textSecondary hover:text-tv-textPrimary"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-tv-textSecondary leading-relaxed mt-3">
              TradingView provides real-time market data, charting tools, and analytical benchmarks for global indices and equities. Market quotes and technical ratings are provided for informational and educational purposes.
            </p>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setFooterModalTitle(null)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-tv-hover text-tv-textPrimary hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
