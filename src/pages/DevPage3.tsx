import { Amplify } from 'aws-amplify'
import { post } from 'aws-amplify/api'
import { useEffect } from 'react'

export default function DevPage3() {

    useEffect(() => {


        

        async function callFunction(){
            const callAPI  = post({
                apiName: 'mobiledleAPI',
                path: '/items',
        
            })
            const {body} = await callAPI.response
            const response = await body.json();
            console.log('POST call succeeded');
            console.log(response);

        }

        callFunction()
        

    }) 

    return (

        <div>dev 3</div>
        
    
    
    )

}