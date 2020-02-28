import React from 'react';
import './skill.scss'

const Skill = ({ title, color }) => 
 <div className="skill" style={{backgroundColor: color}}>
   <div className="skill__text" >
    { title }
   </div>
   {/* <div className="skill__value">
     <div className="skill__value__light"></div>
     <div className="skill__value__light"></div>
     <div className="skill__value__light off"></div>
   </div> */}
 </div>

export default Skill;
