import React, {Component} from 'react';
import { ChatFeed, Message } from 'react-chat-ui'


class ConvBox extends Component{
    constructor(props) {
        super(props)
        this.state = {
            messages: [
              new Message({
                id: 1,
                message: "I'm the recipient! (The person you're talking to)",
              }), // Gray bubble
              new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
            ]
          };
    }

    sendMessage() {
        // to wire
    }

    render(){
        return(
            <div 
                className="convoBox"
                style={this.props.style}
            >
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
                    <input type="text"/>
                    <button>
                        send
                    </button>
                </form>
            </div>
        );
    }
}
export default ConvBox;