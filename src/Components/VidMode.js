import React, { useState } from "react";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import gsap from "gsap";
import { BASE_VIEWBOX, VIEWBOXES } from "../constants";


const N_EUROPE = "950 55 220 100";
const C_EUROPE = "920 130 190 100";
const SE_EUROPE = "880 190 180 100";
const SW_EUROPE = "1010 180 180 100";

const MIDDLE_EAST_1 = "1100 265 130 80";
const MIDDLE_EAST_2 = "1140 250 140 80";

const AFRICA_1 = "955 415 160 80";
const AFRICA_2 = "980 640 260 80";

const ASIA_1 = "1410 240 400 80";
const ASIA_2 = "1410 350 300 80";
const ASIA_3 = "1420 480 350 80";

const VidMode = ({ devMode, svgRef, setCurrentContinent }) => {
  const [playing, setPlaying] = useState(false);
  // VISIT 1: LATIN AMERICA
  const handlePlayClick = () => {
    setPlaying(true);
    // toLatinAmerica();
    // toEurope();
    // toMiddleEast();
    // toAfrica();
    toAsia()
    // gsap.to(svgRef.current, {
    //     attr: { viewBox: ASIA_3 },
    // })
  };

  const toLatinAmerica = () => {
    const currentContinent = "latin-america";

    gsap.to(svgRef.current, {
      duration: 1.5,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      onComplete: () => {
        setCurrentContinent(currentContinent);
        travelLatinAmerica();
      },
    });
  };

  const travelLatinAmerica = () => {
    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: "400 350 200 200" },
      delay: 0.5,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: 2,
          attr: { viewBox: "600 500 200 150" },
          delay: 1,
          onComplete: () => {
            gsap.to(svgRef.current, {
              duration: 2,
              attr: { viewBox: "550 550 200 200" },
              delay: 1,
              onComplete: () => {
                setCurrentContinent("");
                toNorthAmerica();
              },
            });
          },
        });
      },
    });
  };

  // VISIT 2: NORTH AMERICA
  const toNorthAmerica = () => {
    const currentContinent = "north-america";

    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      delay: 2,
      onComplete: () => {
        setCurrentContinent(currentContinent);
        travelNorthAmerica();
      },
    });
  };

  const travelNorthAmerica = () => {
    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: "300 150 250 100" },
      delay: 1,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: 2,
          attr: { viewBox: "450 180 250 100" },
          delay: 1,
          onComplete: () => {
            toEurope();
          },
        });
      },
    });
  };

  // VISIT 3: NORTH AMERICA
  const toEurope = () => {
    const currentContinent = "europe";

    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      delay: 2,
      onComplete: () => {
        setCurrentContinent(currentContinent);
        travelEurope();
      },
    });
  };

  const travelEurope = () => {
    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: N_EUROPE },
      delay: 1,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: 2,
          attr: { viewBox: C_EUROPE },
          delay: 1,
          onComplete: () => {
            gsap.to(svgRef.current, {
              duration: 2,
              attr: { viewBox: SE_EUROPE },
              delay: 1,
              onComplete: () => {
                gsap.to(svgRef.current, {
                  duration: 2,
                  attr: { viewBox: SW_EUROPE },
                  delay: 1,
                  onComplete: () => {
                    setCurrentContinent("");
                    toMiddleEast();
                  },
                });
              },
            });
          },
        });
      },
    });
  };

  // VISIT 4: MIDDLE-EAST
  const toMiddleEast = () => {
    const currentContinent = "middle-east";

    setCurrentContinent(currentContinent);

    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      onComplete: () => {
        travelMiddleEast();
      },
    });
  };

  const travelMiddleEast = () => {
    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: MIDDLE_EAST_1 },
      delay: 1,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: 2,
          attr: { viewBox: MIDDLE_EAST_2 },
          delay: 1,
          onComplete: () => {
            toAfrica();
          },
        });
      },
    });
  };

  // VISIT 5: AFRICA
  const toAfrica = () => {
    const currentContinent = "africa";

    setCurrentContinent(currentContinent);

    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      onComplete: () => {
        travelAfrica();
      },
    });
  };

  const travelAfrica = () => {
    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: AFRICA_1 },
      delay: 1,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: 2,
          attr: { viewBox: AFRICA_2 },
          delay: 1,
          onComplete: () => {
            toAsia();
          },
        });
      },
    });
  };


  // VISIT 6: ASIA
  const toAsia = () => {
    const currentContinent = "asia";

    setCurrentContinent(currentContinent);

    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      onComplete: () => {
        travelAsia();
      },
    });
  };

  const travelAsia = () => {
    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: ASIA_1 },
      delay: 1,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: 2,
          attr: { viewBox: ASIA_2 },
          delay: 1,
          onComplete: () => {
            gsap.to(svgRef.current, {
                duration: 2,
                attr: { viewBox: ASIA_3 },
                delay: 1,
                onComplete: () => {
                  return;
                },
              });
          },
        });
      },
    });
  };


  // VISIT 7: AUSTRALASIA
  const visitAustralasia = () => {
    const currentContinent = "australasia";

    setCurrentContinent(currentContinent);

    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      onComplete: () => {
        finalize();
      },
    });
  };

  // ZOOM OUT AGAIN
  const finalize = () => {
    const currentContinent = "";

    setCurrentContinent(currentContinent);

    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: BASE_VIEWBOX },
      onComplete: () => {
        return;
      },
    });
  };

  return (
    <div>
      {!playing && (
        <div style={iconContainterStyle}>
          <PlayCircleIcon onClick={handlePlayClick} />
        </div>
      )}
    </div>
  );
};

const iconContainterStyle = {
  display: "flex",
  position: "absolute",
  top: "10px",
  left: "40px",
  width: "auto",
};

export default VidMode;
