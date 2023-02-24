import {
  Africa,
  Asia,
  Australasia,
  Europe,
  LatinAmerica,
  MiddleEast,
  NorthAmerica,
} from "./Continents";
import { IADMFR_LOGO } from "./logo";

function Worldmap(props) {
  return (
    <>
    <svg
      baseProfile="tiny"
      strokeLinecap="round"
      strokeLinejoin="round"
      version="1.2"
      viewBox="0 0 2000 857"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g onClick={(e) => props.activateArea(e)} className="Asia">
        <Asia />
      </g>
      <g onClick={(e) => props.activateArea(e)} className="Africa">
        <Africa />
      </g>
      <g onClick={(e) => props.activateArea(e)} className="Europe">
        <Europe />
      </g>
      <g onClick={(e) => props.activateArea(e)} className="MiddleEast">
        <MiddleEast />
      </g>
      <g onClick={(e) => props.activateArea(e)} className="NorthAmerica">
        <NorthAmerica />
      </g>
      <g onClick={(e) => props.activateArea(e)} className="LatinAmerica">
        <LatinAmerica />
      </g>
      <g onClick={(e) => props.activateArea(e)} className="LatinAmerica">
        <Australasia />
      </g>

      <circle cx="997.9" cy="189.1" id="0"></circle>
      <circle cx="673.5" cy="724.1" id="1"></circle>
      <circle cx="1798.2" cy="719.3" id="2"></circle>
    </svg>
    <div className="logoBox">
      <IADMFR_LOGO/>
    </div>

    </>
  );
}

export default Worldmap;
