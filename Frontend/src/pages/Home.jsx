import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    try {
      axios.get("http://localhost:6969/books/tasks")
        .then(res => {
        
          setBooks(res.data);
          console.log(Books)
          setLoading(false);
        })
        .catch(error => {
          console.log("Error fetching books:", error);
          setLoading(false);
        });
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  }, []);
  
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        > 
          அனைத்து குறள்
         </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          அட்டைகள்
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8 pl-4">விதி பட்டியல்</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
