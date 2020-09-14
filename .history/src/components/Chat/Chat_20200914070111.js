import React, {useContext} from "react";
import "./Chat.scss";
import chatimg from "../../images/image4.jpg";
import { ChatContext } from '../Context';

export default function Chat() {
  
  let { showChat, setShowChat } = useContext(ChatContext);
    

    const closeChat = () => {
        setShowChat(false)
    }
  
    return (
      <div className="container chat-height">
        <div className="row no-gutters ">
          <div class="col ">
            <div class="settings-tray">
              <div class="friend-drawer no-gutters friend-drawer--grey">
                <img class="profile-image" src={chatimg} alt="" />
                <div class="text">
                  <h6 className="text-left">Robo Cop</h6>
                  <p class="text-muted">
                    Layin' down the law since like before Christ...
                  </p>
                </div>
                <span class="settings-tray--right">
                  {/* <i class="material-icons">cached</i> */}
                  {/* <i class="material-icons">message</i> */}

                  <i onClick={closeChat} class="material-icons">
                    cancel
                  </i>
                  <i onClick={closeChat} class="material-icons">
                    cancel
                  </i>
                </span>
              </div>
            </div>
            <div class="chat-panel">
              <div class="row no-gutters">
                <div class="col-md-3">
                  <div class="chat-bubble chat-bubble--left text-left">
                    Hello dude!
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-md-3 offset-md-9">
                  <div class="chat-bubble chat-bubble--right text-left">
                    Hello dude!
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-md-3 offset-md-9">
                  <div class="chat-bubble chat-bubble--right text-left">
                    Hello dude!
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-md-3">
                  <div class="chat-bubble chat-bubble--left text-left">
                    Hello dude!
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-md-3 offset-md-9">
                  <div class="chat-bubble chat-bubble--right text-left">
                    Hello dude!
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-md-3">
                  <div class="chat-bubble chat-bubble--left text-left">
                    Hello dude!
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-md-3 offset-md-9">
                  <div class="chat-bubble chat-bubble--right text-left">
                    Hello dude!
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-md-3">
                  <div class="chat-bubble chat-bubble--left text-left">
                    Hello dude!
                  </div>
                </div>
              </div>

              <div class="row no-gutters">
                <div class="col-md-3 offset-md-9">
                  <div class="chat-bubble chat-bubble--right text-left">
                    Hello dude!
                  </div>
                </div>
              </div>
              <form class="row  ">
                <div class="col-12 footer-chat">
                  <div class="chat-box-tray">
                    <i class="material-icons">sentiment_very_satisfied</i>
                    <input
                      type="text"
                      placeholder="Type your message here..."
                    />
                    <i class="material-icons">mic</i>
                    <i class="material-icons">send</i>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}
