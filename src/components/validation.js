//Валидация

// Функция, которая добавляет класс с ошибкой
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationSettings
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationSettings.errorClass);
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, validationSettings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationSettings
    );
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция переключения состояния кнопки в форме
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Функция добавления слушателя на валидацию для каждого поля в форме(массиве)
const setValidationEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationSettings);
      toggleButtonState(
        inputList,
        buttonElement,
        validationSettings.inactiveButtonClass
      );
    });
  });
};

// Функция добавления валидации каждой формы
export const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setValidationEventListeners(formElement, validationSettings);
  });
};

//Очистка ошибок и блокировка кнопки
export const clearValidation = (formElement, validationSettings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
  toggleButtonState(
    inputList,
    buttonElement,
    validationSettings.inactiveButtonClass
  );
};
