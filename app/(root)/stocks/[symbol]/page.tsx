import TradingViewWidget from "@/components/TradingViewWidget";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";

const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

interface StockDetailsProps {
  params: Promise<{
    symbol: string;
  }>;
}

const StockDetails = async ({ params }: StockDetailsProps) => {
  const { symbol } = await params;
  const upperSymbol = symbol.toUpperCase();

  return (
    <div className="container min-h-screen py-8">
      <h1 className="text-4xl font-bold text-gray-100 mb-8">
        {upperSymbol} Stock Details
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(upperSymbol)}
            height={170}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(upperSymbol)}
            height={600}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={BASELINE_WIDGET_CONFIG(upperSymbol)}
            height={600}
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          {/* TODO: Add WatchlistButton component here */}
          {/* <WatchlistButton symbol={upperSymbol} company={companyName} /> */}

          <TradingViewWidget
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(upperSymbol)}
            height={400}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-profile.js`}
            config={COMPANY_PROFILE_WIDGET_CONFIG(upperSymbol)}
            height={440}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}financials.js`}
            config={COMPANY_FINANCIALS_WIDGET_CONFIG(upperSymbol)}
            height={464}
          />
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
