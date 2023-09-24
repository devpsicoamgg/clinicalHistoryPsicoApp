// Función para calcular la edad a partir de la fecha de nacimiento
const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();

  const yearDiff = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  const dayDiff = currentDate.getDate() - birthDate.getDate();

  let ageYears = yearDiff;
  let ageMonths = monthDiff;
  let ageDays = dayDiff;

  // Ajustar los valores negativos
  if (dayDiff < 0) {
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    ageDays = lastDayOfMonth + dayDiff;
    ageMonths--;
  }

  if (monthDiff < 0) {
    ageMonths = 12 + monthDiff;
    ageYears--;
  }

  return `${ageYears} años, ${ageMonths} meses y ${ageDays} días.`;
};

export default calculateAge;
