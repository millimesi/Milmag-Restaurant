import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../stylesheets/notFoundPage.css';

const NotFoundPage = () => {
  return (
    <section className='d-flex flex-column justify-content-center align-items-center text-center vh-100'>
      <FaExclamationTriangle className='iconColor mb-4' />
      <h1 className='textColor mb-4'>404 Not Found</h1>
      <p className='fs-4 mb-5'>This page does not exist</p>
      <Link
        to='/'
        className='btn btn-primary btn-lg'
      >
        Go Back
      </Link>
    </section>
  );
};
export default NotFoundPage;
