import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const fetcher = useFetcher();
  /* So fethcher should basically be used whenever you want to trigger, an action, or also a loader 
  with help of the load function without actually navigating to the page to which the loader belongs
  or the page which the action belongs . 

  So 'useFetcher' is the tool you should use if you want to trigger a loader or action without actually 
  loading the page, the route to which this action or loader belongs. 
  */

  const { data, state } = fetcher;

  useEffect(()=>{
    if(state === 'idle' && data && data.message ){
      window.alert(data.message)
    }
  },[data,state]);


  return (
    <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
      <input
        type="email"
        name='email'
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;