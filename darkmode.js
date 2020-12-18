const getFromLocalStorage = function(key) {
  return JSON.parse(localStorage.getItem(key));
}

export const ChangeTheme = function() {
  ToggleClass(document.body, ToggleButton('appearance', 'darkmode'), 'dark');
}

export const ToggleHideSettings = function() {
  ToggleClass(document.getElementById("settings"), ToggleButton('hide', 'hide-settings'), 'hidden');
}

export const Init = function() {
  ToggleClass(document.body, SetButton('appearance', getFromLocalStorage('darkmode')), 'dark');
  ToggleClass(document.getElementById("settings"), SetButton('hide', getFromLocalStorage('hide-settings')), 'hidden');
}

export const SetButton = function(buttonId, val) {
  let button = document.getElementById(buttonId);
  if (button) {
    let buttonContent = button.getElementsByClassName("btn-content");
    const idx = Number(val) || 0;
    buttonContent[idx].classList.remove("hidden"); 
    buttonContent[Number(!Boolean(idx))].classList.add("hidden");
  }
  return val;
}

export const ToggleButton = function(buttonId, localStorageKey) {
  const val = getFromLocalStorage(localStorageKey);
  localStorage.setItem(localStorageKey, !val);
  return SetButton(buttonId, !val);
}

export const ToggleClass = function(content, val, className) {
  if (!content) return;
  if (val) {
    content.classList.add(className); 
  } else {
    content.classList.remove(className);
  }
}