exports.calculatePnL = (
  buyPrice,
  currentPrice,
  quantity
) => {

  const pnl =
    (currentPrice - buyPrice)
    * quantity;

  const percentage =
    (
      (currentPrice - buyPrice)
      / buyPrice
    ) * 100;

  return {
    pnl,
    percentage
  };
};