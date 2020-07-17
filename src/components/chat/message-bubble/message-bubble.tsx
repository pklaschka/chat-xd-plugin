import Message from "../../../model/document/message";
import DocumentModel from "../../../model/document/document-model";
import iconCrosshair from "../../../assets/icons/Smock_Crosshairs_18_N.svg";
import React from "react";
import './message-bubble.scss';
import {Avatar} from "./avatar";

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/de';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import {IntlProvider, FormattedRelativeTime} from "react-intl";

interface MessageBubbleParams {
    message: Message;
    model: DocumentModel;
}

export default function MessageBubble(props: MessageBubbleParams) {
    const {content, date, authorUUID} = props.message;


    return <li className="MessageBubble">
        <IntlProvider locale={'en'}>
            <Avatar author={props.model.authors[authorUUID]}/>
            <h4>
                {props.model.authors[authorUUID].name}
                &nbsp;&ndash;&nbsp;
                <FormattedRelativeTime value={(date - Date.now())/1000}
                                        unit={'second'} numeric="auto" updateIntervalInSeconds={10} />
            </h4>
            <p>{content}</p>
            <p>
                <a onClick={() => props.message.scrollTo()}>
                    <img src={iconCrosshair} alt={"Viewport location"}/>
                </a>
            </p>
        </IntlProvider>
    </li>;
}
