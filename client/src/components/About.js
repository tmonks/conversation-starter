import React from "react";
import "./ContentContainer.scss";

const About = () => {
  return (
    <div className="content-container">
      <h4>About</h4>
      <p>
        Conversation starters are a great way to get your kids talking, to add some variety to your
        conversations, and to help your family connect through more meaningful conversations.
      </p>
      <p>
        If you have any favorite conversation starters you'd like to see added, please submit them
        using the Add link above. All submissions will be reviewed before being added to the app.
      </p>
      <p>Developed by Tom Monks. Please contact me with any feedback or suggestions.&nbsp;</p>
      <p>
        <a href="http://tommonks.net/#contactSection" target="_blank">
          http://tommonks.net
        </a>
      </p>
    </div>
  );
};

export default About;
