export type CommercialFinancialEstimate = {
  annualSavingsMin: number;
  annualSavingsMax: number;
  annualSavingsLabel: string;

  estimatedSystemCostMin: number;
  estimatedSystemCostMax: number;
  estimatedSystemCostLabel: string;

  federalTaxCreditRate: number;
  estimatedFederalTaxCreditMin: number;
  estimatedFederalTaxCreditMax: number;
  estimatedFederalTaxCreditLabel: string;

  estimatedPaybackYearsMin: number;
  estimatedPaybackYearsMax: number;
  estimatedPaybackLabel: string;
};

const DEFAULT_COMMERCIAL_COST_PER_WATT_MIN = 2.25;
const DEFAULT_COMMERCIAL_COST_PER_WATT_MAX = 3.25;
const DEFAULT_FEDERAL_TAX_CREDIT_RATE = 0.3;

export function estimateCommercialFinancials(params: {
  systemSizeMinKw: number;
  systemSizeMaxKw: number;
  monthlySavingsMin: number;
  monthlySavingsMax: number;
  costPerWattMin?: number;
  costPerWattMax?: number;
  federalTaxCreditRate?: number;
}): CommercialFinancialEstimate {
  const costPerWattMin =
    params.costPerWattMin ?? DEFAULT_COMMERCIAL_COST_PER_WATT_MIN;

  const costPerWattMax =
    params.costPerWattMax ?? DEFAULT_COMMERCIAL_COST_PER_WATT_MAX;

  const federalTaxCreditRate =
    params.federalTaxCreditRate ?? DEFAULT_FEDERAL_TAX_CREDIT_RATE;

  const annualSavingsMin = params.monthlySavingsMin * 12;
  const annualSavingsMax = params.monthlySavingsMax * 12;

  const estimatedSystemCostMin = Math.round(
    params.systemSizeMinKw * 1000 * costPerWattMin
  );

  const estimatedSystemCostMax = Math.round(
    params.systemSizeMaxKw * 1000 * costPerWattMax
  );

  const estimatedFederalTaxCreditMin = Math.round(
    estimatedSystemCostMin * federalTaxCreditRate
  );

  const estimatedFederalTaxCreditMax = Math.round(
    estimatedSystemCostMax * federalTaxCreditRate
  );

  const netCostMin = estimatedSystemCostMin - estimatedFederalTaxCreditMin;
  const netCostMax = estimatedSystemCostMax - estimatedFederalTaxCreditMax;

  const estimatedPaybackYearsMin = roundToOneDecimal(
    netCostMin / Math.max(annualSavingsMax, 1)
  );

  const estimatedPaybackYearsMax = roundToOneDecimal(
    netCostMax / Math.max(annualSavingsMin, 1)
  );

  return {
    annualSavingsMin,
    annualSavingsMax,
    annualSavingsLabel: `${formatCurrency(annualSavingsMin)}–${formatCurrency(
      annualSavingsMax
    )}/year`,

    estimatedSystemCostMin,
    estimatedSystemCostMax,
    estimatedSystemCostLabel: `${formatCurrency(
      estimatedSystemCostMin
    )}–${formatCurrency(estimatedSystemCostMax)}`,

    federalTaxCreditRate,
    estimatedFederalTaxCreditMin,
    estimatedFederalTaxCreditMax,
    estimatedFederalTaxCreditLabel: `${formatCurrency(
      estimatedFederalTaxCreditMin
    )}–${formatCurrency(estimatedFederalTaxCreditMax)}`,

    estimatedPaybackYearsMin,
    estimatedPaybackYearsMax,
    estimatedPaybackLabel: `${estimatedPaybackYearsMin}–${estimatedPaybackYearsMax} years`,
  };
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`;
}

function roundToOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}