import React, { Component } from 'react';
import { getAllCards} from '../../../socketClient/dashboard';
import localStorage from 'localStorage';
import Card from '../../../Component/Card';
var listUser=[{name:"Carte Principal",username:"Jesus", name:"Christ", emploiNow:"Dieu à temps plein", src:"/src/images/user.png"},{name:"Carte Secondaire",username:"Pere", name:"Noel", emploiNow:"Fdp à temps plein",src:"/src/images/user.png"},{name:"Carte 3",username:"Raoul", name:"Iglesias", emploiNow:"Chanteur PT à temps plein",src:"/src/images/user.png"},{name:"Carte 4",username:"Pere Fouettar", name:"Lucifer", emploiNow:"Dieu à temps plein",src:"/src/images/user.png"}, {name:"carte 5",username:"Mars", name:"Hares", emploiNow:"Dieu à temps plein",src:"/src/images/user.png"}, {carte:"carte 6",username:"Zeus", name:"Jupiter", emploiNow:"Dieu à temps plein",src:"/src/images/user.png"}, {carte: "carte 7",username:"Michael", name:"Schumarer", emploiNow:"Dieu à temps plein",src:"/src/images/user.png"}, {nname:"carte 8",username:"Sadam", name:"Hussen", emploiNow:"fdp à temps plein",src:"/src/images/user.png"}, {name:"carte 9",username:"Gandhi", name:"Le grand fou", emploiNowNow:"Fummette à temps plein",src:"/src/images/user.png"}, {name:"carte 10",username:"Moundir", name:"Koh Lanta", emploiNowNow:"fdp à temps plein",src:"/src/images/user.png"}];


class Dashboard extends Component {
  constructor(){
    super()

    this.state ={
        listUser : listUser
    }
  }
  componentDidMount(){
    getAllCards((err, cards) => 
      this.setState({ listUser : cards })
    ); 
  }
  
  render(){

    var documentListUser = this.state.listUser.map(function(element, i){
      console.log(element);
      if(i < 9){
        if(i%2){
          return(
            <Card username={element.username} name={element.username} emploiNow={element.emploiNow} customColor={"customInterest0"} key={i} src="/src/images/user.png" />
          );
        }
        else{
          return(
            <Card username={element.username} name={element.username} emploiNow={element.emploiNow} customColor={"customInterest2"} key={i} src="/src/images/user.png" />
          );
        }  
      }
    });

    const listJobStats = {startWin: 22, exchange: 30, meeting: 12};

   
    
    return (
      
      <div className="gridViewWrapper">
        <a className="titleStartStats"> Vos stats StartJob</a>
        {/* <div className="containerStatsInfo">
        
          <div className="startStats">{listJobStats.startWin}</div>
          <img className="startStatsImage" src="/src/images/network.png"/>
          <div className="startStats">{listJobStats.exchange}</div>
          <img className="startStatsImage" src="/src/images/exchange-arrows.png"/>
          <div className="startStats">{listJobStats.meeting}</div>
          <img className="startStatsImage" src="/src/images/meeting.png"/>
        </div> */}
        
        <div className="containerCard">
          <div className="wrapperGridCard">
            <div className="containerWrapper"> 
              <div className="cardGridHandler">
                 {documentListUser}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
