const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const rewindBtn = document.getElementById('rewind-btn');
const fastForwardBtn = document.getElementById('fast-forward-btn');
const audioFileInput = document.getElementById('audio-file');
const transcriptionText = document.getElementById('transcription-text');
const convertBtn = document.getElementById('convert-btn');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');
const increaseFontBtn = document.getElementById('increase-font-btn');
const decreaseFontBtn = document.getElementById('decrease-font-btn');

// Load audio file
audioFileInput.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.load();
  }
});

// Play audio
playBtn.addEventListener('click', () => audioPlayer.play());

// Pause audio
pauseBtn.addEventListener('click', () => audioPlayer.pause());

// Rewind audio by 10 seconds
rewindBtn.addEventListener('click', () => {
  audioPlayer.currentTime -= 10;
});

// Fast forward audio by 10 seconds
fastForwardBtn.addEventListener('click', () => {
  audioPlayer.currentTime += 10;
});

// Increase font size
let currentFontSize = 16; // Starting font size
increaseFontBtn.addEventListener('click', () => {
  currentFontSize += 2; // Increase font size by 2px
  transcriptionText.style.fontSize = `${currentFontSize}px`;
});

// Decrease font size
decreaseFontBtn.addEventListener('click', () => {
  currentFontSize -= 2; // Decrease font size by 2px
  transcriptionText.style.fontSize = `${currentFontSize}px`;
});

// Convert transcription to Word file
convertBtn.addEventListener('click', () => {
  const content = transcriptionText.value;
  const blob = new Blob([content], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transcription.doc';
  a.click();
  URL.revokeObjectURL(url);
});

// Save transcription to localStorage
saveBtn.addEventListener('click', () => {
  const content = transcriptionText.value;
  localStorage.setItem('transcription', content);
  alert('Transcription saved!');
});

// Load transcription from localStorage
loadBtn.addEventListener('click', () => {
  const savedContent = localStorage.getItem('transcription');
  if (savedContent) {
    transcriptionText.value = savedContent;
  } else {
    alert('No saved transcription found.');
  }
});

// Translate text
function translateText() {
  let text = document.getElementById("inputText").value;
  let lang = document.getElementById("language").value;
  let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").innerText = data[0][0][0];
    })
    .catch(() => {
      document.getElementById("output").innerText = "Error translating text.";
    });
}