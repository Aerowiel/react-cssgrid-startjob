import React, { Component } from 'react';
import { getAllCards} from '../../../socketClient/dashboard';
import localStorage from 'localStorage';
import Card from '../../../Component/Card';
var listUser=[{name:"Carte Principal",username:"Jesus", name:"Christ", emploiNow:"Dieu à temps plein", src:"/src/images/user.png"},{name:"Carte Secondaire",username:"Pere", name:"Noel", emploiNow:"Fdp à temps plein",src:"/src/images/user.png"},{name:"Carte 3",username:"Raoul", name:"Iglesias", emploiNow:"Chanteur PT à temps plein",src:"/src/images/user.png"},{name:"Carte 4",username:"Pere Fouettar", name:"Lucifer", emploiNow:"Dieu à temps plein",src:"/src/images/user.png"}, {name:"carte 5",username:"Mars", name:"Hares", emploiNow:"Dieu à temps plein",src:"/src/images/user.png"}, {carte:"carte 6",username:"Zeus", name:"Jupiter", emploiNow:"Dieu à temps plein",src:"/src/images/user.png"}, {carte: "carte 7",username:"Michael", name:"Schumarer", emploiNow:"Dieu à temps plein",src:"/src/images/user.png"}, {nname:"carte 8",username:"Sadam", name:"Hussen", emploiNow:"fdp à temps plein",src:"/src/images/user.png"}, {name:"carte 9",username:"Gandhi", name:"Le grand fou", emploiNowNow:"Fummette à temps plein",src:"/src/images/user.png"}, {name:"carte 10",username:"Moundir", name:"Koh Lanta", emploiNowNow:"fdp à temps plein",src:"/src/images/user.png"}];


class Dashboard extends Component {
  constructor(){
    super()

    this.state ={
        listUser : listUser,
        selectedMode: 'User'
    }
  }
  componentDidMount(){
    getAllCards((err, cards) => 
      this.setState({ listUser : cards })
    ); 
  }
  destroyCard(e){
    if(this.state.listUser.length < 2){
      this.setNewList();
    }
    this.setState({listUser : this.state.listUser.slice(1)})
    console.log(this.state.listUser);
  }



  setNewList(){
    console.log("oknewList")
    getAllCards((err, cards) => 
      this.setState({ listUser : cards })
    );
    this.render()
  }
  

  render(){
    var that = this;
    var listCard = this.state.listUser;
    var documentListUser = listCard.map(function(element, i){
          return(
            <div key= {i} className={"wrapperCard "+ "customInterest0"}>
                  <div className="cardHeader customHeader">
                      <img className="cardImage" src={element.picture}/>
                      <img className="languageCard"/>
                        <div className="cardNames">
                          <a>{element.username}</a>
                          <a>{element.name}</a>
                          
                        </div>
                        <div className="cardEmail">
                          <a>{element.email}</a>
                        </div>
                        <div className="cardEmploy">
                          <a>{element.emploiNow}</a>
                        </div>
                  </div>
                  <div className="cardContent">
                    <button onClick={that.destroyCard.bind(that)}> Next
                      </button>
                  </div>
            </div>
          );
    });

    const listJobStats = {startWin: 22, exchange: 30, meeting: 12};
    
    return (
      
      <div className="gridViewWrapper">
        <a className="titleStartStats"> Vos stats StartJob</a>
        <div className="containerCard">
          <div className="wrapperGridCard">
            <div className="containerWrapper"> 
              <div className="cardGridHandler" id="cardGridHandler">
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
