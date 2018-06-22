import React, { Component } from 'react';

var listUser=[{name:"Carte Principal",prenom:"Jesus", nom:"Christ", emploi:"Dieu à temps plein", src:"/src/images/user.png"},{name:"Carte Secondaire",prenom:"Pere", nom:"Noel", emploi:"Fdp à temps plein",src:"/src/images/user.png"},{name:"Carte 3",prenom:"Raoul", nom:"Iglesias", emploi:"Chanteur PT à temps plein",src:"/src/images/user.png"},{name:"Carte 4",prenom:"Pere Fouettar", nom:"Lucifer", emploi:"Dieu à temps plein",src:"/src/images/user.png"}, {name:"carte 5",prenom:"Mars", nom:"Hares", emploi:"Dieu à temps plein",src:"/src/images/user.png"}, {carte:"carte 6",prenom:"Zeus", nom:"Jupiter", emploi:"Dieu à temps plein",src:"/src/images/user.png"}, {carte: "carte 7",prenom:"Michael", nom:"Schumarer", emploi:"Dieu à temps plein",src:"/src/images/user.png"}, {nname:"carte 8",prenom:"Sadam", nom:"Hussen", emploi:"fdp à temps plein",src:"/src/images/user.png"}, {name:"carte 9",prenom:"Gandhi", nom:"Le grand fou", emploi:"Fummette à temps plein",src:"/src/images/user.png"}, {name:"carte 10",prenom:"Moundir", nom:"Koh Lanta", emploi:"fdp à temps plein",src:"/src/images/user.png"}];


class Dashboard extends Component {
  constructor(){
    super()

    this.state ={
        listUser
    }
    
  }

  
  render() {

    var documentListUser = listUser.map(function(element, i){
      if(i%2){
        return(
            <div key= {i} className="wrapperCard customColor">
                <div className="cardHeader customHeader">
                    <img className="cardImage" src={element.src}>
                    </img>
                      <div className="cardNames">
                        <a>{element.prenom}</a>
                        <a>{element.nom}</a>
                      </div>
                      <div className="cardEmploy">
                        <a>{element.emploi}</a>
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
                        <a>{element.prenom}</a>
                        <a>{element.nom}</a>
                    </div>
                    <div className="cardEmploy">
                        <a>{element.emploi}</a>
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
    
    console.log(this.state);

    var that = this;
    function destroyCard(e){
      e.target.parentNode.classList.add('cardDeleteAnimation');
      //e.target.parentNode.parentNode.remove();
    }
    

    return (
      
      <div className="gridViewWrapper">
        <a className="titleStartStats"> Vos stats StartJob</a>
        <div className="containerStatsInfo">
        
          <div className="startStats"><div className="bulleNumberStats"><div>{listJobStats.startWin}</div></div> <img className="startStatsImage" src="/src/images/network.png"></img></div>
          <div className="startStats"><div className="bulleNumberStats"><div>{listJobStats.exchange}</div></div><img className="startStatsImage" src="/src/images/exchange-arrows.png"></img></div>
          <div className="startStats"><div className="bulleNumberStats"><div>{listJobStats.meeting}</div></div><img className="startStatsImage" src="/src/images/meeting.png"></img></div>
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
