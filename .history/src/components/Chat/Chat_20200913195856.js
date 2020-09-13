import React from "react";
import "./Chat.scss";
import chatimg from "../../images/image4.jpg";

export default function Chat() {
  return (
    <div className="container ">
      <div className="row no-gutters ">
        <div class="col ">
          <div class="settings-tray">
            <div class="friend-drawer no-gutters friend-drawer--grey">
              <img class="profile-image" src={chatimg} alt="" />
              <div class="text">
                <h6>Robo Cop</h6>
                <p class="text-muted">
                  Layin' down the law since like before Christ...
                </p>
              </div>
              <span class="settings-tray--right">
                <i class="material-icons">cached</i>
                <i class="material-icons">message</i>
                <i class="material-icons">menu</i>
              </span>
            </div>
          </div>
          <div class="chat-panel">
            <div class="row no-gutters">
              <div class="col-md-3">
                <div class="chat-bubble chat-bubble--left">Hello dude!</div>
              </div>
            </div>
            <div class="row no-gutters">
              <div class="col-md-3 offset-md-9">
                <div class="chat-bubble chat-bubble--right">Hello dude!</div>
              </div>
            </div>
            <div class="row no-gutters">
              <div class="col-md-3 offset-md-9">
                <div class="chat-bubble chat-bubble--right">Hello dude!</div>
              </div>
            </div>
            <div class="row no-gutters">
              <div class="col-md-3">
                <div class="chat-bubble chat-bubble--left">Hello dude!</div>
              </div>
            </div>
            <div class="row no-gutters">
              <div class="col-md-3 offset-md-9">
                <div class="chat-bubble chat-bubble--right">Hello dude!</div>
              </div>
            </div>
            <div class="row no-gutters">
              <div class="col-md-3">
                <div class="chat-bubble chat-bubble--left">Hello dude!</div>
              </div>
            </div>
            <div class="row ">
              <div class="col-12">
                <div class="chat-box-tray">
                  <i class="material-icons">sentiment_very_satisfied</i>
                  <input type="text" placeholder="Type your message here..." />
                  <i class="material-icons">mic</i>
                  <i class="material-icons">send</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
