import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { members } from "../constants";

const Mbs = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {members.map((membs) => (
        <div className='w-28 h-28' key={membs.name}>
          <BallCanvas icon={membs.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Mbs, "members");
