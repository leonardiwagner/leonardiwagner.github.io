import React from 'react';
import './skills.scss'

import Skill from '../skill'

const Skills = ({ skills }) =>
 <div className="skills">
   {
      skills.map((skill) =>
        <div className="skills__item">
          <div className="skills__item__title">{skill.title}</div>
          {/* <div className="skills__item__skills"> */}
            {
              skill.skills.map((skill) => <Skill title={skill.title} />)
            }
          {/* </div> */}
        </div>
      )

   }
 </div>
export default Skills;
