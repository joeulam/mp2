import ArtApiData from "./components/artComponent.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Art } from "./interface/artData.tsx";
const ParentDiv = styled.div`
  width: 80vw;
  margin-left: 10vw;
  border: 5px darkgoldenrod solid;
  text-align: center;
`;

const ButtonDiv = styled.button`
  width: 50vw;
`;

export default function App() {
  const [artData, setArtData] = useState<Art[]>([]);
  async function getArtData(){ 
    function randomNumber(){
      return Math.floor(Math.random() * 10000) + 1;
    };
    const fetchedData: Art[] = [];
    for (let i = 0; i < 10; i++) {
      let response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomNumber()}` // jquery
      );
      let data: Art = await response.json();
      if (response.status == 404) {
        while (response.status == 404) {
          response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomNumber()}`
          );
          data = await response.json();
        }
      }
      fetchedData.push(data);
    }
    setArtData(fetchedData);
  };
  useEffect(() => {
    getArtData();
  }, []);

  return (
    <>
      <ParentDiv>
        <h1>Random Art for the day</h1>
        <ArtApiData data={artData} />
        <ButtonDiv onClick={() => getArtData()}>I WANT MORE</ButtonDiv> {/* I know its not normal to do () => function but this prevent rerenders and ensure that it only runs when clicked*/}
      </ParentDiv>
    </>
  );
}
