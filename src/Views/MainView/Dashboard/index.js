import React, { Component } from 'react';
import { getAllCards, getAllOffer} from '../../../socketClient/dashboard';
import localStorage from 'localStorage';
import Card from '../../../Component/Card';
var listUser=[];

var listOffer=[{owner:"ddd"}, {owner:"fff"}, {owner:"zzzz"}];
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
    var documentRenderer;
    if(this.state.selectedMode){
      documentRenderer = listCard.map(function(element, i){
        return(
          <div key= {i} className="wrapperCard">
                <div className="cardHeader">
                    <button className="languageCard"><img src="/src/images/worldwide.png"/></button>
                    <img className="cardFormationIcon" src="/src/images/books.png"/>
                    <div className="cardFormation">
                        <a>{element.formation}</a>
                     </div>
                    <img className="cardImage" src={element.picture}/>
                      <div className="cardNames">
                        <a>{element.username}</a>
                        <a>{element.name}</a>
                        
                      </div>
                      <div className="cardEmail">
                        <a>{element.email}</a>
                      </div>
                      
                    
                </div>
                <div className="cardContent">
                  <div className="listComp">
                    {
                      element.listCompetence.map(function(item, index){
                          return(
                            <div key={index}>
                              {item}
                            </div>
                          )
                      })
                    }
                  </div>
                  <div className="listLastEmploy"> Emplois
                    {
                      element.listLastEmploy.map(function(item, index){
                          return(
                            <div key={index}>
                              {item}
                            </div>
                          )
                      })
                    }
                  </div>
                  <div className="cardDescription">
                    {element.description}
                  </div>
                  <div className="listInterest"> Hobbies
                    {
                      element.listInterest.map(function(item, index){
                          return(
                            <div key={index}>
                              {item}
                            </div>
                          )
                      })
                    }
                  </div>
                  
                  <div className="cardRowButton">
                    <button className="buttonBottomCard"><img src="/src/images/paper-plane.png"/></button>
                    <button className="buttonBottomCard"><img src="/src/images/star.png"/></button>
                    <button className="buttonBottomCard" onClick={that.destroyCard.bind(that)}><img src="/src/images/share.png"/></button>
                  </div>
                 
                </div>
          </div>
        );
      });
    }
    else{
      documentRenderer = this.state.listOffer.map(function(element, index){
        return(
          <div key= {index} className="wrapperCard">
              <div className="cardHeader customHeader">
                <div className="offerEnterprise">{element.enterprise}</div>
                <div className="offerDate">{element.date}</div>
                <div className="offerName">Type De Contrat : {element.nameOffer}</div>
                <div className="offerContratDate"> 
                  12-01-1990 - 13-01-2500 
                </div>
              </div>
              <div className="cardContent">
                <div className="offerContent">{element.description}</div>
                <div className="offerCompSearched"> Compétence recherchée
                  {
                    element.compSearched.map(function(element, index){
                      return(
                        <li key={index}>{element}</li>
                      );
                    })
                  }
                </div>
                <div className="cardRowButton">
                  <button className="buttonBottomCard">Contact</button>
                  <button className="buttonBottomCard">Next</button>
                </div>
              </div>
          </div>
        );
      });  
    }
    

    
    const listJobStats = {startWin: 22, exchange: 30, meeting: 12};
    
    return (
      
      <div className="gridViewWrapper">
        <a className="titleStartStats"> Vos stats StartJob</a>
        <button className="buttonSwitch" onClick={this.changeSelectedMode.bind(this)}><img  src="/src/images/change.png"/></button>
        <div className="containerCard">
          <div className="wrapperGridCard">
            <div className="containerWrapper"> 
              <div className="cardGridHandler" id="cardGridHandler">
                 {documentRenderer}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
