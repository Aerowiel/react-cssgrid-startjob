import React, { Component } from 'react';
import { getAllCards} from '../../../socketClient/test';

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
      if(i%2){
        return(
            <div key= {i} className="wrapperCard customColor">
                <div className="cardHeader customHeader">
                    <img className="cardImage" src={element.src}>
                    </img>
                      <div className="cardNames">
                        <a>{element.username}</a>
                        <a>{element.name}</a>
                      </div>
                      <div className="cardEmploy">
                        <a>{element.emploiNow}</a>
                      </div>
                </div>
                <div className="cardContent">
                  <button onClick={destroyCard.bind(this)}> Next
                    </button>
                </div>
            </div>
        );
      }
      else{
        return(
            <div key={i} className="wrapperCard">
                <div className="cardHeader">
                    <img className="cardImage" src={element.src}>
                    </img>
                    <div className="cardNames">
                        <a>{element.username}</a>
                        <a>{element.name}</a>
                    </div>
                    <div className="cardEmploy">
                        <a>{element.emploiNowNow}</a>
                      </div>
                </div>
                <div className="cardContent">
                  <button onClick={destroyCard.bind(this)}> Next
                    </button>
                </div>
            </div>
        );
      }
      
    });

    const listJobStats = {startWin: 22, exchange: 30, meeting: 12};
    
    console.log(this.state.listUser);

    var that = this;
    function destroyCard(e){
      //e.target.parentNode.classList.add('cardDeleteAnimation');
      e.target.parentNode.parentNode.remove();
    }

    return (
      
      <div className="gridViewWrapper">
        <a className="titleStartStats"> Vos stats StartJob</a>
        <div className="containerStatsInfo">
        
          <div className="startStats">{listJobStats.startWin}</div>
          <img className="startStatsImage" src="/src/images/network.png"/>
          <div className="startStats">{listJobStats.exchange}</div>
          <img className="startStatsImage" src="/src/images/exchange-arrows.png"/>
          <div className="startStats">{listJobStats.meeting}</div>
          <img className="startStatsImage" src="/src/images/meeting.png"/>
        </div>
        
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
