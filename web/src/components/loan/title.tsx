import { useState } from "react";
import { Input } from "../ui/input";
import "./title.css";

const Title = ({
  searchFilter,
  setSearchFilter,
}: {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}) => {
  const [searchEnabled, setSearchEnabled] = useState(false);

  const handleClearSearch = () => {
    setSearchFilter("");
    setSearchEnabled(false);
  };

  return (
    <div className="title-container">
      <div>
        <h1 className="title">Loans</h1>
      </div>
      {searchEnabled ? (
        <div className="search-container">
          <Input
            type="text"
            placeholder="Search..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="search-input"
          />
          <div className="clear-search" onClick={handleClearSearch}>
            <svg
              data-testid="clear-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div onClick={() => setSearchEnabled(true)} className="search-icon" data-testid="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Title;
