import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../Utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
      axiosWithAuth()
          .get('/colors')
          .then(res => {
              console.log('colors res',res)
              setColorList(res.data)
          })
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
