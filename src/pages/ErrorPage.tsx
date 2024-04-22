import { Link, useParams } from 'react-router-dom';

export default function ErrorPage() {

    let params = useParams()

    const errorMessages = {

        '1': 'Invalid Room Code', 
        '2': 'Room Not Found', 

    }

    return(
        <div>
            <div>
                ERROR! {errorMessages[params.code]} 

            </div>

            <Link to={'/'}>

                <button>Back to Home</button>

            </Link>

        </div>
    )

}