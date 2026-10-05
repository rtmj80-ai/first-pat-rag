export type TechnicalRating = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';

export type RegionFilter = 'All' | 'Americas' | 'Europe' | 'Asia-Pacific';

export interface MajorIndexCardData {
  id: string;
  pillLabel: string;
  badgeText: string;
  badgeBg: string;
  name: string;
  symbol: string;
  price: string;
  priceNum: number;
  change: string;
  changeNum: number;
  changePercent: string;
  changePercentNum: number;
  isPositive: boolean;
  sparklinePathClosed: string;
  sparklinePathLine: string;
  high: string;
  low: string;
  open: string;
  prevClose: string;
  volume: string;
  rating: TechnicalRating;
  description: string;
  series1D: number[];
  series1M: number[];
  series1Y: number[];
}

export interface WorldIndexRow {
  ticker: string;
  name: string;
  countryCode: 'JP' | 'DE' | 'GB' | 'FR' | 'HK' | 'US' | 'CA' | 'BR' | 'EU' | 'ES' | 'CH' | 'CN' | 'AU' | 'KR' | 'IN';
  last: string;
  lastNum: number;
  chg: string;
  chgNum: number;
  chgPercent: string;
  chgPercentNum: number;
  high: string;
  low: string;
  rating: TechnicalRating;
  region: 'Americas' | 'Europe' | 'Asia-Pacific';
  inDefaultAll?: boolean;
  description: string;
  series1D: number[];
}

export interface ActiveStock {
  ticker: string;
  name: string;
  price: string;
  priceNum: number;
  change: string;
  changePercent: string;
  changePercentNum: number;
  isPositive: boolean;
  volume: string;
  marketCap: string;
  sector: string;
  high: string;
  low: string;
  rating: TechnicalRating;
  description: string;
  series1D: number[];
}

export interface HeatmapItem {
  ticker: string;
  name: string;
  sector: 'Technology' | 'Financials' | 'Consumer' | 'Healthcare' | 'Communication';
  price: string;
  changePercent: string;
  changePercentNum: number;
  marketCapWeight: number; // 1 to 10 for sizing
  volume: string;
}

export interface CommunityIdea {
  id: string;
  title: string;
  symbol: string;
  direction: 'Long' | 'Short' | 'Educational';
  timeframe: string;
  author: string;
  timeAgo: string;
  likes: number;
  comments: number;
  summary: string;
  sparklinePath: string;
}

export interface BrokerItem {
  id: string;
  name: string;
  tagline: string;
  rating: string;
  reviewsCount: string;
  assets: string;
  minDeposit: string;
  commission: string;
  badgeColor: string;
  initials: string;
}

