import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WiDaySunny } from 'react-icons/wi';
import { createEntry, reset } from '../features/entries/entrySlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewEntry() {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.entries
  );

  const [mood, setMood] = useState('Good');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/entries');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createEntry({ mood, title, text }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>New Entry</h1>
        <p>How are you today?</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='mood'>Mood</label>
            <select
              name='mood'
              id='mood'
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value='Good' icon={<WiDaySunny />}>
                Good
              </option>
              <option value='Neutral'>Neutral</option>
              <option value='NotSoGood'>Not so good</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Enter a title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='text'>Text of the entry</label>
            <textarea
              name='text'
              id='text'
              className='form-control'
              placeholder='Share your thoughts'
              rows='15'
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewEntry;
