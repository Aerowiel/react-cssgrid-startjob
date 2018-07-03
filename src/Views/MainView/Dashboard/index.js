import React, { Component } from 'react';
import { getAllCards} from '../../../socketClient/dashboard';
import localStorage from 'localStorage';
import Card from '../../../Component/Card';
var listUser=[];


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
