import React from "react";

import Button, { ButtonStyle } from "./Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <>
      <input
        placeholder={props.initialText}
        className="input"
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
      <Button icon={faSearch} theme={ButtonStyle.DARK} compact>
        Search
      </Button>
      <style jsx>
        {`
          .input {
            border-radius: 15px;
            color: white;
            background-color: black;
            margin-right: 15px;
            padding: 5px;
            height: 30px;
            border-color: white;
            border-style: solid;
            width: 80%;
            max-width: 300px;
          }
          .input:focus {
            outline: none;
          }
        `}
      </style>
    </>
  );
};

export default SearchBar;

export interface SearchBarProps {
  onChange: (text: string) => void;
  initialText: string;
}
