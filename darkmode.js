const classNames = {
  add: ["light", "dark"],
  remove: ["dark", "light"]
}

const getDarkMode = function() {
  return JSON.parse(localStorage.getItem('darkmode'));
}

export const ChangeTheme = function() {
  const dm = getDarkMode()
  localStorage.setItem('darkmode', !dm); 
  SetAppearance(!dm);
}

export const Init = function() {
  const darkmode = getDarkMode()
  SetAppearance(darkmode);
}

export const SetAppearance = function(darkmode) {
  const idx = Number(darkmode) || 0; 
  let content = document.body; 
  content.classList.remove(classNames.remove[idx]); 
  content.classList.add(classNames.add[idx]); 
  let button = document.getElementById("appearance");
  let buttonContent = button.getElementsByClassName("btn-content");
  buttonContent[idx].classList.remove("hidden"); 
  buttonContent[Number(!Boolean(idx))].classList.add("hidden"); 
}