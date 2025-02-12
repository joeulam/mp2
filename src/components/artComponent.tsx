import styled from "styled-components";
import { Art } from "../interface/artData";
const AllCharsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: bisque;
`;

const SingleCharDiv=styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    border: 3px darkred solid;
    font: italic small-caps bold calc(2px + 1vw) Papyrus, fantasy;
    text-align: center;
    color: black;
`;

export default function ArtApiData(props : { data:Art[] } ){
  return (
      <AllCharsDiv >
          {
              props.data.map((char: Art) =>
                  <SingleCharDiv key={char.objectID} >
                      <h1>{char.title}</h1>
                      <img src={char.primaryImage} alt={`${char.title} has no image`} />
                      <p>{char.creditLine}</p>
                  </SingleCharDiv>
              )
          }
      </AllCharsDiv>
  );
}