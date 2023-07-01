// Declaration of all the constants
export const BASE_VIEWBOX = "0 0 2000 857";
export const ANIMATION_DURATION = 0.5; // in seconds

export const steps = {
  continentSelection: 0,
  continentConfirmation: 1,
  messageDrawing: 2,
  messagePlacing: 3,
};

export const CONTINENT_NAMES = {
  africa: "Africa",
  asia: "Asia",
  australasia: "Australasia",
  europe: "Europe",
  "middle-east": "Middle-East",
  "north-america": "North-America",
  "latin-america": "Latin-America",
};

export const VIEWBOXES = {
  africa: "840 330 500 400",
  asia: "1000 0 800 600",
  australasia: "1500 400 550 450",
  europe: "850 10 360 275",
  "middle-east": "890 150 600 300",
  "north-america": "170 0 780 400",
  "latin-america": "350 280 440 580",
};

export const START_POSITIONS = {
  africa: ["1000", "100"],
  asia: ["510", "165"],
  australasia: ["700", "630"],
  europe: ["1000", "200"],
  "middle-east": ["150", "300"],
  "north-america": ["-450", "150"],
  "latin-america": ["-320", "500"],
};

export const DRAG_FACTORS = {
  africa: 1.5,
  asia: 1.5,
  australasia: 1.5,
  europe: 1.5,
  "middle-east": 1,
  "north-america": 1,
  "latin-america": 2.5,
};

export const svgNS = "http://www.w3.org/2000/svg";
