import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokesData, setJokesData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getJokes = async () => {
    let apiUrl = "/api/jokes";
    if (selectedCategory) {
      apiUrl += `?category=${selectedCategory}`;
    }
    try {
      const response = await axios.get(apiUrl);
      setJokesData(response.data.joke);
      setCategories(response.data.categories);
      // console.log(categories);
    } catch (error) {
      console.error("Error fetching jokes:", error);
    }
  };

  useEffect(() => {
    // console.log("App component rendered");
    getJokes();
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(selectedCategory)
    getJokes();
  };

  return (
    <>
      {/* <!-- Main container --> */}
      <div className="bg-black">
        {/* <!-- Flex container for centering items --> */}
        <div className="flex h-screen flex-col items-center justify-center">
          {/* <!-- Container for Joke card --> */}
          <div className="max-h-auto mx-auto max-w-xl bg-white p-5 rounded-lg">
            {/* <!-- Joke Detail --> */}
            <div className="mb-8 space-y-3">
              <p className="text-xl text-black font-semibold">
                Chuck Norris Joke is
              </p>
              <p className="text-black">{jokesData.value}</p>
            </div>
            {/* <!-- Get Joke -->// */}
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-10 space-y-3">
                <div className="space-y-1">
                  <div className="space-y-2">
                    {/* <!-- DropDown Field --> */}
                    <label htmlFor="category" className="text-black">
                      Category:
                    </label>
                    <select
                      name="category"
                      id="category"
                      className="text-black border-slate-400"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((val, key) => {
                        return (
                          <option key={key} value={val}>
                            {" "}
                            {val}{" "}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <button
                  className="ring-offset-black focus-visible:ring-black flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  type="submit"
                >
                  Get Joke
                </button>
              </div>
            </form>
            <div className="text-center">
              <h3>Category of the joke: <span className="font-bold text-xl">{jokesData.categories}</span></h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
