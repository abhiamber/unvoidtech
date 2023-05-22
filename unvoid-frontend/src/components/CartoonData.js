import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";
import { Dimmer, Card, Image, Loader, Segment } from "semantic-ui-react";
const CartoonData = () => {
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  let [cartoonData, setcartoonData] = useState([]);
  let [err, setErr] = useState("");
  const initialFocusRef = React.useRef();

  let getCartoonsData = async () => {
    let res = await fetch(
      `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`
    );

    try {
      let data = await res.json();
      setcartoonData(data);
      //   console.log(data);
      setError(false);
      setLoading(false);
    } catch (e) {
      console.lof(e.message);
      setError(true);
      setErr(e.message);
    }
  };

  useEffect(() => {
    getCartoonsData();
  }, []);

  if (loading) {
    return (
      <Segment>
        <Dimmer active>
          <Loader content="loading" />
        </Dimmer>

        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  }

  if (error) {
    return (
      <Segment>
        <Dimmer active>
          <Loader content={err} />
        </Dimmer>

        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  }
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(4,1fr)"]}
      justifyContent={"center"}
      p="1.8em"
      gap="20px"
      m="0 3em"
      textAlign={"center"}
    >
      {cartoonData.map((elem) => {
        return (
          <Card style={{ padding: "10px", margin: "auto" }} key={elem.id}>
            <Image src={elem.images && elem.images.md} wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                Name: {elem.biography && elem.biography.fullName.slice(0, 10)}
              </Card.Header>
              <Card.Meta>
                <span className="date">
                  placeOfBirth: {elem.biography && elem.biography.placeOfBirth}
                </span>
              </Card.Meta>
              <Card.Description>
                {elem.work && elem.work.occupation.slice(0, 30)}
              </Card.Description>
            </Card.Content>

            <Card.Content extra>
              <Popover
                initialFocusRef={initialFocusRef}
                placement="bottom"
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <Button>More Details</Button>
                </PopoverTrigger>
                <PopoverContent
                  color="white"
                  bg="blue.800"
                  borderColor="blue.800"
                >
                  <PopoverHeader pt={4} fontWeight="bold" border="0">
                    Cartoon Details
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    {elem.connections && elem.connections.groupAffiliation}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Card.Content>
          </Card>
        );
      })}
    </Box>
  );
};

export default CartoonData;
