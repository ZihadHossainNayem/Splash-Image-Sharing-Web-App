export default function formatNumber(number) {
  const formatter = Intl.NumberFormat("en", {
    /* compact for : 1000 => 1k */
    notation: "compact",
    maximumFractionDigits: 2,
  });

  return formatter.format(number);
}
