import React, { Component } from 'react';

var listAllCompt = [{name:"web", data:[{name:"C#"}, {name:"C++"},{name:"React"}]},{name:"gaming", data: [{name:"Unity"},{name:"Unreal Engine"}]},{name:"mobile", data: [{name:"Swift"}, {name:"Kotlin"},{name:"Java"}, {name:"Xamarin"},{name:"cordova"}]}];


class CreateOffer extends React.Component {

  constructor(){
    super();
    this.state ={
      selectedValue :'mobile'
    }
  };
  handleChangeOffer(e){
    this.setState({
      selectedValue : e.target.value
    })
  };
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
            <label> Nom de l'offre:
                <input className="nameOffer" placeholder=""/>
                <a className="errorMessage errorName"> erreur detectée</a>
            </label>

            <label> Description : 
              <input className="descriptionOffer"/>
              <a className="errorMessage descriptionError">erreur detectée</a>
            </label>
            
            <label> Date : 
              <input type="date" className="dateOffer"></input>
              <a className="errorMessage dateError">erreur detectée</a>
            </label>
            
            <label> Compétences recherchées
              <table className="requiredSkillsOffer">
                <tbody>
                  <tr>
                    {listCompt}
                  </tr>
                  </tbody>
              </table>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateOffer;
