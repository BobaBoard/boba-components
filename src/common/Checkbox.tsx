import React from "react";

interface CheckboxProps {
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <label className="switch">
    <input type="checkbox" />
    <div className="switch-control"></div>
    
    <style jsx>{`
    input {
      position: absolute;
      opacity: 0;
      left: 0;
      top: 0;
      z-index: -1;  
    }

    .switch-control {
      height: 26px;
      width: 50px;
      border-radius: 13px;
      position: relative;
      background-color: rgba(255, 255, 255, .2);
      transition: background-color .1s ease-out;
    }
    
    .switch-control:hover {
      background-color: rgba(255, 255, 255, .3);
      cursor: pointer;
    }

    .switch-control::before {
      content: '';
      background: white;
      position: absolute;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,.3);
      top: 3px;
      left: 3px;
      transition: left .1s ease-out;
    }
    
    input:checked ~ .switch-control {
      background-color: red;
    }

    input:checked ~ .switch-control:hover {
      background-color: red; /*  but a shade darker */
    }
    
    input:checked ~ .switch-control::before {
      left: calc(100% - 20px - 3px);
    }
  `}</style>
  </label>;

}

export default Checkbox;