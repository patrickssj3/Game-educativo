let audioEnabled = false;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function enableAudio() {
  audioEnabled = true;

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playTone(frequency, duration, type = "sine") {
  if (!audioEnabled) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  gain.gain.setValueAtTime(0.08, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + duration
  );

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function playSuccessSound() {
  playTone(520, 0.12, "sine");
  setTimeout(function () {
    playTone(720, 0.15, "sine");
  }, 120);
}

function playMissionEndSound() {
  playTone(440, 0.12, "triangle");
  setTimeout(function () {
    playTone(660, 0.12, "triangle");
  }, 120);
  setTimeout(function () {
    playTone(880, 0.2, "triangle");
  }, 240);
}

function playWarningSound() {
  playTone(180, 0.18, "sawtooth");
}