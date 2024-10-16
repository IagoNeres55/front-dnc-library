const FormattedDate = (dateTime) => {
  const date = new Date(dateTime);

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const formattedDate = date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formattedDate;
};

export default FormattedDate;
