const formatPrice = (number) => {
  // Преобразуем к числу и проверяем корректность
  const num = typeof number === "number" ? number : parseFloat(number);
  if (isNaN(num)) return "0,00";

  // Разделяем на целую и дробную части
  const [integerPart, decimalPart] = num.toFixed(2).split(".");

  // Добавляем пробелы как разделители тысяч
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Собираем результат
  return `${formattedInteger},${decimalPart}`;
}

export default formatPrice