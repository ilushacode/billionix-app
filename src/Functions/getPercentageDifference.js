const getPercentageDifference = (history, currentPrice) => {
  if (!Array.isArray(history) || history.length === 0) {
    console.warn("История пуста или не является массивом");
    console.log(history)
    return {
      percentDiff: 0,
      isPositive: true,
    };
  }

  // Сортируем по дате, чтобы получить самый последний элемент
  const sorted = [...history].sort(
    (a, b) => new Date(b.datetime) - new Date(a.datetime)
  );

  const lastPrice = sorted[0].price;

  if (typeof lastPrice !== "number" || typeof currentPrice !== "number") {
    console.warn("Некорректные данные для расчёта");
    return {
      percentDiff: 0,
      isPositive: true,
    };
  }

  const difference = ((currentPrice - lastPrice) / lastPrice) * 100;

  // Округляем до 2 знаков после запятой
  const percentDiff = parseFloat(difference.toFixed(2));

  // Флаг: true если рост, false если падение
  const isPositive = percentDiff >= 0;

  return {
    percentDiff: Math.abs(percentDiff),
    isPositive,
  };
}

export default getPercentageDifference;
