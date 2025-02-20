import ArtComponent from "./components/dang.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Art } from "./interface/ArtData.tsx";
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
  padding: 2%
`;

const StyledInput = styled.input`
  margin-bottom: 5vh;
  padding: 5%;
  border-radius: 5px;
`
export default function App() {
  const [artData, setArtData] = useState<Art[]>([]);
  const [numArtWorks, setNumArtworks] = useState(10);

  async function getArtData(num: number) {
    setArtData([])
    function randomNumber() {
      return Math.floor(Math.random() * 10000) + 1;
    }

    const fetchedData: Art[] = [];
    for (let i = 0; i < num; i++) {
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
    getArtData(numArtWorks);
  }, [numArtWorks]);

  return (
    <>
      <ParentDiv>
        <h1>Random Art for the day</h1>
        <h3>Number of cards to show</h3>
        <StyledInput type="number" placeholder="Number of artworks" value={numArtWorks}
        onChange={(e) => setNumArtworks(Number(e.target.value))} />
        <ArtComponent data={artData} />
        <ButtonDiv onClick={() => getArtData(numArtWorks)}>SIRE I WANT MORE</ButtonDiv>
        {/* () => function prevent rerenders and ensure that it only runs when clicked*/}
      </ParentDiv>
    </>
  );
}