export const MAJOR_INDICES: MajorIndexCardData[] = [
  {
    id: 'spx',
    pillLabel: 'S&P 500',
    badgeText: '500',
    badgeBg: '#eb5757',
    name: 'S&P 500',
    symbol: 'INDEX:SPX',
    price: '5,983.25',
    priceNum: 5983.25,
    change: '+24.50',
    changeNum: 24.50,
    changePercent: '+0.41%',
    changePercentNum: 0.41,
    isPositive: true,
    sparklinePathClosed: 'M0 45 C 30 40, 50 48, 80 32 C 110 18, 140 28, 170 12 L 200 8 L 200 60 L 0 60 Z',
    sparklinePathLine: 'M0 45 C 30 40, 50 48, 80 32 C 110 18, 140 28, 170 12 L 200 8',
    high: '5,994.80',
    low: '5,952.10',
    open: '5,960.40',
    prevClose: '5,958.75',
    volume: '2.48B',
    rating: 'Strong Buy',
    description: 'The Standard and Poor\'s 500 tracks the stock performance of 500 of the largest companies listed on stock exchanges in the United States.',
    series1D: [5958.75, 5962.10, 5955.40, 5968.90, 5974.20, 5971.00, 5979.60, 5983.25],
    series1M: [5780.0, 5815.4, 5840.2, 5822.1, 5890.5, 5912.0, 5945.8, 5983.25],
    series1Y: [4950.0, 5120.4, 5280.0, 5460.5, 5580.2, 5710.8, 5860.4, 5983.25],
  },
  {
    id: 'ndx',
    pillLabel: 'Nasdaq 100',
    badgeText: '100',
    badgeBg: '#00a3e0',
    name: 'Nasdaq 100',
    symbol: 'INDEX:NDX',
    price: '21,114.78',
    priceNum: 21114.78,
    change: '+173.80',
    changeNum: 173.80,
    changePercent: '+0.83%',
    changePercentNum: 0.83,
    isPositive: true,
    sparklinePathClosed: 'M0 50 C 35 52, 60 30, 95 35 C 130 40, 160 15, 200 5 L 200 60 L 0 60 Z',
    sparklinePathLine: 'M0 50 C 35 52, 60 30, 95 35 C 130 40, 160 15, 200 5',
    high: '21,158.00',
    low: '20,940.15',
    open: '20,965.00',
    prevClose: '20,940.98',
    volume: '1.12B',
    rating: 'Strong Buy',
    description: 'The Nasdaq-100 Index includes 100 of the largest domestic and international non-financial companies listed on the Nasdaq Stock Market.',
    series1D: [20940.98, 20960.5, 21010.2, 20995.0, 21048.4, 21080.1, 21095.6, 21114.78],
    series1M: [20150.0, 20320.5, 20480.0, 20390.2, 20650.8, 20810.4, 20980.0, 21114.78],
    series1Y: [17200.0, 17850.0, 18400.0, 19120.0, 19650.0, 20100.0, 20680.0, 21114.78],
  },
  {
    id: 'dji',
    pillLabel: 'Dow 30',
    badgeText: '30',
    badgeBg: '#00838f',
    name: 'Dow 30',
    symbol: 'INDEX:DJI',
    price: '43,874.10',
    priceNum: 43874.10,
    change: '-52.30',
    changeNum: -52.30,
    changePercent: '-0.12%',
    changePercentNum: -0.12,
    isPositive: false,
    sparklinePathClosed: 'M0 15 C 40 20, 70 12, 110 35 C 145 52, 175 42, 200 50 L 200 60 L 0 60 Z',
    sparklinePathLine: 'M0 15 C 40 20, 70 12, 110 35 C 145 52, 175 42, 200 50',
    high: '44,012.50',
    low: '43,810.20',
    open: '43,926.40',
    prevClose: '43,926.40',
    volume: '342.5M',
    rating: 'Neutral',
    description: 'The Dow Jones Industrial Average is a price-weighted measurement stock market index of 30 prominent companies listed on stock exchanges in the United States.',
    series1D: [43926.40, 43950.10, 43935.00, 43902.80, 43880.40, 43860.00, 43885.20, 43874.10],
    series1M: [42900.0, 43150.0, 43420.0, 43680.0, 43950.0, 43890.0, 43910.0, 43874.10],
    series1Y: [38100.0, 39200.0, 40150.0, 41200.0, 42100.0, 42850.0, 43500.0, 43874.10],
  },
  {
    id: 'rut',
    pillLabel: 'US 2000',
    badgeText: '2K',
    badgeBg: '#ff9800',
    name: 'US 2000',
    symbol: 'INDEX:RUT',
    price: '2,384.60',
    priceNum: 2384.60,
    change: '+14.85',
    changeNum: 14.85,
    changePercent: '+0.63%',
    changePercentNum: 0.63,
    isPositive: true,
    sparklinePathClosed: 'M0 48 C 30 44, 65 38, 100 28 C 135 22, 165 18, 200 10 L 200 60 L 0 60 Z',
    sparklinePathLine: 'M0 48 C 30 44, 65 38, 100 28 C 135 22, 165 18, 200 10',
    high: '2,395.00',
    low: '2,366.40',
    open: '2,369.75',
    prevClose: '2,369.75',
    volume: '890.2M',
    rating: 'Buy',
    description: 'The Russell 2000 Index is a small-cap U.S. stock market index that makes up the smallest 2,000 stocks in the Russell 3000 Index.',
    series1D: [2369.75, 2372.0, 2376.4, 2374.1, 2379.8, 2381.2, 2383.0, 2384.60],
    series1M: [2240.0, 2265.0, 2290.0, 2310.0, 2335.0, 2350.0, 2370.0, 2384.60],
    series1Y: [1980.0, 2040.0, 2110.0, 2180.0, 2220.0, 2285.0, 2340.0, 2384.60],
  },
  {
    id: 'ixic',
    pillLabel: 'Nasdaq Composite',
    badgeText: 'COMP',
    badgeBg: '#2962ff',
    name: 'Nasdaq Composite',
    symbol: 'INDEX:IXIC',
    price: '19,286.45',
    priceNum: 19286.45,
    change: '+142.10',
    changeNum: 142.10,
    changePercent: '+0.74%',
    changePercentNum: 0.74,
    isPositive: true,
    sparklinePathClosed: 'M0 46 C 35 42, 70 34, 105 30 C 140 24, 170 14, 200 7 L 200 60 L 0 60 Z',
    sparklinePathLine: 'M0 46 C 35 42, 70 34, 105 30 C 140 24, 170 14, 200 7',
    high: '19,318.20',
    low: '19,140.00',
    open: '19,155.30',
    prevClose: '19,144.35',
    volume: '4.85B',
    rating: 'Strong Buy',
    description: 'The Nasdaq Composite is a stock market index that includes almost all stocks listed on the Nasdaq stock exchange.',
    series1D: [19144.35, 19165.0, 19190.4, 19212.0, 19240.8, 19260.2, 19275.0, 19286.45],
    series1M: [18450.0, 18610.0, 18780.0, 18890.0, 19020.0, 19110.0, 19200.0, 19286.45],
    series1Y: [15800.0, 16400.0, 17050.0, 17600.0, 18100.0, 18550.0, 18950.0, 19286.45],
  },
  {
    id: 'nya',
    pillLabel: 'NYSE Composite',
    badgeText: 'NYA',
    badgeBg: '#78909c',
    name: 'NYSE Composite',
    symbol: 'INDEX:NYA',
    price: '19,842.15',
    priceNum: 19842.15,
    change: '+38.90',
    changeNum: 38.90,
    changePercent: '+0.20%',
    changePercentNum: 0.20,
    isPositive: true,
    sparklinePathClosed: 'M0 42 C 35 38, 70 40, 105 28 C 140 24, 170 20, 200 16 L 200 60 L 0 60 Z',
    sparklinePathLine: 'M0 42 C 35 38, 70 40, 105 28 C 140 24, 170 20, 200 16',
    high: '19,880.00',
    low: '19,792.40',
    open: '19,803.25',
    prevClose: '19,803.25',
    volume: '3.62B',
    rating: 'Buy',
    description: 'The NYSE Composite Index covers all common stock listed on the New York Stock Exchange, including ADRs, REITs, and tracking stocks.',
    series1D: [19803.25, 19810.0, 19805.5, 19818.0, 19825.4, 19831.0, 19838.2, 19842.15],
    series1M: [19420.0, 19510.0, 19580.0, 19640.0, 19710.0, 19760.0, 19810.0, 19842.15],
    series1Y: [17400.0, 17850.0, 18200.0, 18650.0, 19010.0, 19340.0, 19620.0, 19842.15],
  },
];

