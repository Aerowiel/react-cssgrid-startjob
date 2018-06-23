import React, { Component } from 'react';

class CreateOffer extends Component {
  render() {
    return (
      <div className="wrapperCreateOffer">
       <label className="labelEnterpriseOffer">
                 <a className="enterpriseOffer disabled"> Sogeti</a>
        </label>
        <div className="containerCreateOffer">
          <form>
             
            <select className="secteurOffer">
                <option>Dev Web</option>
                <option>Dev Mobile</option>
                <option>Gaming</option>
                <option>Arts</option>
            </select> 
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
            
            <table className="requiredSkillsOffer">
              <tbody>
                <tr>
                  <td><input type="checkbox"/>Firstname</td>
                  <td><input type="checkbox"/>Lastname</td> 
                  <td><input type="checkbox"/>Age</td>
                </tr>
                </tbody>
            </table>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateOffer;
