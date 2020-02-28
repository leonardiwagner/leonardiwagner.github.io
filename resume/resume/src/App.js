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
      { title: 'Node.js', value: 3, color: 0 },
      { title: 'C#', value: 3, color: 0 },
      { title: 'Clojure', value: 2, color: 0 },
      { title: 'Java', value: 2, color: 0 }
    ]
  },
  {
    title: 'Databases',
    skills: [
      { title: 'SQL (Relational)', value: 3, color: 1 },
      { title: 'NoSQL', value: 2, color: 1 },
      { title: 'GraphQL', value: 3, color: 1 },
      { title: 'ElasticSearch', value: 2, color: 1 }
    ]
  },
  {
    title: 'Front-End',
    skills: [
      { title: 'React.js', value: 3, color: 3 },
      { title: 'Mobile (PhoneGap)', color: 3 },
      { title: 'Angular', color: 3 }
    ]
  },
  {
    title: 'Architecture',
    skills: [
      { title: 'Testing', value: 3, color: 4 },
      { title: 'Design Patterns', value: 3, color: 4 },
      { title: 'DDD', value: 1, color: 3 },
      { title: 'Microservices', value: 1, color: 4 },
      { title: 'Monitoring', value: 1, color: 4 }
    ]
  },
  {
    title: 'Infrastructure',
    skills: [
      { title: 'Docker', value: 3, color: 5 },
      { title: 'Kubernetes', value: 3, color: 5 },
      { title: 'AWS', value: 3, color: 5 },
      { title: 'DevOps', value: 1, color: 5 }
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
    date: "from 2010/05/21 to 2068/15/12",
    items: [
      "The doggs pound",
      "byatch"
    ]
  },
  {
    title: "Software Engineer",
    company: "Lambda3",
    date: "from 2010/05/21 to 2068/15/12",
    items: [
      "The doggs pound",
      "byatch"
    ]
  },
  {
    title: "Software Engineer",
    company: "Lambda3",
    date: "from 2010/05/21 to 2068/15/12",
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

        <div className="resume">
        Hello, I’m a software engineer for both hobby and occupation, although I’ve been
working with development for a decade I’m always looking for learning and continuous
improvement.
I love working together with people, creating the best communication flow as possible,
with fast deliveries through high-quality and maintainable software focused on the
product and customers.
        </div>

      <Skills skills={skills} />
     
     
      
      {
        experiences.map((e) =>
          <Experience experience={e} />
        )
      }
    
      
    </div>
  );
}

export default App;