export const WORLD_STOCK_INDICES: WorldIndexRow[] = [
  {
    ticker: 'NI225',
    name: 'Nikkei 225 Index',
    countryCode: 'JP',
    last: '39,380.20',
    lastNum: 39380.20,
    chg: '+112.50',
    chgNum: 112.50,
    chgPercent: '+0.29%',
    chgPercentNum: 0.29,
    high: '39,450.00',
    low: '39,120.40',
    rating: 'Strong Buy',
    region: 'Asia-Pacific',
    inDefaultAll: true,
    description: 'The Nikkei 225 is a price-weighted equity index for the Tokyo Stock Exchange (TSE).',
    series1D: [39267.7, 39290.0, 39315.4, 39285.0, 39340.2, 39365.0, 39380.2],
  },
  {
    ticker: 'DAX',
    name: 'DAX Index',
    countryCode: 'DE',
    last: '19,442.80',
    lastNum: 19442.80,
    chg: '+148.90',
    chgNum: 148.90,
    chgPercent: '+0.77%',
    chgPercentNum: 0.77,
    high: '19,480.10',
    low: '19,310.20',
    rating: 'Buy',
    region: 'Europe',
    inDefaultAll: true,
    description: 'The DAX is a stock market index consisting of the 40 major German blue chip companies trading on the Frankfurt Stock Exchange.',
    series1D: [19293.9, 19320.0, 19355.0, 19380.4, 19410.0, 19430.5, 19442.8],
  },
  {
    ticker: 'UKX',
    name: 'FTSE 100 Index',
    countryCode: 'GB',
    last: '8,140.75',
    lastNum: 8140.75,
    chg: '-18.30',
    chgNum: -18.30,
    chgPercent: '-0.22%',
    chgPercentNum: -0.22,
    high: '8,185.00',
    low: '8,132.40',
    rating: 'Neutral',
    region: 'Europe',
    inDefaultAll: true,
    description: 'The Financial Times Stock Exchange 100 Index is a share index of the 100 companies listed on the London Stock Exchange with the highest market capitalisation.',
    series1D: [8159.05, 8165.0, 8158.2, 8151.0, 8146.5, 8138.0, 8140.75],
  },
  {
    ticker: 'PX1',
    name: 'CAC 40 Index',
    countryCode: 'FR',
    last: '7,425.50',
    lastNum: 7425.50,
    chg: '+35.10',
    chgNum: 35.10,
    chgPercent: '+0.48%',
    chgPercentNum: 0.48,
    high: '7,450.80',
    low: '7,390.15',
    rating: 'Buy',
    region: 'Europe',
    inDefaultAll: true,
    description: 'The CAC 40 is a benchmark French stock market index representing a capitalization-weighted measure of the 40 most significant stocks among the 100 largest market caps on Euronext Paris.',
    series1D: [7390.4, 7398.0, 7405.2, 7412.0, 7418.6, 7422.1, 7425.5],
  },
  {
    ticker: 'HSI',
    name: 'Hang Seng Index',
    countryCode: 'HK',
    last: '20,538.38',
    lastNum: 20538.38,
    chg: '-214.20',
    chgNum: -214.20,
    chgPercent: '-1.03%',
    chgPercentNum: -1.03,
    high: '20,890.00',
    low: '20,480.60',
    rating: 'Sell',
    region: 'Asia-Pacific',
    inDefaultAll: true,
    description: 'The Hang Seng Index is a freefloat-adjusted market-capitalization-weighted stock-market index in Hong Kong.',
    series1D: [20752.58, 20710.0, 20680.4, 20625.0, 20590.2, 20555.0, 20538.38],
  },
  // Additional regional indices shown when user clicks Americas, Europe, or Asia-Pacific tabs
  {
    ticker: 'SPX',
    name: 'S&P 500 Index',
    countryCode: 'US',
    last: '5,983.25',
    lastNum: 5983.25,
    chg: '+24.50',
    chgNum: 24.50,
    chgPercent: '+0.41%',
    chgPercentNum: 0.41,
    high: '5,994.80',
    low: '5,952.10',
    rating: 'Strong Buy',
    region: 'Americas',
    inDefaultAll: false,
    description: 'Standard & Poor\'s 500 Index of large-cap US equities.',
    series1D: [5958.75, 5962.10, 5968.90, 5974.20, 5979.60, 5983.25],
  },
  {
    ticker: 'NDX',
    name: 'Nasdaq 100 Index',
    countryCode: 'US',
    last: '21,114.78',
    lastNum: 21114.78,
    chg: '+173.80',
    chgNum: 173.80,
    chgPercent: '+0.83%',
    chgPercentNum: 0.83,
    high: '21,158.00',
    low: '20,940.15',
    rating: 'Strong Buy',
    region: 'Americas',
    inDefaultAll: false,
    description: '100 largest non-financial companies listed on Nasdaq.',
    series1D: [20940.98, 20980.0, 21025.0, 21065.0, 21095.0, 21114.78],
  },
  {
    ticker: 'TSX',
    name: 'S&P/TSX Composite',
    countryCode: 'CA',
    last: '24,890.40',
    lastNum: 24890.40,
    chg: '+92.15',
    chgNum: 92.15,
    chgPercent: '+0.37%',
    chgPercentNum: 0.37,
    high: '24,925.00',
    low: '24,780.10',
    rating: 'Buy',
    region: 'Americas',
    inDefaultAll: false,
    description: 'Benchmark Canadian stock market index tracking largest companies on the Toronto Stock Exchange.',
    series1D: [24798.25, 24815.0, 24835.0, 24860.0, 24875.0, 24890.40],
  },
  {
    ticker: 'IBOV',
    name: 'Bovespa Index',
    countryCode: 'BR',
    last: '128,450.00',
    lastNum: 128450.00,
    chg: '-410.50',
    chgNum: -410.50,
    chgPercent: '-0.32%',
    chgPercentNum: -0.32,
    high: '129,120.00',
    low: '128,110.00',
    rating: 'Neutral',
    region: 'Americas',
    inDefaultAll: false,
    description: 'Benchmark index of about 85 stocks traded on the B3 in São Paulo, Brazil.',
    series1D: [128860.5, 128750.0, 128620.0, 128540.0, 128490.0, 128450.0],
  },
  {
    ticker: 'SX5E',
    name: 'EURO STOXX 50',
    countryCode: 'EU',
    last: '4,862.30',
    lastNum: 4862.30,
    chg: '+28.40',
    chgNum: 28.40,
    chgPercent: '+0.59%',
    chgPercentNum: 0.59,
    high: '4,879.00',
    low: '4,830.15',
    rating: 'Buy',
    region: 'Europe',
    inDefaultAll: false,
    description: 'Stock index of Eurozone stocks designed by STOXX, made up of fifty of the largest and most liquid stocks.',
    series1D: [4833.9, 4840.0, 4848.5, 4854.0, 4859.2, 4862.3],
  },
  {
    ticker: 'ASX200',
    name: 'S&P/ASX 200',
    countryCode: 'AU',
    last: '8,294.10',
    lastNum: 8294.10,
    chg: '+41.60',
    chgNum: 41.60,
    chgPercent: '+0.50%',
    chgPercentNum: 0.50,
    high: '8,312.00',
    low: '8,250.00',
    rating: 'Strong Buy',
    region: 'Asia-Pacific',
    inDefaultAll: false,
    description: 'Market-capitalization weighted and float-adjusted stock market index of stocks listed on the Australian Securities Exchange.',
    series1D: [8252.5, 8262.0, 8271.5, 8280.0, 8288.4, 8294.1],
  },
];

