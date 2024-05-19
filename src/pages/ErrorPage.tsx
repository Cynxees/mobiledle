import { Link, useParams } from 'react-router-dom';

export default function ErrorPage() {

    let params = useParams()

    const errorMessages = {

        '1': ['Invalid Room Code', '/arcade'],  
        '2': ['Room Not Found', '/arcade'], 
        '3': ['Banned From Room' , '/arcade'],
        '4': ['Room is Full', '/arcade'],

    }

    return(
        <div className='flex flex-col gap-5'>
            <div>
                <div>
                    ERROR!
                    

                </div>
                <div>
                    {errorMessages[params.code][0]} 
                </div>
            </div>
            

            <Link to={errorMessages[params.code][1]}>

                <button className='text-orange-200'>Back to 
                    <span className='text-orange-400'> {errorMessages[params.code][1]}</span>
                </button>

            </Link>

        </div>
    )

}