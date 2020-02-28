import React from 'react';
import './skills.scss'

import Skill from '../skill'

const colors = [
  {id: 0, color: 'yellow'},
  {id: 1, color: 'green'},
  {id: 2, color: 'red'},
  {id: 3, color: 'blue'},
  {id: 4, color: 'magenta'},
  {id: 5, color: 'green'},
  {id: 6, color: 'magenta'},
]

const getSkillColor = ({ color }) => {
  const result = colors.find(x => x.id === color)
  return result && result.color
}

const Skills = ({ skills }) =>
<div className="skills_box">
  <div className="title">
    Skills
  </div>
  <div className="skills">
    {

        skills.map((skill) => 
    
            skill.skills.map((skill) => <Skill title={skill.title} color={getSkillColor(skill)} />)

        )

    }
  </div>
</div>
 
export default Skills;