export const MOST_ACTIVE_STOCKS: ActiveStock[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: '$148.88',
    priceNum: 148.88,
    change: '+$4.59',
    changePercent: '+3.18%',
    changePercentNum: 3.18,
    isPositive: true,
    volume: '54.2M',
    marketCap: '3.65T',
    sector: 'Electronic Technology',
    high: '$149.65',
    low: '$144.10',
    rating: 'Strong Buy',
    description: 'NVIDIA Corporation designs and supplies GPUs, AI accelerated computing platforms, and data center networking solutions.',
    series1D: [144.29, 145.10, 146.40, 145.95, 147.30, 148.15, 148.88],
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: '$229.80',
    priceNum: 229.80,
    change: '+$2.16',
    changePercent: '+0.95%',
    changePercentNum: 0.95,
    isPositive: true,
    volume: '41.8M',
    marketCap: '3.48T',
    sector: 'Electronic Technology',
    high: '$230.45',
    low: '$227.30',
    rating: 'Buy',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and digital services.',
    series1D: [227.64, 228.10, 228.55, 228.90, 229.25, 229.50, 229.80],
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    price: '$338.74',
    priceNum: 338.74,
    change: '-$4.88',
    changePercent: '-1.42%',
    changePercentNum: -1.42,
    isPositive: false,
    volume: '68.3M',
    marketCap: '1.07T',
    sector: 'Consumer Durables',
    high: '$345.20',
    low: '$336.15',
    rating: 'Neutral',
    description: 'Tesla, Inc. designs, develops, manufactures, and sells electric vehicles, energy generation, and storage systems.',
    series1D: [343.62, 342.80, 341.50, 340.10, 339.60, 338.90, 338.74],
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    price: '$425.20',
    priceNum: 425.20,
    change: '+$2.28',
    changePercent: '+0.54%',
    changePercentNum: 0.54,
    isPositive: true,
    volume: '22.4M',
    marketCap: '3.16T',
    sector: 'Technology Services',
    high: '$426.90',
    low: '$422.50',
    rating: 'Buy',
    description: 'Microsoft Corporation develops, licenses, and supports software, cloud infrastructure (Azure), productivity tools, and enterprise services.',
    series1D: [422.92, 423.40, 423.95, 424.30, 424.75, 425.00, 425.20],
  },
];

