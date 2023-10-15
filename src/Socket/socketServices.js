export const playSound = ()=>{
  if (document.hasFocus()) {
    const audio = new Audio("../assets/tone/glass.mp3");
    audio.play();
  }
}