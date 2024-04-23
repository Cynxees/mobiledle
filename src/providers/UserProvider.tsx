import { useQuery } from 'react-query';
import { generateClient } from "aws-amplify/api";
import { getUser } from '../graphql/queries';
import { createUser } from '../graphql/mutations';
import getTtlFromMinutes from '../utils/getTtlFromMinutes';
import dictionary from '../utils/usernameCombinations.json'

const fetchUser = async () => {
    const client = generateClient();

    const userId: string = localStorage.getItem('userId');
    
    

    console.log('id: ', userId)
    if(!userId){

        const randomColorIndex = Math.floor(Math.random()*1000)%dictionary.colors.length
        const randomAnimalIndex = Math.floor(Math.random()*1000)%dictionary.animals.length

        const randomUsername = dictionary.colors[randomColorIndex] + dictionary.animals[randomAnimalIndex] + (Math.floor(Math.random()*10000%9000)+1000)
        console.log('creating new user')
        
        return await client.graphql({
            query: createUser,
            variables: {
                input: {
                    username: randomUsername,
                    ttl: getTtlFromMinutes(60*24*30*12)
                }
            }
        }).then(data => {
            
            console.log('created new user')
            localStorage.setItem('userId', data.data.createUser.id.replace('"', ''))
            return data.data.createUser  
        })

        

        

    }


    console.log('fetching user data ', userId)

    const result = await client.graphql({ 
        query: getUser,
        variables: {
            id: userId
        }
    
    
    }).then(data=> {
        console.log('user fetched: ', data)

        if(data.data.getUser != null) return data.data.getUser
        
    }).catch(error => 
        console.error('getUser: ',error)
    );

    if(result != null) return result

    const randomColorIndex = Math.floor(Math.random()*1000)%dictionary.colors.length
    const randomAnimalIndex = Math.floor(Math.random()*1000)%dictionary.animals.length

    const randomUsername = dictionary.colors[randomColorIndex] + dictionary.animals[randomAnimalIndex] + (Math.floor(Math.random()*10000%9000)+1000)
    console.log('creating new user')
    
    return await client.graphql({
        query: createUser,
        variables: {
            input: {
                username: randomUsername,
                ttl: getTtlFromMinutes(60*24*30*12)
            }
        }
    }).then(data => {
        
        console.log('created new user')
        localStorage.setItem('userId', data.data.createUser.id.replace('"', ''))
        return data.data.createUser  
    })





}


export const useUser = () => {

    
    const temp = useQuery('user', fetchUser, {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    return temp


}