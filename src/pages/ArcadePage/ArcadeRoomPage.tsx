import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage } from '../../graphql/mutations';
import { onCreateChatroom, onCreateChatroomMessage, onUpdateChatroom } from '../../graphql/subscriptions';
import { Chatroom, ChatroomMessage } from '../../API';
import getTtlFromMinutes from '../../components/utils/getTtlFromMinutes';
import { listChatrooms, getChatroom } from '../../graphql/queries';
import { useNavigate, useParams } from 'react-router-dom';

export default function ArcadeRoomPage() {

    const navigate = useNavigate()
    let params = useParams()

    useEffect(() => {

        if(!params.code || params.code.length !== 4 || !/^[A-Z]+$/gm.test(params.code)){
            navigate("/error/1")
        }

        if(params.code.toString().toUpperCase() != params.code.toString()){
            navigate("/arcade/"+params.code.toUpperCase() )
        }


    })



    return(
        <div>
            {params.code}
        </div>
    )

}


