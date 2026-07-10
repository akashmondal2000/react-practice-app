import { useRouteError } from 'react-router';
import PageContent from "../components/PageContent";
import MainNavigation from '../components/MainNavigation';

const ErrorPage = () => {

const error = useRouteError();

let title = 'An error occurred!';
let message = 'Something went wrong!';

if(error.status === 500){
  message = JSON.parse(error.data).message;

  console.log("500 error",JSON.parse(error.data).message )
}

if(error.status === 404){
  title = 'Not Found!'
  message = 'Could not find resourse or page!'
}
 
  return (
    <>
      <MainNavigation/>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}

export default ErrorPage;