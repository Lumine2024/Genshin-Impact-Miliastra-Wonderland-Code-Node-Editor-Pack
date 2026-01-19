const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const state = {
  radius: 18,
  position: { x: 120, y: 120 },
  velocity: { x: 220, y: 180 },
  lastFrame: 0,
};

const colors = {
  ball: "#fbd38d",
  glow: "rgba(251, 211, 141, 0.4)",
  highlight: "#ffffff",
  shadow: "rgba(0, 0, 0, 0.45)",
};

const setCanvasSize = () => {
  const ratio = window.devicePixelRatio || 1;
  const { clientWidth, clientHeight } = canvas;
  canvas.width = clientWidth * ratio;
  canvas.height = clientHeight * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
};

const resetBall = () => {
  state.position.x = canvas.clientWidth * 0.3;
  state.position.y = canvas.clientHeight * 0.35;
  state.velocity.x = 180 + Math.random() * 120;
  state.velocity.y = 160 + Math.random() * 110;
  if (Math.random() > 0.5) {
    state.velocity.x *= -1;
  }
  if (Math.random() > 0.5) {
    state.velocity.y *= -1;
  }
};

const update = (deltaSeconds) => {
  state.position.x += state.velocity.x * deltaSeconds;
  state.position.y += state.velocity.y * deltaSeconds;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (state.position.x - state.radius <= 0) {
    state.position.x = state.radius;
    state.velocity.x = Math.abs(state.velocity.x);
  } else if (state.position.x + state.radius >= width) {
    state.position.x = width - state.radius;
    state.velocity.x = -Math.abs(state.velocity.x);
  }

  if (state.position.y - state.radius <= 0) {
    state.position.y = state.radius;
    state.velocity.y = Math.abs(state.velocity.y);
  } else if (state.position.y + state.radius >= height) {
    state.position.y = height - state.radius;
    state.velocity.y = -Math.abs(state.velocity.y);
  }
};

const drawBall = () => {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  context.shadowColor = colors.shadow;
  context.shadowBlur = 18;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 6;

  context.beginPath();
  context.fillStyle = colors.ball;
  context.arc(state.position.x, state.position.y, state.radius, 0, Math.PI * 2);
  context.fill();

  context.shadowColor = colors.glow;
  context.shadowBlur = 28;
  context.shadowOffsetY = 0;

  context.beginPath();
  context.fillStyle = colors.glow;
  context.arc(state.position.x, state.position.y, state.radius + 4, 0, Math.PI * 2);
  context.fill();

  context.shadowColor = "transparent";
  context.beginPath();
  context.fillStyle = colors.highlight;
  context.arc(state.position.x - 6, state.position.y - 6, state.radius * 0.35, 0, Math.PI * 2);
  context.fill();
};

const loop = (timestamp) => {
  if (!state.lastFrame) {
    state.lastFrame = timestamp;
  }
  const delta = (timestamp - state.lastFrame) / 1000;
  state.lastFrame = timestamp;

  update(delta);
  drawBall();
  window.requestAnimationFrame(loop);
};

setCanvasSize();
resetBall();
window.requestAnimationFrame(loop);

window.addEventListener("resize", () => {
  setCanvasSize();
});

canvas.addEventListener("click", () => {
  resetBall();
});
