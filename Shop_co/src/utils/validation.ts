export const validateForm = (form: HTMLFormElement): boolean => {
  let isFormValid = true;
  const inputs = form.querySelectorAll('input[required]');

  inputs.forEach(input => {
    const inputEl = input as HTMLInputElement;
    const errorEl = document.getElementById(`${inputEl.id}-error`);
    let errorMessage = '';

    inputEl.classList.remove('is-invalid');
    if (errorEl) errorEl.textContent = '';

    // Проверка на пустоту
    if (inputEl.value.trim() === '') {
        errorMessage = 'This field is required.';
    }
    // Проверка длины
    else if (inputEl.minLength > 0 && inputEl.value.length < inputEl.minLength) {
        errorMessage = `Must be at least ${inputEl.minLength} characters long.`;
    }
    else if (inputEl.maxLength > 0 && inputEl.value.length > inputEl.maxLength) {
        errorMessage = `Must be no more than ${inputEl.maxLength} characters long.`;
    }
    // Проверка полей по паттерну
    else {
        switch (inputEl.id) {
            case 'email':
              if (!/^\S+@\S+\.\S+$/.test(inputEl.value)) errorMessage = 'Please enter a valid email address.';
              break;
            case 'phone':
              if (!/^\+\d{1,3}( \d{3})+$/.test(inputEl.value)) errorMessage = 'Invalid phone format (e.g., +12 345 678).';
              break;
            case 'address':
              if (!/^\d{1,5} \D+/.test(inputEl.value)) errorMessage = 'Invalid address format (e.g., 1234 Main St).';
              break;
        }
    }

    // Если есть ошибка, показываем ее
    if (errorMessage) {
      inputEl.classList.add('is-invalid');
      if (errorEl) errorEl.textContent = errorMessage;
      isFormValid = false;
    }
  });

  return isFormValid;
};