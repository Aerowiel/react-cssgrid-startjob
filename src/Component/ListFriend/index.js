import React, {Component} from 'react';


import {getFriends} from './../../socketClient/friend'
var fakeList = ["","",""]

class ListFriend extends Component{
    constructor(){
        super();

        this.state={
            listFriend : fakeList
        }

    }
    componentDidMount(){
        getFriends((err, response)=>{
            console.log(response, err);
            this.setState({listFriend : response})
        });
    }
    render(){
        var list = this.state.listFriend;
        const returnFakeList = list.map(function(element, index){
            console.log(element);
            return(
                    <option key={index}>{element}</option>
            );
        });
        return(
            <div className="wrapperListFriend">
                 <select>
                     {returnFakeList}
                 </select>
            </div>
        );
    }
}

export default ListFriend;