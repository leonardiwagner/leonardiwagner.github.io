import React from 'react';
import './contact.scss'

const Contact = ({ contact }) => 
 <div className="contact">
   <div class="picture">
    <img src="/me.png" className="picture" />
   </div>
  
  <div className="info">
    <div className="name">
      Wagner Leonardi
    </div>
    <div className="items">
      <div>
      📆 08/06/1989
      </div>
      <div>
      🇧🇷 Brazilian
      </div>
      <div>
      📞 +55 11 94828 3864
      </div>
      <div>
      ⚙ GitHub
      </div>
      <div>
      ⚙ StackOverflow
      </div>
      <div>
      📧 leonardiwagner@gmail.com
      </div>
    </div>
  </div>
   
 </div>

export default Contact;
