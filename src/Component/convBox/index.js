import React, {Component} from 'react';
import { ChatFeed, Message } from 'react-chat-ui'


class ConvBox extends Component{
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    componentWillMount() {

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

        socketClient.emit('messageTest', 'test message from ' + sessionStorage.getItem('socketidStartjob') + ' to ' + this.props.id )
        console.log(e.target.elements[0].value)
        this.setState({
            messages : [
                ...this.state.messages,
                new Message({ id: 0, message: e.target.elements[0].value }), // Blue bubble
            ]
        })
        e.target.elements[0].value = ""
    }

    render(){
        return(
            <div
                className="convoBox"
                style={this.props.style}
            >
                <span onClick={this.props.closeConvoBox.bind(this)}>x</span>
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
