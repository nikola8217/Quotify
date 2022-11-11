import { useEffect, useState } from 'react'
import useHttp from '../../hooks/use-http'
import { addComment } from '../../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css'

const NewCommentForm = (props) => {
  // const commentTextRef = useRef()
  const [com, setCom] = useState('')
  const [isComValid, setIsComValid] = useState(true)

  const {sendRequest, status, error} = useHttp(addComment)

  const {onAddedComment} = props

  useEffect(() => {
    if(status === 'completed' && !error) {
      onAddedComment()
    }
  }, [status, error, onAddedComment])

  const comHandler = (event) => {
    setCom(event.target.value)
  }

  const submitFormHandler = (event) => {
    event.preventDefault()

    if(com === '') {
      setIsComValid(false)
      return
    }

    const enteredText = com

    sendRequest({commentData: {text: enteredText}, quoteId: props.quoteId})

    setCom('')
    setIsComValid(true)
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'panding' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' value={com} onChange={comHandler}></textarea>
        {!isComValid && <p className='centere'>You need to insert some text!</p>}
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
