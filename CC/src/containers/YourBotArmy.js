import React from "react";
import BotCard from '../components/BotCard'
  
  const YourBotArmy = props => {

    const bots = props.armyBots
    const armyBots = bots.map(bot => {
      return <BotCard
        bot={bot}
        key={bot.id}
        cardClicked={props.cardClicked}
        unenlistBot={props.unenlistBot}
        />
    })
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            {armyBots}
          </div>
        </div>
      </div>
    );
  }
  

export default YourBotArmy;
