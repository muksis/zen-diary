import { Link } from 'react-router-dom';

function EntryItem({ entry }) {
  return (
    <div className='entry'>
      <div>{new Date(entry.createdAt).toLocaleString('en-US')}</div>
      <div>{entry.title}</div>
      <div>{entry.mood}</div>
      <Link to={`/entry/${entry._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  );
}

export default EntryItem;
