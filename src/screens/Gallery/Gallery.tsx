import React, { useEffect, useState } from "react";
import images from "../../images.json";
import styled from "@emotion/styled";
import GalleryItem from "./components/GalleryItem";
import GalleryModal from "./components/GalleryModal";
import Fuse from "fuse.js";
import { useDebounce } from "use-debounce";
import GalleryHeader from "./components/GalleryHeader";

const { keys: items, meta: metaUntyped, metaLinks: metaLinksUntyped } = images;
const metaLinks = (metaLinksUntyped as unknown) as Record<string, string[]>;
const metaLinkKeys = Object.keys(metaLinks);
const fuseObj = metaLinkKeys.map(key => ({ key }));
const fuse = new Fuse(fuseObj, { keys: ["key"], threshold: 0.3 });
const metaItems = (metaUntyped as unknown) as Record<string, string[]>;
const chunkSize = 12;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 40vh;
  grid-gap: 0.5em;
  padding: 0 1em;

  @media (max-width: 70em) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 50vh;
    padding: 0 2em;
  }

  @media (max-width: 50em) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 30vh;
    grid-gap: 1em;
  }
`;

const shuffle = (items: string[]) => {
  const copied = Array.from(items);
  let index = copied.length;
  while (0 !== index) {
    const randomIndex = Math.floor(Math.random() * index);
    index = index - 1;
    const current = copied[index];
    copied[index] = copied[randomIndex];
    copied[randomIndex] = current;
  }
  return copied;
};

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedMetaItems, setSelectedMetaItems] = useState<string[] | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue] = useDebounce(searchTerm, 200, { leading: true });
  const [itemsList, setItemsList] = useState(shuffle(items));
  const [displayedItems, setDisplayedItems] = useState(
    itemsList.slice(0, page * chunkSize)
  );

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 <
      document.documentElement.offsetHeight
    )
      return;
    setPage(page + 1);
  };

  useEffect(() => {
    let sliceEnd =
      page * chunkSize + 1 >= itemsList.length
        ? itemsList.length
        : page * chunkSize;
    setDisplayedItems(itemsList.slice(0, sliceEnd));
  }, [page, itemsList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (selectedItem) setModalIsVisible(true);
  }, [selectedItem]);

  useEffect(() => {
    if (!isSearching) return;
    if (searchValue.length === 0) {
      setItemsList(items);
      return;
    }
    const hits = fuse.search(searchValue);
    if (hits.length === 0) return;
    let nextItems: string[] = [];
    for (let i = 0; i < hits.length; i++) {
      nextItems = nextItems.concat(metaLinks[hits[i].key]);
    }
    setItemsList(
      nextItems.filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [searchValue, page, isSearching]);

  return (
    <div>
      <GalleryHeader
        isSearching={isSearching}
        setIsSearching={val => {
          setIsSearching(val);
          if (isSearching !== val) {
            setPage(1);
            window.scrollTo(0, 0);
          }
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onShuffle={() => {
          setItemsList(shuffle(itemsList));
          setPage(1);
        }}
      />
      <Grid>
        {displayedItems.map(item => (
          <GalleryItem
            key={`gallery-item-${item}`}
            item={item}
            onClick={item => {
              const meta = metaItems[item];
              setSelectedItem(item);
              setSelectedMetaItems(meta);
            }}
            onMetaClick={item => {
              setSearchTerm(item);
              setPage(1);
              setIsSearching(true);
              window.scrollTo(0, 0);
            }}
          />
        ))}
      </Grid>
      {modalIsVisible ? (
        <GalleryModal
          selectedItem={selectedItem}
          selectedMetaItems={selectedMetaItems}
          onClose={() => {
            setModalIsVisible(false);
            setSelectedItem(null);
          }}
          onMetaClick={item => {
            setSearchTerm(item);
            setPage(1);
            setIsSearching(true);
            window.scrollTo(0, 0);
            setModalIsVisible(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default Gallery;
