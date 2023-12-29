// import React from "react";
// import { useSearch } from "../../context/search";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const SearchInput = () => {
//   const [values, setValues] = useSearch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/search/${values.keyword}`
//       );
//       setValues({ ...values, results: data });
//       navigate("/search");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <form
//         className="d-flex search-form"
//         role="search"
//         onSubmit={handleSubmit}
//       >
//         <input
//           className="form-control me-2"
//           type="search"
//           placeholder="Search"
//           aria-label="Search"
//           value={values.keyword}
//           onChange={(e) => setValues({ ...values, keyword: e.target.value })}
//         />
//         <button className="btn btn-outline-success" type="submit">
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchInput;

// Import the FontAwesome library if not already done
// import "@fortawesome/fontawesome-free/css/all.min.css";

import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const handleSpeechRecognition = async () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValues({ ...values, keyword: transcript });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        {/* <button className="btn btn-outline-success" type="submit">
          Search
        </button> */}
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleSpeechRecognition}
        >
          {isListening ? "Listening..." : <i className="fas fa-microphone"></i>}
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
