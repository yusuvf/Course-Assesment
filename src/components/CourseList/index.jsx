/*
Veriler iki şekilde elde edilmiştir. 

  1.) Fetch API kullanılarak url'e request atılarak dinamik bir şekilde veriler sayfaya getiriliyor. 
  Sayfada default olarak fetch API kullanulmıştır eğer URL'de sorun varsa 2. madde denenebilir.

  2.) Lokal'den JSON verilerini okuyarak. Bazı durumlarda URL request sayısı sınırına ulaşıldı hatawsı veriyor.
  Bu durumu cover etmek için eğer hata alıırsa lokalden veri okunarak da sorun çözülmüştür. 
  Aşağıdaki useEffectleri aç kapa yaparak iki maddeyide test edebilirsiniz.

*/

import * as AllCourses from "../../data/allCourses.json";
import * as MyCourses from "../../data/myCourses.json";
import Card from "../Card";
import "./index.scss";

import { useState, useEffect } from "react";

const tabs = [
  {
    tabID: 0,
    title: "All Courses",
    url: "https://40060bec-d8e7-4ad2-96c2-63b9fdb4ef24.mock.pstmn.io/wp-json/ldlms/v2/sfwd-courses",
    dataset: AllCourses.default,
  },
  {
    tabID: 1,
    title: "My Courses",
    url: "https://40060bec-d8e7-4ad2-96c2-63b9fdb4ef24.mock.pstmn.io/wp-json/ldlms/v2/my_courses",
    dataset: MyCourses.default,
  },
];

const CourseList = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [dataset, setDataset] = useState([{}, {}, {}, {}, {}, {}]);

  /* Lokal'den veri okuma bölümü test edilmek isteniyorsa bu satırdan

  useEffect(() => {
    tabs.forEach((tab) => {
      if (tab.tabID === currentTab) {
        setDataset(tab.dataset);
      }
    });
  }, [currentTab]);
  
  Bu satıra kadar olan kısım açılmalı*/

  ///- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // Eğer fetch API hata alırsa Bu satırdan --

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await fetch(tabs[currentTab].url);
      let data = await result.json();
      if (!ignore) setDataset(data);
    }
    fetchData();

    return () => {
      ignore = true;
    };
  }, [currentTab]);

  /*Bu satıra kadar kod alanını kapatıp yukarudaki useEffect'i açıp deneyiniz. */

  return (
    <div className="Container">
      <div className="Tabs">
        <ul className="TabContainer">
          {tabs.map((value) => (
            <li
              onClick={() => setCurrentTab(value.tabID)}
              className="Tab"
              key={value.tabID}
            >
              <a>{value.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="ContentContainer">
        {dataset.map((course, index) => (
          <Card key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
