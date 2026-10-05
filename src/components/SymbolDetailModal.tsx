import React, { useState } from 'react';
import { TechnicalRating } from '../data/marketsData';

export interface SelectedSymbolDetail {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  high: string;
  low: string;
  volume?: string;
  rating: TechnicalRating;
  description: string;
  series1D: number[];
  series1M?: number[];
  series1Y?: number[];
}

interface SymbolDetailModalProps {
  symbolDetail: SelectedSymbolDetail | null;
  onClose: () => void;
  watchlist: string[];
  onToggleWatchlist: (symbol: string) => void;
}

export const SymbolDetailModal: React.FC<SymbolDetailModalProps> = ({
  symbolDetail,
  onClose,
  watchlist,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1M' | '1Y'>('1D');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [orderSide, setOrderSide] = useState<'buy' | 'sell' | null>(null);
  const [orderQty, setOrderQty] = useState<number>(10);
  const [orderConfirmation, setOrderConfirmation] = useState<string | null>(null);

  if (!symbolDetail) return null;

  const isSaved = watchlist.includes(symbolDetail.symbol);

  const rawSeries =
    timeframe === '1M' && symbolDetail.series1M
      ? symbolDetail.series1M
      : timeframe === '1Y' && symbolDetail.series1Y
      ? symbolDetail.series1Y
      : symbolDetail.series1D;

  const minVal = Math.min(...rawSeries);
  const maxVal = Math.max(...rawSeries);
  const span = maxVal - minVal || 1;

  const width = 640;
  const height = 220;
  const padY = 20;

  const points = rawSeries.map((val, i) => {
    const x = (i / Math.max(rawSeries.length - 1, 1)) * width;
    const y = height - padY - ((val - minVal) / span) * (height - padY * 2);
    return { x, y, val };
  });

  const linePath = points
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  const strokeColor = symbolDetail.isPositive ? '#089981' : '#f23645';
  const fillColor = symbolDetail.isPositive ? 'rgba(8, 153, 129, 0.10)' : 'rgba(242, 54, 69, 0.10)';

  const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : points[points.length - 1];

  const getRatingBadgeClass = (rating: TechnicalRating) => {
    if (rating === 'Strong Buy' || rating === 'Buy') {
      return 'text-tv-green bg-emerald-50';
    }
    if (rating === 'Sell' || rating === 'Strong Sell') {
      return 'text-tv-red bg-rose-50';
    }
    return 'text-tv-textSecondary bg-gray-100';
  };

  const handlePaperOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderSide) return;
    setOrderConfirmation(
      `Paper ${orderSide.toUpperCase()} order filled: ${orderQty} units of ${symbolDetail.symbol} @ ${symbolDetail.price}`
    );
    setTimeout(() => {
      setOrderConfirmation(null);
      setOrderSide(null);
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-tv-border rounded-2xl max-w-3xl w-full shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-tv-border flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-tv-textPrimary tracking-tight">
                {symbolDetail.name}
              </h2>
              <span className="text-xs font-medium text-tv-textSecondary uppercase">
                {symbolDetail.symbol}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-3xl font-bold num-tabular text-tv-textPrimary">
                {hoverIndex !== null
                  ? activePoint.val.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : symbolDetail.price}
              </span>
              <span
                className={`text-sm font-semibold num-tabular ${
                  symbolDetail.isPositive ? 'text-tv-green' : 'text-tv-red'
                }`}
              >
                {symbolDetail.change} ({symbolDetail.changePercent})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(symbolDetail.symbol)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${
                isSaved
                  ? 'bg-tv-blue text-white border-tv-blue'
                  : 'bg-white text-tv-textPrimary border-tv-border hover:bg-tv-hover'
              }`}
            >
              {isSaved ? '★ In Watchlist' : '☆ Add to Watchlist'}
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 text-tv-textSecondary hover:text-tv-textPrimary hover:bg-tv-hover rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chart Controls & Interactive Canvas */}
        <div className="px-6 pt-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 bg-tv-card p-1 rounded-full border border-tv-border">
              {(['1D', '1M', '1Y'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    timeframe === tf
                      ? 'bg-white text-tv-blue shadow-xs'
                      : 'text-tv-textSecondary hover:text-tv-textPrimary'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
            <div className="text-xs text-tv-textSecondary num-tabular">
              Hover chart to inspect price points
            </div>
          </div>

          <div
            className="relative h-56 w-full bg-tv-card/60 rounded-xl border border-tv-border p-3 select-none"
            onMouseLeave={() => setHoverIndex(null)}
          >
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
            >
              <path d={areaPath} fill={fillColor} />
              <path
                d={linePath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
              {hoverIndex !== null && (
                <g>
                  <line
                    x1={activePoint.x}
                    y1={0}
                    x2={activePoint.x}
                    y2={height}
                    stroke="#6a6d78"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r="4.5"
                    fill={strokeColor}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>

            {/* Invisible hover columns for smooth scrubbing */}
            <div className="absolute inset-0 flex">
              {points.map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-full cursor-crosshair"
                  onMouseEnter={() => setHoverIndex(idx)}
                />
              ))}
            </div>
          </div>

          {/* Key Statistics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-tv-border">
            <div>
              <div className="text-xs text-tv-textSecondary">Day High</div>
              <div className="text-sm font-bold num-tabular text-tv-textPrimary mt-0.5">
                {symbolDetail.high}
              </div>
            </div>
            <div>
              <div className="text-xs text-tv-textSecondary">Day Low</div>
              <div className="text-sm font-bold num-tabular text-tv-textPrimary mt-0.5">
                {symbolDetail.low}
              </div>
            </div>
            <div>
              <div className="text-xs text-tv-textSecondary">Volume</div>
              <div className="text-sm font-bold num-tabular text-tv-textPrimary mt-0.5">
                {symbolDetail.volume || '1.42B'}
              </div>
            </div>
            <div>
              <div className="text-xs text-tv-textSecondary">Technical Rating</div>
              <div className="mt-0.5">
                <span
                  className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded ${getRatingBadgeClass(
                    symbolDetail.rating
                  )}`}
                >
                  {symbolDetail.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Description & Paper Trading Action */}
          <div className="mt-5 pt-5 border-t border-tv-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-tv-textSecondary leading-relaxed max-w-lg">
              {symbolDetail.description}
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setOrderSide(orderSide === 'buy' ? null : 'buy')}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-tv-green text-white hover:opacity-95 transition-opacity whitespace-nowrap"
              >
                Paper Buy
              </button>
              <button
                onClick={() => setOrderSide(orderSide === 'sell' ? null : 'sell')}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-tv-red text-white hover:opacity-95 transition-opacity whitespace-nowrap"
              >
                Paper Sell
              </button>
            </div>
          </div>

          {orderSide && (
            <form
              onSubmit={handlePaperOrder}
              className="mt-4 p-4 bg-tv-card rounded-xl border border-tv-border flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase text-tv-textPrimary">
                  {orderSide === 'buy' ? 'Buy Market Order' : 'Sell Market Order'}
                </span>
                <label className="text-xs text-tv-textSecondary flex items-center gap-2">
                  Qty:
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={orderQty}
                    onChange={(e) => setOrderQty(Number(e.target.value) || 1)}
                    className="w-20 px-2.5 py-1 text-xs font-semibold num-tabular bg-white border border-tv-border rounded-lg text-tv-textPrimary"
                  />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOrderSide(null)}
                  className="px-3 py-1.5 text-xs font-medium text-tv-textSecondary hover:text-tv-textPrimary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold text-white ${
                    orderSide === 'buy' ? 'bg-tv-green' : 'bg-tv-red'
                  }`}
                >
                  Confirm {orderSide === 'buy' ? 'Buy' : 'Sell'}
                </button>
              </div>
            </form>
          )}

          {orderConfirmation && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 text-tv-green text-xs font-semibold">
              {orderConfirmation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
