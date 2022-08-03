import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>Welcome! </h1>
        <p>What would you like to do?</p>
      </section>

      <Link to='/new-entry' className='btn btn-reverse btn-block'>
        Add a New Entry
      </Link>
      <Link to='/entries' className='btn btn-block'>
        View My Entries
      </Link>
    </>
  );
}

export default Home;
