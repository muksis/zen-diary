import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getEntry, closeEntry } from '../features/entries/entrySlice';
import BackButton from '../components/BackButton';

function Entry() {
  const { entry, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.entries
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { entryId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getEntry(entryId));
    // eslint-disable-next-line
  }, [isError, message, entryId]);

  // Delete entry
  const onEntryClose = () => {
    dispatch(closeEntry(entryId));
    toast.success('Entry deleted');
    navigate('/entries');
  };

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className='entry-page'>
      <header className='entry-header'>
        <BackButton url='/entries' />
        <h3>
          Date of the entry: {new Date(entry.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Mood: {entry.mood}</h3>
        <h3>Title: {entry.title}</h3>
        <hr />
        <div className='entry-desc'>
          <h3>Text of the Entry</h3>
          <p>{entry.text}</p>
        </div>
      </header>

      {entry.status !== 'closed' && (
        <button onClick={onEntryClose} className='btn btn-block btn-danger'>
          Delete Entry
        </button>
      )}
    </div>
  );
}

export default Entry;