export const HEATMAP_DATA: HeatmapItem[] = [
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', price: '$148.88', changePercent: '+3.18%', changePercentNum: 3.18, marketCapWeight: 10, volume: '54.2M' },
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: '$229.80', changePercent: '+0.95%', changePercentNum: 0.95, marketCapWeight: 10, volume: '41.8M' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', price: '$425.20', changePercent: '+0.54%', changePercentNum: 0.54, marketCapWeight: 9, volume: '22.4M' },
  { ticker: 'AVGO', name: 'Broadcom Inc.', sector: 'Technology', price: '$178.45', changePercent: '+2.41%', changePercentNum: 2.41, marketCapWeight: 6, volume: '19.1M' },
  { ticker: 'ORCL', name: 'Oracle Corp.', sector: 'Technology', price: '$189.10', changePercent: '+1.64%', changePercentNum: 1.64, marketCapWeight: 5, volume: '11.4M' },
  { ticker: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', price: '$141.20', changePercent: '-0.85%', changePercentNum: -0.85, marketCapWeight: 4, volume: '34.6M' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer', price: '$210.35', changePercent: '+1.45%', changePercentNum: 1.45, marketCapWeight: 8, volume: '38.2M' },
  { ticker: 'TSLA', name: 'Tesla, Inc.', sector: 'Consumer', price: '$338.74', changePercent: '-1.42%', changePercentNum: -1.42, marketCapWeight: 6, volume: '68.3M' },
  { ticker: 'WMT', name: 'Walmart Inc.', sector: 'Consumer', price: '$84.90', changePercent: '+0.62%', changePercentNum: 0.62, marketCapWeight: 5, volume: '14.2M' },
  { ticker: 'COST', name: 'Costco Wholesale', sector: 'Consumer', price: '$932.10', changePercent: '+0.38%', changePercentNum: 0.38, marketCapWeight: 4, volume: '2.1M' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Communication', price: '$181.60', changePercent: '+1.12%', changePercentNum: 1.12, marketCapWeight: 8, volume: '26.7M' },
  { ticker: 'META', name: 'Meta Platforms', sector: 'Communication', price: '$592.40', changePercent: '+1.88%', changePercentNum: 1.88, marketCapWeight: 7, volume: '13.9M' },
  { ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Communication', price: '$824.50', changePercent: '+2.05%', changePercentNum: 2.05, marketCapWeight: 4, volume: '4.8M' },
  { ticker: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Financials', price: '$462.15', changePercent: '+0.19%', changePercentNum: 0.19, marketCapWeight: 7, volume: '3.9M' },
  { ticker: 'JPM', name: 'JPMorgan Chase', sector: 'Financials', price: '$241.80', changePercent: '+0.76%', changePercentNum: 0.76, marketCapWeight: 6, volume: '9.4M' },
  { ticker: 'V', name: 'Visa Inc.', sector: 'Financials', price: '$310.25', changePercent: '-0.28%', changePercentNum: -0.28, marketCapWeight: 5, volume: '6.1M' },
  { ticker: 'LLY', name: 'Eli Lilly & Co.', sector: 'Healthcare', price: '$812.30', changePercent: '-1.15%', changePercentNum: -1.15, marketCapWeight: 6, volume: '4.5M' },
  { ticker: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare', price: '$598.40', changePercent: '+0.42%', changePercentNum: 0.42, marketCapWeight: 5, volume: '3.2M' },
];

export const COMMUNITY_IDEAS: CommunityIdea[] = [
  {
    id: 'idea-1',
    title: 'S&P 500 Breaking Above 5,980 — Ascending Channel Continuation',
    symbol: 'INDEX:SPX',
    direction: 'Long',
    timeframe: '4H',
    author: 'QuantStructure',
    timeAgo: '2 hours ago',
    likes: 342,
    comments: 48,
    summary: 'SPX continues to hold above the 20-period EMA on the 4-hour chart with broadening semiconductor participation leading the next impulse leg toward 6,025.',
    sparklinePath: 'M0 45 C 30 40, 60 35, 100 26 C 140 20, 170 15, 200 8',
  },
  {
    id: 'idea-2',
    title: 'NVDA Pre-Earnings Volume Profile & Institutional Accumulation Zone',
    symbol: 'NASDAQ:NVDA',
    direction: 'Long',
    timeframe: '1D',
    author: 'AlphaFlow_Pro',
    timeAgo: '4 hours ago',
    likes: 518,
    comments: 91,
    summary: 'Point of control rests firmly at $142.50. Sustained breakout above $148.00 on 54M+ volume confirms institutional demand into data center cycle expansion.',
    sparklinePath: 'M0 50 C 40 48, 80 32, 120 28 C 160 18, 180 12, 200 6',
  },
  {
    id: 'idea-3',
    title: 'Hang Seng (HSI) Testing Key Fib Retracement Support at 20,450',
    symbol: 'HSI:HSI',
    direction: 'Educational',
    timeframe: '1D',
    author: 'AsiaMacroDesk',
    timeAgo: '6 hours ago',
    likes: 189,
    comments: 27,
    summary: 'After a sharp multi-week rally, HSI is consolidating inside a classic flag pattern. Watch the 20,450–20,500 demand zone for potential mean reversion.',
    sparklinePath: 'M0 15 C 40 22, 80 30, 120 42 C 160 48, 180 44, 200 40',
  },
];

export const BROKERS_LIST: BrokerItem[] = [
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    tagline: 'Direct market access across 150+ global exchanges',
    rating: '4.8',
    reviewsCount: '28.4K reviews',
    assets: 'Stocks, Futures, Options, Forex, Bonds',
    minDeposit: '$0',
    commission: '$0.005 / share',
    badgeColor: '#d32f2f',
    initials: 'IB',
  },
  {
    id: 'tradestation',
    name: 'TradeStation',
    tagline: 'Award-winning execution for equities, options, and futures',
    rating: '4.7',
    reviewsCount: '19.1K reviews',
    assets: 'Stocks, ETFs, Futures, Options',
    minDeposit: '$0',
    commission: '$0 Commission Equities',
    badgeColor: '#1976d2',
    initials: 'TS',
  },
  {
    id: 'eightcap',
    name: 'Eightcap',
    tagline: 'Tight raw spreads and direct TradingView chart integration',
    rating: '4.6',
    reviewsCount: '12.7K reviews',
    assets: 'Forex, Indices, Commodities, Crypto',
    minDeposit: '$100',
    commission: 'From 0.0 pips',
    badgeColor: '#089981',
    initials: '8C',
  },
];
