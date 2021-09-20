import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Carousel from "react-native-snap-carousel";

interface ItemProps {
  title: string;
}

interface CustomCarouselProps {}
interface RenderItemProps {
  item: ItemProps;
}

const exampleItems = [
  {
    title: "Item 1",
  },
  {
    title: "Item 2",
  },
  {
    title: "Item 3",
  },
  {
    title: "Item 4",
  },
  {
    title: "Item 5",
  },
];

const CarouselScreen: React.FC<CustomCarouselProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState<ItemProps[]>(exampleItems);
  const ref = useRef(null);

  const renderItem = useCallback(({ item }: RenderItemProps) => {
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          padding: 40,
          marginLeft: 25,
          marginRight: 25,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
      </View>
    );
  }, []);

  return (
    <Carousel
      layout={"tinder"}
      ref={ref}
      data={carouselItems}
      sliderWidth={300}
      itemWidth={300}
      renderItem={renderItem}
      onSnapToItem={(index: number) => setActiveIndex(index)}
      horizontal={true}
    />
  );
};

export default CarouselScreen;

const styles = StyleSheet.create({});
