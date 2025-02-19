import ArtComponent from "./components/artComponent.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Art } from "./interface/artData.tsx";
const ParentDiv = styled.div`
  width: 80vw;
  border: 5px solid;
  border-radius: 15px;
  text-align: center;
  margin: 0 auto;
  padding: 2%;
  min-height: 100vh;
`;

const ButtonDiv = styled.button`
  margin-top: 5vh;
  width: 50vw;
  color: black;
  background-color: #e6d3a1;
  border-radius: 5px;
  font-family: Papyrus, system-ui, Avenir, Helvetica, Arial, sans-serif;
`;

export default function App() {
  const [artData, setArtData] = useState<Art[]>([]);
  
  async function getArtData() {
    setArtData([])
    function randomNumber() {
      return Math.floor(Math.random() * 10000) + 1;
    }

    const fetchedData: Art[] = [];
    for (let i = 0; i < 10; i++) {
      try {
        let response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomNumber()}` // jquery
        );
        let data: Art = await response.json();
        if (response.status != 200) { // Check response code if response is not okay keep making numbers till we have 10 valid ones
          while (response.status != 200) {
            response = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomNumber()}`
            );
            data = await response.json();
          }
        }
        fetchedData.push(data);
      } catch (e) {
        console.log(e + "Darn");
      }
    }
    setArtData(fetchedData);
  }
  useEffect(() => {
    getArtData();
  }, []);

  return (
    <>
      <ParentDiv>
        <h1>Random Art for the day</h1>
        <ArtComponent data={artData} />
        <ButtonDiv onClick={() => getArtData()}>SIRE I WANT MORE</ButtonDiv>
        {/* () => function prevent rerenders and ensure that it only runs when clicked*/}
      </ParentDiv>
    </>
  );
}
