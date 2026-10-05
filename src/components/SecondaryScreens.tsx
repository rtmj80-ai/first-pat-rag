import React, { useState } from 'react';
import {
  HEATMAP_DATA,
  COMMUNITY_IDEAS,
  BROKERS_LIST,
  HeatmapItem,
} from '../data/marketsData';
import { SelectedSymbolDetail } from './SymbolDetailModal';

interface HeatmapScreenProps {
  onBackToMarkets: () => void;
  onSelectSymbol: (detail: SelectedSymbolDetail) => void;
}

export const HeatmapScreen: React.FC<HeatmapScreenProps> = ({
  onBackToMarkets,
  onSelectSymbol,
}) => {
  const [sectorFilter, setSectorFilter] = useState<string>('All');

  const sectors = ['All', 'Technology', 'Consumer', 'Communication', 'Financials', 'Healthcare'];
  const filtered =
    sectorFilter === 'All'
      ? HEATMAP_DATA
      : HEATMAP_DATA.filter((item) => item.sector === sectorFilter);

  const getTileBg = (chg: number) => {
    if (chg >= 2.0) return 'bg-[#089981] text-white';
    if (chg > 0) return 'bg-[#089981]/85 text-white';
    if (chg <= -1.0) return 'bg-[#f23645] text-white';
    return 'bg-[#f23645]/80 text-white';
  };

  const handleTileClick = (item: HeatmapItem) => {
    const base = parseFloat(item.price.replace('$', ''));
    onSelectSymbol({
      symbol: `NASDAQ:${item.ticker}`,
      name: item.name,
      price: item.price,
      change: `${item.changePercentNum >= 0 ? '+' : ''}$${(
        (base * item.changePercentNum) /
        100
      ).toFixed(2)}`,
      changePercent: item.changePercent,
      isPositive: item.changePercentNum >= 0,
      high: `$${(base * 1.012).toFixed(2)}`,
      low: `$${(base * 0.988).toFixed(2)}`,
      volume: item.volume,
      rating: item.changePercentNum >= 1.5 ? 'Strong Buy' : item.changePercentNum >= 0 ? 'Buy' : 'Neutral',
      description: `${item.name} (${item.ticker}) — ${item.sector} sector constituent in the S&P 500 market capitalization heatmap.`,
      series1D:
        item.changePercentNum >= 0
          ? [base * 0.98, base * 0.985, base * 0.99, base * 0.994, base * 0.998, base]
          : [base * 1.015, base * 1.01, base * 1.006, base * 1.003, base * 1.001, base],
    });
  };

  return (
    <div className="py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-tv-border">
        <div>
          <button
            onClick={onBackToMarkets}
            className="text-xs font-semibold text-tv-blue hover:underline inline-flex items-center gap-1 mb-2"
          >
            ← Back to Markets Overview
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-tv-textPrimary">
            Stock Market Heatmap
          </h1>
          <p className="text-sm text-tv-textSecondary mt-1">
            S&amp;P 500 constituents sized by market capitalization and colored by daily performance
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                sectorFilter === sec
                  ? 'bg-tv-hover text-tv-textPrimary'
                  : 'text-tv-textSecondary hover:text-tv-textPrimary'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 auto-rows-[115px]">
        {filtered.map((item) => {
          const spanClass =
            item.marketCapWeight >= 9
              ? 'col-span-2 row-span-2'
              : item.marketCapWeight >= 7
              ? 'col-span-2 row-span-1'
              : 'col-span-1 row-span-1';

          return (
            <button
              key={item.ticker}
              onClick={() => handleTileClick(item)}
              className={`${spanClass} ${getTileBg(
                item.changePercentNum
              )} rounded-xl p-4 flex flex-col justify-between text-left hover:opacity-95 transition-opacity cursor-pointer`}
            >
              <div className="flex items-start justify-between gap-2 w-full">
                <div>
                  <div className="font-bold text-lg tracking-tight leading-none">
                    {item.ticker}
                  </div>
                  <div className="text-xs opacity-85 mt-1 truncate max-w-[160px]">
                    {item.name}
                  </div>
                </div>
                <span className="text-xs font-semibold opacity-90">
                  {item.sector}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2 w-full num-tabular">
                <span className="text-base font-bold">{item.price}</span>
                <span className="text-sm font-bold">{item.changePercent}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface ProductsScreenProps {
  onOpenHeatmap: () => void;
  onBackToMarkets: () => void;
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({
  onOpenHeatmap,
  onBackToMarkets,
}) => {
  return (
    <div className="py-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-tv-textPrimary">
          Supercharts &amp; Analytical Tools
        </h1>
        <p className="text-base text-tv-textSecondary mt-2">
          Institutional-grade charting, multi-asset screeners, and real-time market heatmaps built for active traders and global investors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white border border-tv-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-tv-blue uppercase tracking-wider">
              Flagship Platform
            </div>
            <h2 className="text-xl font-bold text-tv-textPrimary mt-1">
              Supercharts
            </h2>
            <p className="text-sm text-tv-textSecondary mt-2 leading-relaxed">
              100+ pre-built technical indicators, multi-timeframe layouts, volume profile, and custom Pine Script overlays.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-tv-border flex items-center justify-between">
            <span className="text-xs text-tv-textSecondary">15+ chart types</span>
            <button
              onClick={onBackToMarkets}
              className="text-xs font-semibold text-tv-blue hover:underline"
            >
              Launch Indices →
            </button>
          </div>
        </div>

        <div className="bg-white border border-tv-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-tv-green uppercase tracking-wider">
              Visual Analytics
            </div>
            <h2 className="text-xl font-bold text-tv-textPrimary mt-1">
              Equity &amp; ETF Heatmaps
            </h2>
            <p className="text-sm text-tv-textSecondary mt-2 leading-relaxed">
              Spot sector rotation and volume momentum across the S&amp;P 500, Nasdaq 100, and global indices in a single view.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-tv-border flex items-center justify-between">
            <span className="text-xs text-tv-textSecondary">Real-time cap weights</span>
            <button
              onClick={onOpenHeatmap}
              className="text-xs font-semibold text-tv-blue hover:underline"
            >
              Open Heatmap →
            </button>
          </div>
        </div>

        <div className="bg-white border border-tv-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-tv-textSecondary uppercase tracking-wider">
              Global Filtering
            </div>
            <h2 className="text-xl font-bold text-tv-textPrimary mt-1">
              Stock &amp; Index Screener
            </h2>
            <p className="text-sm text-tv-textSecondary mt-2 leading-relaxed">
              Filter global benchmarks and equities by technical rating, RSI, moving averages, and intraday volume surges.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-tv-border flex items-center justify-between">
            <span className="text-xs text-tv-textSecondary">90+ global exchanges</span>
            <button
              onClick={onBackToMarkets}
              className="text-xs font-semibold text-tv-blue hover:underline"
            >
              View World Indices →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommunityScreen: React.FC = () => {
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-tv-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-tv-textPrimary">
            Community Trading Ideas
          </h1>
          <p className="text-sm text-tv-textSecondary mt-1">
             Actionable technical setups, macro research, and quantitative analysis published by verified market participants
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {COMMUNITY_IDEAS.map((idea) => {
          const isLiked = likedIds.includes(idea.id);
          return (
            <div
              key={idea.id}
              className="bg-white border border-tv-border rounded-2xl p-5 flex flex-col justify-between hover:border-gray-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-tv-textSecondary">
                  <span className="font-bold text-tv-textPrimary">{idea.symbol}</span>
                  <span>
                    {idea.direction} · {idea.timeframe}
                  </span>
                </div>

                <h3 className="text-base font-bold text-tv-textPrimary mt-2 leading-snug">
                  {idea.title}
                </h3>

                <div className="my-4 h-16 w-full bg-tv-card rounded-xl p-2 border border-tv-border">
                  <svg
                    className="w-full h-full stroke-tv-blue"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={idea.sparklinePath}
                      fill="none"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                <p className="text-xs text-tv-textSecondary leading-relaxed">
                  {idea.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-tv-border flex items-center justify-between text-xs text-tv-textSecondary">
                <div>
                  <span className="font-semibold text-tv-textPrimary">
                    {idea.author}
                  </span>{' '}
                  · {idea.timeAgo}
                </div>
                <button
                  onClick={() => toggleLike(idea.id)}
                  className={`px-2.5 py-1 rounded-full font-semibold num-tabular transition-colors ${
                    isLiked
                      ? 'bg-tv-blue text-white'
                      : 'bg-tv-hover text-tv-textPrimary hover:bg-gray-200'
                  }`}
                >
                  ▲ {idea.likes + (isLiked ? 1 : 0)}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BrokersScreen: React.FC = () => {
  const [connectedBroker, setConnectedBroker] = useState<string | null>('paper');

  return (
    <div className="py-6">
      <div className="pb-6 border-b border-tv-border">
        <h1 className="text-3xl font-bold tracking-tight text-tv-textPrimary">
          Verified Brokers &amp; Execution
        </h1>
        <p className="text-sm text-tv-textSecondary mt-1">
          Connect your live brokerage account or practice risk-free with TradingView Paper Trading
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {BROKERS_LIST.map((broker) => {
          const isConnected = connectedBroker === broker.id;
          return (
            <div
              key={broker.id}
              className="bg-white border border-tv-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span
                  className="w-11 h-11 rounded-full text-white font-bold text-sm flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: broker.badgeColor }}
                >
                  {broker.initials}
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-base text-tv-textPrimary">
                      {broker.name}
                    </h3>
                    <span className="text-xs font-semibold text-tv-green num-tabular">
                      ★ {broker.rating} ({broker.reviewsCount})
                    </span>
                  </div>
                  <p className="text-xs text-tv-textSecondary mt-0.5">
                    {broker.tagline}
                  </p>
                  <div className="text-xs text-tv-textSecondary mt-2">
                    Tradable: <span className="text-tv-textPrimary font-medium">{broker.assets}</span> · Min Deposit:{' '}
                    <span className="text-tv-textPrimary font-medium num-tabular">{broker.minDeposit}</span> · Pricing:{' '}
                    <span className="text-tv-textPrimary font-medium num-tabular">{broker.commission}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() =>
                    setConnectedBroker(isConnected ? null : broker.id)
                  }
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                    isConnected
                      ? 'bg-emerald-50 text-tv-green border border-tv-green/30'
                      : 'bg-tv-blue text-white hover:opacity-95'
                  }`}
                >
                  {isConnected ? '✓ Connected to Trading Panel' : 'Connect Broker'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
