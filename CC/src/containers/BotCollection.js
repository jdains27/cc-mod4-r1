import React  from "react";
import BotCard from '../components/BotCard';
import BotSpecs from '../components/BotSpecs'

const BotCollection = props => {

  const renderBots = () =>{
    const bots = props.bots.map(bot => {
      return <BotCard
        cardClicked={props.changeDisplay}
        unenlistBot={props.unenlistBot}
        key={bot.id}
        bot={bot}
      />
    })

    return bots
  }
    return (
      <div className="ui four column grid">
        <div className="row">
        { props.display === "all" ?
            renderBots()
            :
            <BotSpecs
              bot={props.display}
              addBotToArmy={props.addBotToArmy}
              changeDisplay={props.changeDisplay}
              />  }
        </div>
      </div>
    );
  }


export default BotCollection;
