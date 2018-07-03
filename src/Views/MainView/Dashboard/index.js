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
                <div className="cardHeader customHeader">
                    <button className="languageCard"><img src="/src/images/worldwide.png"/></button>
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
                  <div className="listLastEmploy">
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
                  <div className="listInterest">
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
                  <div className="cardDescription">
                    {element.description}
                  </div>
                  <button>Message</button>
                  <button onClick={that.destroyCard.bind(that)}>Next</button>
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
                <div>{element.enterprise}</div>
                <div>{element.nameOffer}</div>
                <div>{element.date}</div>
                <div>{element.owner}</div>
              </div>
              <div className="cardContent">
                <div>{element.description}</div>
                <button>Contact</button>
                <button>Next</button>
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
