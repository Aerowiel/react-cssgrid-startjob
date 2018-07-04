import React, { Component } from 'react';

import { addOffer} from './../../../socketClient/offer';

var listAllCompt = [{name:"web", data:[{name:"C#"}, {name:"C++"},{name:"React"}]},{name:"gaming", data: [{name:"Unity"},{name:"Unreal Engine"}]},{name:"mobile", data: [{name:"Swift"}, {name:"Kotlin"},{name:"Java"}, {name:"Xamarin"},{name:"cordova"}]}];


class CreateOffer extends React.Component {

  constructor(){
    super();
    this.state ={
      selectedValue :'mobile',
      nameOffer:'',
      descriptionOffer:'',
      enterpriseOffer:'',
      compSearched:'',
      offer:null
    }
  };

  componentDidMount(){
    console.log(this.state.offer);
  }
  handleChangeOffer(e){
    this.setState({
      selectedValue : e.target.value
    })
  };

  saveOffer(){
    var offer = {nameOffer : this.state.nameOffer, description : this.state.descriptionOffer,enterprise : this.state.enterpriseOffer, compSearched : ["C", "Angular", "C#"]};
    addOffer(offer,(err, response)=>{
      console.log(response)
    })
    this.setOffer(offer)
  }
  setOffer(offer){
    this.setState({
      offer : offer
    });
    console.log(offer);
  }

  setNameOffer(e){
    this.setState({
      nameOffer : e.target.value
    })
  }
  setDescriptionOffer(e){
    this.setState({
      descriptionOffer : e.target.value
    })
  }
  setEnterpriseName(e){
    this.setState({
      enterpriseOffer : e.target.value
    })
  }
  setCompSearched(e){
    this.setState({
      compSearched : e.target.value
    })
  }

  render() {



    let res = this.state.selectedValue;
    console.log(res);

    var arrayListCompt = [];

    var returnComp = listAllCompt.map(function(element, i ){
      arrayListCompt = [];
      if(element.name == res){
        element.data.map(function(item, i){
          arrayListCompt.push(item);
          console.log(arrayListCompt);
        });
      }

    });

    var listCompt = arrayListCompt.map(function(element, i){
      console.log("ok");
      return(
        <td key={i}><input type="checkbox"/>{element.name}</td>
      );
    });
    

    return (
      <div className="wrapperCreateOffer">
       <label className="labelEnterpriseOffer">
                 <a className="enterpriseOffer disabled"> Sogeti</a>
        </label>
        <div className="containerCreateOffer">
          <form>
             
            <label> Catégorie de l'offre
              <select className="secteurOffer" defaultValue="mobile" onChange={this.handleChangeOffer.bind(this)}>
                  <option value="web">Dev Web</option>
                  <option value="mobile">Dev Mobile</option>
                  <option value="gaming">Gaming</option>
                  <option value="arts">Arts</option>
              </select>
            </label> 
            <label>Votre Entreprise:
                <input className="enterpriseOffer" placeholder="" onChange={this.setEnterpriseName.bind(this)}/>
                <a className="errorMessage errorName"> erreur detectée</a>
            </label>
            <label> Nom de l'offre:
                <input className="nameOffer" placeholder="" onChange={this.setNameOffer.bind(this)}/>
                <a className="errorMessage errorName"> erreur detectée</a>
            </label>

            <label> Description : 
              <input className="descriptionOffer" onChange={this.setDescriptionOffer.bind(this)}/>
              <a className="errorMessage descriptionError">erreur detectée</a>
            </label>
            
            <label> Date : 
              <input type="date" className="dateOffer"></input>
              <a className="errorMessage dateError">erreur detectée</a>
            </label>
            
            <label> Compétences recherchées
              <table className="requiredSkillsOffer" onChange={this.setCompSearched.bind(this)}>
                <tbody>
                  <tr>
                    {listCompt}
                  </tr>
                  </tbody>
              </table>
            </label>
            <input type="submit" value="Submit" onClick={this.saveOffer.bind(this)} />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateOffer;
