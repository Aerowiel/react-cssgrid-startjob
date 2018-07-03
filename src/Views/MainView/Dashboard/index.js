import React, { Component } from 'react';
import { getAllCards, getAllOffer} from '../../../socketClient/dashboard';
import localStorage from 'localStorage';
import Card from '../../../Component/Card';
var listUser=[];

var listOffer=[];
class Dashboard extends Component {
  constructor(){
    super()

    this.state ={
        listUser : listUser,
        selectedMode: true,
        listOffer : listOffer
    }
  }
  componentDidMount(){
    getAllCards((err, cards) => 
      this.setState({ listUser : cards })
    ); 

    getAllOffer((err, offers) =>
      this.setState({ listOffer : offers})
    )
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

  changeSelectedMode(){
    this.setState({
      selectedMode : !this.state.selectedMode
    })
  }

  render(){
    var that = this;
    var listCard = this.state.listUser;
    var documentListUser = listCard.map(function(element, i){
          return(
            <div key= {i} className="wrapperCard">
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

    var documentListOffer = this.state.listOffer.map(function(element, index){
      return(
        <div key= {index} className="wrapperCard">
            <div className="cardHeader customHeader">
            </div>
        </div>
      );
    });

    const listJobStats = {startWin: 22, exchange: 30, meeting: 12};
    
    return (
      
      <div className="gridViewWrapper">
        <a className="titleStartStats"> Vos stats StartJob</a>
        <button onClick={this.changeSelectedMode.bind(this)}></button>
        <div className="containerCard">
          <div className="wrapperGridCard">
            <div className="containerWrapper"> 
              <div className="cardGridHandler" id="cardGridHandler">
                 {documentListOffer}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
