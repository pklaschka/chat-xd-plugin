import Message from "../../../model/document/message";
import DocumentModel from "../../../model/document/document-model";
import iconCrosshair from "../../../assets/icons/Smock_Crosshairs_18_N.svg";
import React from "react";
import './message-bubble.scss';
import {Avatar} from "./avatar";

interface MessageBubbleParams {
    message: Message;
    model: DocumentModel;
}

export default function MessageBubble(props: MessageBubbleParams) {
    const {content, date, authorUUID} = props.message;

    return <li className="MessageBubble">
        <Avatar author={props.model.authors[authorUUID]} />
        <h4>{props.model.authors[authorUUID].name} -- {date}:</h4>
        <p>{content}</p>
        <p>
            <a onClick={() => props.message.scrollTo()}>
                <img src={iconCrosshair} alt={"Viewport location"}/>
            </a>
        </p>
    </li>;
}
