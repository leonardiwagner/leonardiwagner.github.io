import React from 'react';
import logo from './logo.svg';
import './App.scss';

import Skills from './components/skills'
import Experience from './components/experience'
import Contact from './components/contact'

const skills = [
  {
    title: 'Programming',
    skills: [
      { title: 'Javascript', value: 3, color: 0 },
      { title: 'Clojure', value: 2, color: 0 },
      { title: 'Java', value: 2, color: 0 }
    ]
  },
  {
    title: 'Databases',
    skills: [
      { title: 'SQL', value: 3, color: 1 },
      { title: 'GraphQL', value: 3, color: 1 },
      { title: 'ElasticSearch', value: 2, color: 1 }
    ]
  },
  {
    title: 'Front-End',
    skills: [
      { title: 'Front-End', color: 3 },
      { title: 'React.js', value: 3, color: 3 },
      
    ]
  },
  {
    title: 'Architecture',
    skills: [
      { title: 'Testing', value: 3, color: 4 },
      { title: 'Design Patterns', value: 3, color: 4 },
      { title: 'DDD', value: 1, color: 4 },
      { title: 'Microservices', value: 1, color: 4 }
    ]
  },
  {
    title: 'Infrastructure',
    skills: [
      { title: 'DevOps', value: 1, color: 5 },
      { title: 'Docker', value: 3, color: 5 },
      { title: 'AWS', value: 3, color: 5 }
      
    ]
  },
  {
    title: 'Organizational',
    skills: [
      { title: 'Agile', value: 3, color: 6 },
      { title: 'SCRUM Master', value: 3, color: 6 },
      { title: 'Team Lead', value: 2, color: 6 },
      { title: 'Product Management', value: 1, color: 6 }
    ]
  }
]

const experiences = [
  {
    title: "Software Engineer",
    company: "Sprinklr",
    date: "from 2010/05/21 - present",
    items: [
      "The doggs pound",
      "byatch"
    ]
  },
  {
    title: "Software Engineer",
    company: "Lambda3",
    date: "from 2010/05/21 - 2068/15/12",
    items: [
      "The doggs pound",
      "byatch"
    ]
  },
  {
    title: "Software Engineer",
    company: "Lambda3",
    date: "2010/05/21 - 2068/15/12",
    items: [
      "The doggs pound",
      "byatch"
    ]
  }
]

function App() {
  return (
    
       
     <div className="App">
       <Contact />
       <div class="app">
        <div className="left">
          <div className="resume">
              Hello, I’m a software engineer for both hobby and occupation, although I’ve been
      working with development for a decade I’m always looking for learning and continuous
      improvement.
      <br /><br />
      I love working together with people, creating the best communication flow as possible,
      with fast deliveries through high-quality and maintainable software focused on the
      product and customers.
            </div>
            <div className="experiences">
              <div className="title">Experiences</div>
              {
                experiences.map((e) =>
                  <Experience experience={e} />
                )
              }
            </div>
            
          
        </div>
        <div className="right">
          <Skills skills={skills} />
          <div className="education">
            <div className="title">Education</div>
            <div className="edu">
              <strong>Computer Science</strong>
              <div>UNIP</div>
              <div className="experience__title__date">
                2009-2012
              </div>
            </div>
          </div>
        </div>

       </div>
      <div className="title">Traits</div>
      <div className="traits">
        <div className="trait">
          <div className="icon">
            <img src="png.png" />
          </div>
          <div className="text">
            <div className="text__title">Collaborative</div>
            I believe that people make great software, not code.
          </div>
        </div>
        <div className="trait">
          <div className="icon">
            <img src="png2.png" />
          </div>
          <div className="text">
            <div className="text__title">Questioner</div>
            I believe that people make great software, not code.
          </div>
        </div>
        <div className="trait">
          <div className="icon">
            <img src="png3.png" />
          </div>
          <div className="text">
            <div className="text__title">Learner</div>
            I believe that people make great software, not code.
          </div>
        </div>
      </div>
        
    
      
    </div>
  );
}

export default App;
