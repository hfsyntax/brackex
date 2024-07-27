export default function Tournament() {
  return (
    <>
      <h1 className="ml-5 mt-5 inline-block select-none text-4xl text-white">
        Create Tournament
      </h1>
      <form className="ml-auto mr-auto mt-3 w-[70%] select-none">
        <h2 className="mt-5 bg-gray-800 pb-3 text-4xl text-white">
          Basic Info
        </h2>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">
            Host (dropdown for user or any communities they are in)
          </label>
          <input
            type="text"
            placeholder="host"
            className="ml-3 box-border inline-block w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
          />
        </div>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">Name</label>
          <input
            type="text"
            placeholder="name"
            className="ml-3 box-border inline-block w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
          />
        </div>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">URL</label>
          <input
            type="text"
            placeholder="url"
            className="ml-3 box-border inline-block w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
          />
        </div>
        <div className="flex items-center bg-gray-900 pb-3 pt-3">
          <label className="ml-3 w-[500px] text-white">Description</label>
          <textarea
            className="ml-3 box-border inline-block h-[100px] w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
          ></textarea>
        </div>
        <h2 className="bg-gray-800 pb-3 pt-3 text-4xl text-white">Game Info</h2>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">
            Game (add search to populate all games from db)
          </label>
          <input
            type="search"
            placeholder="game"
            className="ml-3 box-border inline-block w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
          />
        </div>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">Tournament type</label>
          <select className="ml-3 inline-block w-[55%] bg-gray-700 pl-2 text-white outline-none">
            <option>Single Elimination</option>
            <option>Double Elimination</option>
          </select>
        </div>
        <div className="flex items-center bg-gray-900 pb-3 pt-3">
          <label className="ml-3 w-[500px] text-white">Start time</label>
          <input
            type="date"
            placeholder="time"
            className="ml-3 box-border inline-block w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
          />
        </div>
        <button className="mt-5 h-[50px] w-full rounded-[20px] bg-blue-600 text-white hover:bg-blue-400">
          Submit
        </button>
      </form>
    </>
  )
}
