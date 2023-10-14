import { Spinner } from "@chakra-ui/react";

const Loader = () => {
    return (
        <div className='loader bg-opacity'>
            <p className='text-lg font-bold loading text-white'>Processing your request</p>
            <Spinner
                speed='0.7s'
                thickness='4px'
                emptyColor='blue.500'
                color='white'
                size='xl'
            />
        </div>
    )
}

export default Loader;