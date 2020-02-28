import React from 'react';
import './experience.scss'

const Experience = ({experience: { title, company, date, items }}) => 
 <div className="experience">
   <div className="experience__title">
     <strong>{company}</strong>, {title}
     <div className="experience__title__date">
       {date}
     </div>
   </div>
   <ul>
     {
       items.map((item) => 
        <li>{item}</li>
       )
     }
   </ul>
 </div>

export default Experience;
