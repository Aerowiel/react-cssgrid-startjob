import React, {Component} from 'react';
import { ChatFeed, Message } from 'react-chat-ui'
 
import {getAllMessages, sendMessageByChat} from './../../socketClient/chat'

class ConvBox extends Component{
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    componentDidMount(){
        getAllMessages(this.props.id,(err, messages)=>{
            console.log(messages);
            if(messages[0].name != this.props.id){
                this.setState({
                    messages : [
                        ...this.state.messages,
                        new Message({ id: 0, message: messages[2].message }), // Blue bubble
                    ]
                })
            }
            else{
                this.setState({
                    messages : [
                        ...this.state.messages,
                        new Message({ id: 1, message: messages[2].message }), // Grey bubble
                    ]
                })
            }
        })
    }
    componentWillMount() {
        socketClient.on('receivedMessage', (obj) => {
          console.log(obj.senderEmail + "sent : " + obj.message);
          this.setState({messages : [
              ...this.state.messages,
              new Message({ id: obj.senderEmail, message: obj.message }), // Blue bubble
          ]});
        });

        
        // this.props.id
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.id === 0) {
            this.setState({
                messages: [
                  new Message({
                    id: 1333,
                    message: "convo 1",
                  }), // Gray bubble
                  new Message({ id: 0, message: "I'm convo 1" }), // Blue bubble
                ]
            });
        }
        if(nextProps.id === 1) {
            this.setState({
                messages: [
                  new Message({
                    id: 1333,
                    message: "convo 2",
                  }), // Gray bubble
                  new Message({ id: 0, message: "I'm convo 2" }), // Blue bubble
                ]
            });
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendMessage(e) {
        e.preventDefault();

        socketClient.emit('onMessage', { message : e.target.elements[0].value, receiver : this.props.id } )
        console.log(e.target.elements[0].value)
        this.setState({
            messages : [
                ...this.state.messages,
                new Message({ id: 0, message: e.target.elements[0].value }), // Blue bubble
            ]
        })
        sendMessageByChat(e.target.elements[0].value,this.props.id,(err, response)=>{
            console.log(response);
        })

    }

    
    render(){
        return(
            <div
                className="convoBox"
                style={this.props.style}
                id={this.props.id}
            >
                <span onClick={this.props.closeConvoBox.bind(this)}>X</span>
                <div style={{marginLeft:'25%'}} >{this.props.id}</div>
                <ChatFeed
                    messages={this.state.messages} // Boolean: list of message objects
                    isTyping={this.state.is_typing} // Boolean: is the recipient typing
                    hasInputField={false} // Boolean: use our input, or use your own
                    showSenderName // show the name of the user who sent the message
                    bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                    // JSON: Custom bubble styles
                    bubbleStyles={
                        {
                        text: {
                            fontSize: 10
                        },
                        chatbubble: {
                            borderRadius: 10,
                            padding: 10
                        }
                        }
                    }
                />
                <form onSubmit={this.sendMessage.bind(this)}>
                    <input type="text" name="chat_input" onChange={this.handleChange.bind(this)}/>
                    <button>
                        send
                    </button>
                </form>
            </div>
        );
    }
}
export default ConvBox;
