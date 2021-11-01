console.clear();

gsap.registerPlugin(MotionPathPlugin);

const viewport = document.querySelector("#viewport");
const world = document.querySelector("#world");
const bee = document.querySelector("#bee");

const worldWidth = world.offsetWidth;
const worldHeight = world.offsetHeight;

const setX = gsap.quickSetter(world, "x", "px");
const setY = gsap.quickSetter(world, "y", "px");
const setOrigin = gsap.quickSetter(world, "transformOrigin");
const beeProps = gsap.getProperty(bee);

let vw, vh, clampX, clampY;
onResize();

gsap.set("#svg", {
  width: 5000,
  height: 5000
});

gsap.set(bee, {
  xPercent: -50,
  yPercent: -50,
  x: path[0],
  y: path[1]
});

gsap.from(bee, {
  motionPath: {
    path: "#path",
    matrix: { a: 5, b: 0, c: 0, d: 5, e: 0, f: 0 },
    type: "cubic",
    autoRotate: true
  },
  duration: 20,
  ease: "linear",
  repeat: -1,
  onUpdate() {
    const x = beeProps("x");
    const y = beeProps("y");

    setOrigin(`${x}px ${y}px`);
    setX(-clampX(x - vw / 2));
    setY(-clampY(y - vh / 2));
  }
});

// GUI
const quickSettings = QuickSettings.create(5, 5, "World").addRange(
  "Scale",
  1,
  5,
  1,
  0.01,
  function (value) {
    gsap.to(world, {
      scale: value,
      duration: 0.3
    });
  }
);

window.addEventListener("resize", onResize);

function onResize() {
  vw = window.innerWidth;
  vh = window.innerHeight;
  clampX = gsap.utils.clamp(0, worldWidth - vw);
  clampY = gsap.utils.clamp(0, worldHeight - vh);
}
