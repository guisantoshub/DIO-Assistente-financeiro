import type { InvestmentPortfolio } from "../../types";
import { TrendingUp, PieChart, Sparkles, Percent } from "lucide-react";
interface InvestmentsPageProps {
  portfolio: InvestmentPortfolio;
  usdBrlRate: number;
  showBRL: boolean;
  onAskAIAboutInvestments: () => void;
}
const assetColors = ["#285f59", "#6e9d8e", "#adc4b7", "#c4af8a", "#8a9faf"];
export function InvestmentsPage({
  portfolio,
  showBRL,
  onAskAIAboutInvestments,
}: InvestmentsPageProps) {
  const money = (value: number, currency = "BRL") =>
    new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-US", {
      style: "currency",
      currency,
    }).format(value);
  return (
    <div className="page-stack">
      <div className="investment-summary">
        <section className="surface investment-total">
          <div className="summary-label">
            <span className="soft-icon">
              <TrendingUp size={18} />
            </span>
            <span>Patrimônio investido</span>
            <span className="subtle-badge">Perfil moderado</span>
          </div>
          <p className="summary-value">
            {showBRL
              ? money(portfolio.totalValueBRL)
              : money(portfolio.totalValueUSD, "USD")}
          </p>
          <p className="summary-footnote">Carteira ilustrativa · 5 ativos</p>
        </section>
        <section className="surface">
          <div className="summary-label">
            <span className="soft-icon">
              <Percent size={18} />
            </span>
            Rentabilidade em 12 meses
          </div>
          <p className="summary-value investment-return">
            +{portfolio.returnLast12Months.toFixed(2).replace(".", ",")}%
          </p>
          <p className="summary-footnote">
            {portfolio.benchmarkPct}% do CDI · desempenho ilustrativo
          </p>
        </section>
      </div>
      <section className="surface">
        <div className="section-heading">
          <div>
            <h2>Composição da carteira</h2>
            <p>Como seu patrimônio está distribuído.</p>
          </div>
          <PieChart size={19} color="#879990" />
        </div>
        <div
          className="allocation-bar"
          aria-label="Distribuição dos investimentos"
        >
          {portfolio.assets.map((asset, index) => (
            <div
              key={asset.id}
              style={{
                width: `${asset.allocationPct}%`,
                background: assetColors[index],
              }}
              title={`${asset.category}: ${asset.allocationPct}%`}
            />
          ))}
        </div>
        <div className="allocation-legend">
          {portfolio.assets.map((asset, index) => (
            <div key={asset.id}>
              <span style={{ background: assetColors[index] }} />
              <p>
                {asset.category}
                <strong>{asset.allocationPct}%</strong>
              </p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="section-heading">
          <div>
            <h2>Seus ativos</h2>
            <p>Valores e informações de cada aplicação.</p>
          </div>
          <button
            className="secondary-button"
            onClick={onAskAIAboutInvestments}
          >
            <Sparkles size={16} />
            <span>Analisar com IA</span>
          </button>
        </div>
        <div className="asset-list">
          {portfolio.assets.map((asset, index) => (
            <article key={asset.id} className="surface asset-card">
              <span
                className="asset-indicator"
                style={{ background: assetColors[index] }}
              />
              <div className="asset-name">
                <h3>{asset.name}</h3>
                <p>
                  {asset.institution} · {asset.category}
                </p>
              </div>
              <span className="asset-risk">
                Risco {asset.riskLevel.toLowerCase()}
              </span>
              <div className="asset-value">
                <strong>
                  {showBRL
                    ? money(asset.valueBRL)
                    : money(asset.valueUSD, "USD")}
                </strong>
                <span>{asset.allocationPct}% da carteira</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
