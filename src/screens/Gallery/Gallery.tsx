import React, { useEffect, useState, useRef } from "react";
import images from "../../images.json";
import styled from "@emotion/styled";
import GalleryItem from "./components/GalleryItem";
import GalleryModal from "./components/GalleryModal";
import { ReactComponent as McBainCrestIcon } from "../../assets/icons/mcbain-crest.svg";
import { useTheme } from "../../theme/ThemeProvider";
import { SerializedStyles } from "@emotion/css";
import Fuse from "fuse.js";

const { keys: items, meta: metaUntyped, metaLinks: metaLinksUntyped } = images;
const metaLinks = (metaLinksUntyped as unknown) as Record<string, string[]>;
const metaLinkKeys = Object.keys(metaLinks);
const fuseObj = metaLinkKeys.map(key => ({ key }));
const fuse = new Fuse(fuseObj, { keys: ["key"], threshold: 0.3 });
const metaItems = (metaUntyped as unknown) as Record<string, string[]>;
const chunkSize = 32;

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const HeaderBanner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const HeaderCopy = styled.h1`
  padding: 1em 0.4em;
  text-transform: uppercase;
`;

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

const SearchInput = styled.input<{
  color: string;
  background: string;
  font: SerializedStyles;
  underline: string;
}>`
  ${({ font }) => font};
  background: ${({ background }) => background};
  border: none;
  border-bottom: ${({ underline }) => underline};
  color: ${({ color }) => color};
  margin-left: -0.5em;
  margin-top: -1em;
  outline: none;
  padding: 1em 0;
  text-align: center;
  width: 100%;

  &:active {
    outline: none;
  }
`;

const Gallery = () => {
  const modalRef = useRef<HTMLDivElement>();
  const [page, setPage] = useState(1);
  const [modalIsVisible, setModalIsVisble] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedMetaItems, setSelectedMetaItems] = useState<string[] | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedItems, setDisplayedItems] = useState(
    items.slice(0, page * chunkSize)
  );

  const {
    colors: {
      elements: { background, headline, button, buttonText },
      illustration: { secondary }
    },
    fonts: { button: buttonFont, caption, h4 }
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
    if (selectedItem) setModalIsVisble(true);
  }, [selectedItem]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setPage(1);
      setIsSearching(false);
      return;
    }
    if (searchTerm.length < 3) return;
    setPage(0);
    const search = () =>
      new Promise<string[]>(resolve => {
        const hits = fuse.search(searchTerm);
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
  }, [searchTerm, page]);

  return (
    <div>
      <Header>
        <HeaderBanner>
          <HeaderCopy>Family</HeaderCopy>
          <McBainCrestIcon fill="#ffffff" width={120} height={120} />
          <HeaderCopy>McBain</HeaderCopy>
        </HeaderBanner>
        <SearchInput
          background={background}
          color={headline}
          font={h4}
          underline={secondary}
          value={searchTerm}
          onChange={e => {
            if (!isSearching) setIsSearching(true);
            setSearchTerm(e.target.value);
          }}
          placeholder="Type your keyword search here"
        />
      </Header>
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
            setModalIsVisble(false);
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
