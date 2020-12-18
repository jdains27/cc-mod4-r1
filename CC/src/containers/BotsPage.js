//The event wasn't working so I changed it.

import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'

class BotsPage extends Component {
  
  state = {
    bots: [],
    armyBots: [],
    display: 'all'
  }

  componentDidMount(){
    fetch("http://localhost:6001/bots")
    .then(resp => resp.json())
    .then(json =>this.setState({bots: json}))
  }

  addBotToArmy = (bot) => {
    const armyBots = this.state.armyBots
    if (!this.isBotInArmy(bot)){
      this.setState({armyBots: [...armyBots, bot]})
    }
    this.changeDisplay(null, 'all');
    console.log("Bot was enlisted!")
  }

  changeDisplay = (bot, type) => {
    if(type === "all"){
      this.setState({display: type})
    } else {
      this.setState({display: bot})
    }
  }

  unenlistBot = (bot) => {
    const armyBot = this.isBotInArmy(bot);
    const bots = this.state.bots;
    const newBots = bots.filter(enlistedBot=> bot.id !==enlistedBot.id)
    this.setState({bots: newBots});
    if (armyBot){this.removeBotFromArmy(armyBot)}
    this.deleteBot(bot)
  }
  removeBotFromArmy = (bot) => {
    const armyBots = this.state.armyBots
    const newArmyBots = armyBots.filter(armyBot => bot.id !== armyBot.id)
    this.setState({armyBots: newArmyBots});
  }
  deleteBot = (bot) => {
    fetch("http://localhost:6001/bots/"+bot.id, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    })
  }
  isBotInArmy = (bot) => {
    let botFound = false;
    const bots = this.state.armyBots;
    bots.forEach(armyBot => {
      if(armyBot.id === bot.id){
        botFound = armyBot;
      }
    });
    return botFound;
  }

  render() {
    return <div>

      <YourBotArmy
        cardClicked={this.removeBotFromArmy}
        armyBots={this.state.armyBots}
        unenlistBot={this.unenlistBot}
      />
      <BotCollection
        display={this.state.display}
        addBotToArmy={this.addBotToArmy}
        bots={this.state.bots}
        unenlistBot={this.unenlistBot}
        changeDisplay={this.changeDisplay}
      />
    </div>;
  }
}

export default BotsPage;
