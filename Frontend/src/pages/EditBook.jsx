import React, {useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:6969/books/${id}`)
    .then((res)=>{
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear);
      setTitle(res.data.title);
      setLoading(false);
    }).catch((err)=>{
      setLoading(false);
      alert("An error happened. Please Check console");
      console.log(err);
    });
  },[])
  const handleSaveBook = ()=>{
      const data = {
        title,
        author,
        publishYear,
      };
      setLoading(true);
      axios
        .put(`http://localhost:6969/books/edit/${id}`,data)
        .then(()=>{
          setLoading(false);
          navigate('/home');
        })
        .catch((err)=>{
          setLoading(false);
          alert("An error happened. Please Check console");
          console.log(err);
        });
  };

  return (
    <>
      <BackButton/>
      <h1 className='text-3xl my-4 '>தொகு</h1>
    <div className='p-4 flex items-center justify-center h-screen'>
      { loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[500px] p-4' >
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>குறள் : </label>
          <input type='text'
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>குறள் எண்:</label>
          <input type='text'
          value={author}
          onChange={(e)=> setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>அத்தியாயம் எண் :</label>
          <input type='number'
          value={publishYear}
          onChange={(e)=> setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8 'onClick={handleSaveBook}>
        சேமிக்க 
        </button>
      </div>
    </div>
    </>
  )
}

export default EditBook