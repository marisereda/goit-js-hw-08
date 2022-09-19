import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

restoreSavedData();
formEl.addEventListener('input', throttle(onInputEvent, 500));
formEl.addEventListener('submit', onSubmitEvent);

function restoreSavedData() {
  const dataSaved = getSavedData();

  for (const key in dataSaved) {
    formEl.elements[key].value = dataSaved[key] ?? '';
  }
}

function onInputEvent(event) {
  const target = event.target;
  const dataSaved = getSavedData();

  dataSaved[target.name] = target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataSaved));
}

function onSubmitEvent(event) {
  event.preventDefault();

  const formData = new FormData(formEl);
  const dataSaved = {};
  formData.forEach((value, key) => (dataSaved[key] = value));
  console.log(dataSaved);

  localStorage.removeItem(STORAGE_KEY);
  formEl.reset();
}

function getSavedData() {
  const formStateData = localStorage.getItem(STORAGE_KEY);

  try {
    return JSON.parse(formStateData) ?? {};
  } catch {
    return {};
  }
}
