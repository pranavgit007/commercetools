import { ProductProjection } from "@commercetools/platform-sdk";

export function formatPrice(
  centAmount: number,
  currencyCode: string,
  locale: string = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(centAmount / 100);
}

export function getformatedAmount(product:ProductProjection) {
  const priceData = product.masterVariant.price;

  const formatted =
    priceData &&
    formatPrice(priceData.value.centAmount, priceData.value.currencyCode);
  return formatted ?? "Price not available";
}
