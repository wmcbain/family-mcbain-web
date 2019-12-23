import React, { useEffect, useState, useRef } from "react";
import images from "../../images.json";
import styled from "@emotion/styled";
import GalleryItem from "./components/GalleryItem";
import GalleryModal from "./components/GalleryModal";
import { useTheme } from "../../theme/ThemeProvider";
import { SerializedStyles } from "@emotion/css";
import Fuse from "fuse.js";
import { useDebounce } from "use-debounce";
import GalleryHeader from "./components/GalleryHeader";

const { keys: items, meta: metaUntyped, metaLinks: metaLinksUntyped } = images;
const metaLinks = (metaLinksUntyped as unknown) as Record<string, string[]>;
const metaLinkKeys = Object.keys(metaLinks);
const fuseObj = metaLinkKeys.map(key => ({ key }));
const fuse = new Fuse(fuseObj, { keys: ["key"], threshold: 0.3 });
const metaItems = (metaUntyped as unknown) as Record<string, string[]>;
const chunkSize = 32;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 30vh;
  grid-gap: 0.5em;
  padding: 0 1em;
`;

const ModalImage = styled.img`
  height: 80vh;
  width: auto;
  object-fit: contain;
`;

const MetaContainer = styled.div<{ background: string }>`
  background-color: ${({ background }) => background};
  display: flex;
  flex-direction: column;
  padding: 2em 1.6em;
`;

const MetaHeader = styled.h4<{ color: string; font: SerializedStyles }>`
  ${({ font }) => font};
  color: ${({ color }) => color};
  font-size: 1.6em;
  margin-bottom: 1em;
  text-transform: uppercase;
`;

const MetaItems = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`;

const MetaItem = styled.p<{
  background: string;
  color: string;
  font: SerializedStyles;
}>`
  ${({ font }) => font};
  background-color: ${({ background }) => background};
  border-radius: 0.4em;
  color: ${({ color }) => color};
  font-size: 1.8em;
  padding: 0.4em 0.8em;
  margin-right: 0.6em;
  margin-bottom: 0.6em;
`;

const Gallery = () => {
  const modalRef = useRef<HTMLDivElement>();
  const [page, setPage] = useState(1);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedMetaItems, setSelectedMetaItems] = useState<string[] | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue] = useDebounce(searchTerm, 200);
  const [displayedItems, setDisplayedItems] = useState(
    items.slice(0, page * chunkSize)
  );

  const {
    colors: {
      elements: { background, headline, button, buttonText }
    },
    fonts: { button: buttonFont, caption }
  } = useTheme();

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 <
      document.documentElement.offsetHeight
    )
      return;
    setPage(page + 1);
  };

  useEffect(() => {
    if (isSearching) return;
    if (page * chunkSize + 1 >= items.length) return;
    setDisplayedItems(items.slice(0, page * chunkSize));
  }, [page, isSearching]);

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
      setPage(1);
      setIsSearching(false);
      return;
    }
    setPage(0);
    const search = () =>
      new Promise<string[]>(resolve => {
        const hits = fuse.search(searchValue);
        if (hits.length === 0) return;
        let nextItems: string[] = [];
        for (let i = 0; i < hits.length; i++) {
          nextItems = nextItems.concat(metaLinks[hits[i].key]);
        }
        resolve(
          nextItems.filter(
            (value, index, self) => self.indexOf(value) === index
          )
        );
      });
    search().then(nextItems => {
      setDisplayedItems(nextItems);
    });
  }, [searchValue, page, isSearching]);

  return (
    <div>
      <GalleryHeader
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
          />
        ))}
      </Grid>
      {modalIsVisible ? (
        <GalleryModal
          // @ts-ignore
          ref={modalRef}
          onClose={() => {
            setModalIsVisible(false);
            setSelectedItem(null);
          }}
        >
          <ModalImage
            src={`${process.env.PUBLIC_URL}/gallery/${selectedItem}`}
          />
          <MetaContainer background={background}>
            <MetaHeader color={headline} font={caption}>
              Keywords
            </MetaHeader>
            <MetaItems>
              {selectedMetaItems?.map(meta => (
                <MetaItem
                  background={button}
                  color={buttonText}
                  font={buttonFont}
                >
                  {meta}
                </MetaItem>
              ))}
            </MetaItems>
          </MetaContainer>
        </GalleryModal>
      ) : null}
    </div>
  );
};

export default Gallery;
