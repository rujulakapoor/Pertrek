import React, { Component } from 'react';
import {Button, Carousel, Card} from 'react-bootstrap'
export class PreviewAttractions extends Component {



constructor(props) {
super(props);
}
render() {

  return(
    <Carousel >
<Carousel.Item>

    <Card  >
      <Card.Header as="h5">A Tower</Card.Header>
      <Card.Img variant="top" src= "https://i.insider.com/58d919eaf2d0331b008b4bbd?width=1600&format=jpeg&auto=webp" />

      <Card.Body>
        <Card.Text as="h4">
          Cost: $25
        </Card.Text>
        <Card.Text as="h4">
          Estimated duration: 2 hours
        </Card.Text>
        <Card.Text as="h4">
          1000 reviews
        </Card.Text>
        <Card.Text as="p">
          A nice tower
        </Card.Text>
        <Button variant="secondary">Add</Button>
      </Card.Body>


    </Card>
</Carousel.Item>

<Carousel.Item>

<Card  >
  <Card.Header as="h5">A Wall</Card.Header>
  <Card.Img variant="top" src= "https://i.insider.com/5cc1edcdb14bf471cf44807d?width=1600&format=jpeg&auto=webp" />

  <Card.Body>
    <Card.Text as="h4">
      Cost: $20
    </Card.Text>
    <Card.Text as="h4">
      Estimated duration: 20 hours
    </Card.Text>
    <Card.Text as="h4">
      20000 reviews
    </Card.Text>
    <Card.Text as="p">
      A nice wall
    </Card.Text>
    <Button variant="secondary">Add</Button>
  </Card.Body>


</Card>
</Carousel.Item>

<Carousel.Item>

<Card  >
  <Card.Header as="h5">A Sky</Card.Header>
  <Card.Img variant="top"  src="https://www.usnews.com/dims4/USNEWS/07160a4/2147483647/resize/1200x%3E/quality/85/?url=http%3A%2F%2Fcom-usnews-beam-media.s3.amazonaws.com%2F16%2F7e%2Fdb70a6cd4611b0f82e3bd4bf0cd8%2F1-intro-getty.jpg" />

  <Card.Body>
    <Card.Text as="h4">
      Cost: $25
    </Card.Text>
    <Card.Text as="h4">
      Estimated duration: 2 hours
    </Card.Text>
    <Card.Text as="h4">
      1000 reviews
    </Card.Text>
    <Card.Text as="p">
      A nice tower
    </Card.Text>
    <Button variant="secondary">Add</Button>
  </Card.Body>


</Card>
</Carousel.Item>
    </Carousel>
  )
}

}
export default PreviewAttractions
