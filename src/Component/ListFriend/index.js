import React, {Component} from 'react';

var fakeList = [{email:""},{email:""},{email:""}]

class ListFriend extends Component{
    constructor(){
        super();

        this.state={
            listFriend : fakeList
        }

    }
    render(){
        const returnFakeList = this.state.listFriend.map(function(element, index){
            return(
                    <option>{element.email}</option>
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

export default {ListFriend};