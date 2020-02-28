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
    <div className="items" >
      <div className="a">
      📆 08/06/1989
      </div>
      <div className="b">
      🇧🇷 Brazilian
      </div>
      <div>
      📞 +55 11 94828 3864
      </div>
      <div className="a">
      ⚙ GitHub
      </div>
      <div className="b">
      ⚙ StackOverflow
      </div>
      <div>
      📧 leonardiwagner@gmail.com
      </div>
    </div>
  </div>
   
 </div>

export default Contact;
