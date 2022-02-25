import Anchor from '@theme/components/Anchor';
import Box from '@theme/components/Box';
import Blockquote from '@theme/components/Blockquote';
import Button from '@theme/components/Button';
import Card from '@theme/components/Card';
import Checkbox from '@theme/components/Checkbox';
import Grid from '@theme/components/Grid';
import {
  ContactIcon,
  EnterIcon,
  ExternalIcon,
  PortfolioIcon,
  RSSIcon,
  TwitterIcon,
  ArrowIcon,
  PlayIcon,
  PauseIcon,
  RepeatIcon,
  InfoIcon,
  AlertIcon,
  GithubIcon,
  MapIcon,
  StackIcon,
} from '@theme/components/Icons';
import TextInput from '@theme/components/TextInput';
import Logo from '@theme/components/Logo';
import TextArea from '@theme/components/TextArea';
import Flex from '@theme/components/Flex';
import Glow from '@theme/components/Glow';
import Callout from '@theme/components/Callout';
import List from '@theme/components/List';
import CodeBlock from '@theme/components/Code/CodeBlock';
import InlineCode from '@theme/components/InlineCode';
import Pill from '@theme/components/Pill';
import Radio from '@theme/components/Radio';
import Range from '@theme/components/Range';
import Seo from '@theme/components/Seo';
import Switch from '@theme/components/Switch';
import Tooltip from '@theme/components/Tooltip';
import Tweet from '@theme/components/Tweet';
import Text, {
  EM,
  H1,
  H2,
  Heading,
  Strong,
} from '@theme/components/Typography';
import Layout from '@theme/layout';
import { AnimatePresence, LayoutGroup, motion, Reorder } from 'framer-motion';
import { styled, css } from 'lib/stitches.config';
import { getTweets } from 'lib/tweets';
import dynamic from 'next/dynamic';
import React from 'react';
import { TransformedTweet } from 'types/tweet';
import { useTheme } from '@theme/context/ThemeContext';

const Sandpack = dynamic(() => import('@theme/components/Code/Sandpack'));
const Search = dynamic(() => import('@theme/components/Search'), {
  ssr: false,
});

const WavingHandCode = `import { motion } from 'framer-motion';

const WavingHand = () => (
  <motion.div
    style={{
      marginBottom: '-20px',
      marginRight: '-45px',
      paddingBottom: '20px',
      paddingRight: '45px',
      display: 'inline-block',
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 0.2,
      delay: 0.5,
      ease: 'easeInOut',
      type: 'tween',
    }}
  >
  👋
  </motion.div>
);

const Hi = () => (
    <h1>
        Hi <WavingHand /> !
    </h1>
);

export default Hi;
`;

const AppCode = `import WavingHand from './WavingHand';

export default function App() {
  return <WavingHand/>;
}
`;

const TestFramerLayoutSize = () => {
  const [c, setC] = React.useState(true);

  // layout false => no transition / new size + new position
  // layout true => size + position
  // layout position => just the position / new size instantly
  // layout size => just the size / moves to position instantly

  return (
    <Grid columns={3} gap={5}>
      <Card depth={3} title="layout={true}" css={{}}>
        <Card.Body
          dotMatrix
          css={{
            height: '300px',
            display: 'grid',
          }}
        >
          {/* <motion.div layout> */}
          <Box
            as={motion.div}
            layout
            transition={{
              layout: {
                duration: 1.5,
              },
            }}
            css={{
              justifySelf: c ? 'center' : 'flex-start', // c ? 20 : 10,
              alignSelf: c ? 'center' : 'flex-start',
              backgroundColor: 'hsla(var(--palette-gray-50), 50%)',
              width: c ? '20px' : '100%',
              height: c ? '20px' : '100%',

              // width: c ? '100%' : '100px',
              // height: c ? '100%' : '100px',
            }}
            style={{
              borderRadius: 20, // necessary to fix distortion /!\ does not work with CSS variable
            }}
          />
          {/* </motion.div> */}
        </Card.Body>
      </Card>
      <Card depth={3} title="layout='position'">
        <Card.Body dotMatrix css={{ height: '300px', display: 'grid' }}>
          {/* <motion.div layout> */}
          <Box
            as={motion.div}
            layout="position"
            transition={{
              layout: {
                duration: 1.5,
              },
            }}
            css={{
              justifySelf: c ? 'center' : 'flex-start', // c ? 20 : 10,
              alignSelf: c ? 'center' : 'flex-start',
              backgroundColor: 'hsla(var(--palette-gray-50), 50%)',
              width: c ? '20px' : '100%',
              height: c ? '20px' : '100%',
              borderRadius: 'var(--border-radius-2)',
              // width: c ? '100%' : '100px',
              // height: c ? '100%' : '100px',
            }}
            style={{
              borderRadius: 20,
            }}
          />
          {/* </motion.div> */}
        </Card.Body>
      </Card>
      <Card depth={3} title="layout='size'">
        <Card.Body dotMatrix css={{ height: '300px', display: 'grid' }}>
          {/* <motion.div layout> */}
          <Box
            as={motion.div}
            layout="size"
            transition={{
              layout: {
                duration: 1.5,
              },
            }}
            css={{
              justifySelf: c ? 'center' : 'flex-start', // c ? 20 : 10,
              alignSelf: c ? 'center' : 'flex-start',
              backgroundColor: 'hsla(var(--palette-gray-50), 50%)',
              width: c ? '20px' : '100%',
              height: c ? '20px' : '100%',
              borderRadius: 'var(--border-radius-2)',
              // width: c ? '100%' : '100px',
              // height: c ? '100%' : '100px',
            }}
            style={{
              borderRadius: 20,
            }}
          />
          {/* </motion.div> */}
        </Card.Body>
      </Card>
      <Flex justifyContent="center" css={{ gridColumn: 'span 3' }}>
        <Switch
          aria-label="Expand card"
          id="expand-card"
          label="Expand card"
          onChange={() => setC((prev) => !prev)}
        />
      </Flex>
    </Grid>
  );
};

const TestFramerLayoutGroup = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card as={motion.div} layout onClick={() => setIsOpen((prev) => !prev)}>
      <Card.Body>
        <motion.h2 layout>Title</motion.h2>
        {isOpen ? <span>Some text</span> : null}
      </Card.Body>
    </Card>
  );
};

const ITEMS = [
  {
    text: 'Finish blog post ✍️',
    checked: false,
    id: 1,
  },
  {
    text: 'Build new Three.js experiences ✨',
    checked: false,
    id: 2,
  },
  {
    text: 'Add new components to Design System 🌈',
    checked: false,
    id: 3,
  },
  {
    text: 'Make some coffee ☕️',
    checked: false,
    id: 4,
  },
  {
    text: 'Drink water 💧',
    checked: false,
    id: 5,
  },
  {
    text: 'Go to the gym 🏃‍♂️',
    checked: false,
    id: 6,
  },
];

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TestFramerReorder = () => {
  const [items, setItems] = React.useState(ITEMS);

  const completeItem = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          checked: !item.checked,
        };

        return updatedItem;
      }

      return item;
    });

    setItems(updatedItems);
  };

  return (
    <Box>
      <Flex direction="column" gap="4" alignItems="start">
        <Flex gap={4}>
          <Button
            variant="secondary"
            disabled={items.length >= 5}
            onClick={() =>
              setItems((prev) => {
                return [
                  ...prev,
                  {
                    text: 'Prepare for space travel 🧑‍🚀',
                    id: Math.random(),
                    checked: false,
                  },
                ];
              })
            }
          >
            Add item
          </Button>
          <Tooltip id="tooltip-reset-list" tooltipText="Reset task list">
            <Button
              variant="icon"
              onClick={() => setItems(ITEMS)}
              icon={<RepeatIcon />}
            />
          </Tooltip>
        </Flex>
        <LayoutGroup>
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            className={css({
              display: 'flex',
              flexDirection: 'column',
              margin: '0',
              padding: '0',
              width: '100%',
            })()}
          >
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  key={item.id}
                  gap="6"
                >
                  <Card
                    as={Reorder.Item}
                    css={{
                      listStyle: 'none',
                      marginBottom: 'var(--space-3)',
                      cursor: 'grab',
                      height: '100%',
                      flexGrow: 1,
                    }}
                    style={{
                      position: 'relative', // /!\ this is needed to avoid weird overlap
                      borderRadius: '12px',
                      width: item.checked ? '70%' : '100%', // layout resize animation
                    }}
                    depth={1}
                    value={item}
                  >
                    <Card.Body
                      as={motion.div}
                      layout="position"
                      css={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-4)',
                      }}
                    >
                      <motion.div layout>
                        <Checkbox
                          id={`checkbox-${item.id}`}
                          aria-label="Mark as done"
                          checked={item.checked}
                          onChange={() => completeItem(item.id)}
                        />
                      </motion.div>
                      <Text
                        size="2"
                        css={{
                          marginBottom: 0,
                        }}
                      >
                        {item.text}
                      </Text>
                    </Card.Body>
                  </Card>
                  <AnimatePresence initial={false}>
                    {item.checked ? (
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.2 } }}
                        exit={{ opacity: 0 }}
                      >
                        <Button
                          variant="icon"
                          icon={<XIcon />}
                          onClick={() =>
                            setItems((prev) =>
                              prev.filter((task) => task.id !== item.id)
                            )
                          }
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Flex>
              ))}
            </AnimatePresence>
          </Reorder.Group>

          <motion.div layout>
            <HR />
            <Text>Check items off the list when you're done!</Text>
          </motion.div>
        </LayoutGroup>
      </Flex>
    </Box>
  );
};

// const Foo = () => (
//   <Box
//     css={{
//       // maxWidth: '488px',
//       display: 'block',
//     }}
//   >
//     <Reorder.Group
//       axis="x"
//       values={items2}
//       onReorder={setItems2}
//       className={css({
//         margin: '0',
//         padding: '0',
//         position: 'relative',
//         display: 'flex',
//         width: '100%',
//         gap: 'var(--space-3)',
//         flexGrow: 1,
//       })()}
//     >
//       <AnimatePresence initial={false}>
//         {items2.map((item) => (
//           <Card
//             as={Reorder.Item}
//             key={item}
//             value={item}
//             depth={2}
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             css={{
//               display: 'flex',
//               width: '100%',
//               background: 'var(--maximeheckel-colors-emphasis)',
//               backdropFilter: 'blur(12px)',
//             }}
//           >
//             {/* layout="position" is key here to make things not squished  */}
//             <Card.Body
//               as={motion.div}
//               css={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 width: '100%',
//               }}
//               layout="position" // /!\ why position here? technically the size of this element changes
//               // but we don't care about its size transition: it's not visible to us, we want it to
//               // instantly grow to its target so we do not see it's content being "squished" first
//             >
//               <Text
//                 family="numeric"
//                 css={{
//                   marginBottom: 0,
//                 }}
//               >
//                 {item}
//               </Text>
//               <motion.div layout>
//                 <Button
//                   variant="icon"
//                   icon={<AlertIcon />}
//                   onClick={() =>
//                     setItems2((prev) =>
//                       prev.filter((thingy) => thingy !== item)
//                     )
//                   }
//                 />
//               </motion.div>
//             </Card.Body>
//           </Card>
//         ))}
//       </AnimatePresence>
//     </Reorder.Group>
//   </Box>
// );

const Wrapper = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  background: '#1A1D23',
  borderRadius: '8px',
  width: 'fit-content',
  border: '1px solid #2B303B',
  gap: '32px',
});

const Tab = styled('li', {
  position: 'relative',
  listStyle: 'none',
  cursor: 'pointer',
  width: '50px',
  height: '30px',
  outline: 'none',

  span: {
    position: 'absolute',
    left: '2px',
    right: 0,
    top: '3px',
    bottom: 0,
    zIndex: 1,
    userSelect: 'none',
    fontSize: '0.875rem',
  },
});

const TabsSharedLayoutAnimation = () => {
  const [focused, setFocused] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState('Item 1');
  const tabs = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <Wrapper onMouseLeave={() => setFocused(null)}>
      {tabs.map((item) => (
        <Tab
          key={item}
          onClick={() => setSelected(item)}
          onKeyDown={(event: { key: string }) =>
            event.key === 'Enter' ? setSelected(item) : null
          }
          onFocus={() => setFocused(item)}
          onMouseEnter={() => setFocused(item)}
          tabIndex={0}
        >
          <span>{item}</span>
          {focused === item ? (
            <motion.div
              transition={{
                layout: {
                  duration: 0.2,
                  ease: 'easeOut',
                },
              }}
              style={{
                position: 'absolute',
                bottom: '-2px',
                left: '-10px',
                right: 0,
                width: '140%',
                height: '110%',
                background: 'var(--maximeheckel-colors-foreground)',
                borderRadius: '8px',
                zIndex: 0,
              }}
              layoutId="highlight"
            />
          ) : null}
          {selected === item ? (
            <motion.div
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '0px',
                right: 0,
                height: '4px',
                background: '#5686F5',
                borderRadius: '8px',
                zIndex: 0,
              }}
              layoutId="underline"
            />
          ) : null}
        </Tab>
      ))}
    </Wrapper>
  );
};

/**
 * TODO:
 * - Decouple Search in 2 components => Overlay + Dialog and Command Center
 * - Rebuild/Rename Search component
 * - Define specific token for glass card background (foreground is not cutting it)
 * -> hsla(var(--palette-gray-03), 0.2) like code snippet background
 */

const gridItem = css({
  gridColumn: 2,
});

const wrapperGrid = css({
  paddingTop: '64px',
});

const HR = styled('hr', {
  height: '2px',
  width: '100%',
  background: 'hsl(var(--palette-gray-20))',
  border: 'none',
  marginBottom: '16px',
});

const Label = styled('p', {
  marginBottom: '8px',
});

export default function Design(props: {
  tweets: Record<string, TransformedTweet>;
}) {
  const { dark } = useTheme();
  const [showSearch, setShowSearch] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [rangeValue, setRangeValue] = React.useState(250);

  const colorScaleNumbers = React.useMemo(
    () =>
      Array.from(Array(19).keys()).map((items) => {
        const num = (items + 1) * 5;
        if (num === 5) {
          return `0${num}`;
        }

        return num.toString();
      }),
    []
  );

  const palette = ['gray', 'blue', 'red', 'orange', 'green', 'pink', 'indigo'];

  return (
    <Layout footer>
      <Seo title="Design" />
      <Grid columns="medium" gapX={4} gapY={10} className={wrapperGrid()}>
        <Box as="section" className={gridItem()}>
          <H1
            css={{
              marginBottom: '0px',
            }}
          >
            Components / Design System{' '}
          </H1>
          <HR />
          <Flex justifyContent="space-between">
            <Pill variant="warning">Work In Progress</Pill>
            <Pill variant="info">v1.0</Pill>
          </Flex>
        </Box>
        <Box as="section" className={gridItem()}>
          <LayoutGroup id="1" inheritId>
            <TabsSharedLayoutAnimation />
          </LayoutGroup>
          {/* <LayoutGroup id="2">
            <TabsSharedLayoutAnimation />
          </LayoutGroup> */}
          <br />
          <br />
          <TestFramerLayoutSize />
          <br />
          <br />
          {/* Make all distinct layout animations behave smoothly */}
          {/* Also: Namespace reusable shared animations with a given layout id*/}
          {/* https://www.framer.com/docs/layout-group/#namespace-layoutid */}
          <LayoutGroup>
            <br />
            <TestFramerLayoutGroup />
            <TestFramerLayoutGroup />

            <br />
            <br />
            <TestFramerReorder />
          </LayoutGroup>
        </Box>

        <Box as="section" className={gridItem()}>
          <br />
          <br />
          <br />
          <br />
          <H2>Name (WIP)</H2>
          <Text family="numeric" size="4">
            3X-DS (Explore, Expand, Experiment)
          </Text>
          <br />
          <Text size="2" variant="tertiary">
            A set of tools and components to build and write content
          </Text>
        </Box>
        <Box as="section" className={gridItem()} id="logo">
          <H2>Logo</H2>
          <Logo />
        </Box>
        <Box as="section" className={gridItem()} id="Colors">
          <H2>Colors</H2>
          <Grid gap={3}>
            Brand:
            <Tooltip id="brand" tooltipText="--brand">
              <Box
                as="section"
                css={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--maximeheckel-colors-brand)',
                  border: '2px solid var(--maximeheckel-border-color)',
                }}
              />
            </Tooltip>
            Background:
            <Tooltip id="background" tooltipText="--background">
              <Box
                as="section"
                css={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--maximeheckel-colors-background)',
                  border: '2px solid var(--maximeheckel-border-color)',
                }}
              />
            </Tooltip>
            Foreground:
            <Tooltip id="foreground" tooltipText="--foreground">
              <Box
                as="section"
                css={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--maximeheckel-colors-foreground)',
                  border: '2px solid var(--maximeheckel-border-color)',
                }}
              />
            </Tooltip>
            Typeface:
            <Grid gap={3} css={{ gridTemplateColumns: 'repeat(3, 44px)' }}>
              <Tooltip id="typeface-primary" tooltipText="--typeface-primary">
                <Box
                  as="section"
                  css={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--maximeheckel-colors-typeface-primary)',
                    border: '2px solid var(--maximeheckel-border-color)',
                  }}
                />
              </Tooltip>
              <Tooltip
                id="typeface-secondary"
                tooltipText="--typeface-secondary"
              >
                <Box
                  as="section"
                  css={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--maximeheckel-colors-typeface-secondary)',
                    border: '2px solid var(--maximeheckel-border-color)',
                  }}
                />
              </Tooltip>
              <Tooltip id="typeface-tertiary" tooltipText="--typeface-teriary">
                <Box
                  as="section"
                  css={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--maximeheckel-colors-typeface-tertiary)',
                    border: '2px solid var(--maximeheckel-border-color)',
                  }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="Palette">
          <H2>Palette</H2>
          <Grid
            gap={6}
            css={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
            }}
          >
            {palette.map((paletteItem) => (
              <Grid
                key={paletteItem}
                css={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(2rem, 1fr))',
                  marginRight: '$3',
                }}
              >
                {colorScaleNumbers.map((shade) => (
                  <Tooltip
                    id={`${paletteItem}-${shade}`}
                    key={`${paletteItem}-${shade}`}
                    tooltipText={`--palette-${paletteItem}-${shade}`}
                  >
                    <Box
                      as="section"
                      css={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: `hsl(var(--palette-${paletteItem}-${shade}))`,
                        border: '2px solid var(--maximeheckel-border-color)',
                      }}
                    />
                  </Tooltip>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="typography">
          <H2>Typography</H2>
          <Label>Display</Label>
          <Text size="4">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Numeric (experimenting)</Label>
          <Text size="3" family="numeric">
            1 AU = 1,495978707x10<sup>11</sup> m
          </Text>
          <Label>Mono</Label>
          <Text size="3" family="mono">
            console.log(foobar)
          </Text>
          <br />
          <br />
          <Label>H1</Label>
          <Heading as="h1" size="4">
            Almost before we knew it, we had left the ground.
          </Heading>
          <Label>H2</Label>
          <Heading as="h2" size="3">
            Almost before we knew it, we had left the ground.
          </Heading>
          <Label>H3</Label>
          <Heading as="h3" size="2">
            Almost before we knew it, we had left the ground.
          </Heading>
          <Label>H4</Label>
          <Heading as="h4" size="1">
            Almost before we knew it, we had left the ground.
          </Heading>
          <br />
          <Label>Text size 7</Label>
          <Text as="p" size="7">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text size 6</Label>
          <Text as="p" size="6">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text size 5</Label>
          <Text as="p" size="5">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text size 4</Label>
          <Text as="p" size="4">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text size 3</Label>
          <Text as="p" size="3">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text size 2</Label>
          <Text as="p" size="2">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text size 1</Label>
          <Text as="p" size="1">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text gradient</Label>
          <Text
            as="p"
            size="3"
            gradient
            css={{
              backgroundImage: `linear-gradient(
              91.83deg,
              hsl(var(--palette-pink-50)) -20.26%,
              hsl(var(--palette-blue-20)) 20.55%,
              hsl(var(--palette-indigo-30)) 60.81%
            )`,
            }}
          >
            Almost before we knew it, we had left the ground.
          </Text>
          <br />
          <Label>Strong</Label>
          <Strong>Almost before we knew it, we had left the ground.</Strong>
          <Label>EM</Label>
          <EM>Almost before we knew it, we had left the ground.</EM>
          <Label>BigNum (WIP)</Label>
          <Text family="numeric" size="7" weight="4">
            1 AU = 1,495978707x10<sup>11</sup> m
          </Text>
          <Label>BigNum Outline (Experimenting)</Label>
          <Text
            family="numeric"
            size="7"
            weight="4"
            css={{
              color: 'transparent',
              WebkitTextStrokeColor: 'var(--maximeheckel-colors-brand)',
              WebkitTextStrokeWidth: '1px',
            }}
          >
            1 AU = 1,495978707x10<sup>11</sup> m
          </Text>
          <br />
          <Text
            family="numeric"
            size="7"
            weight="4"
            css={{
              color: 'transparent',
              WebkitTextStrokeColor: 'var(--maximeheckel-colors-danger)',
              WebkitTextStrokeWidth: '1px',
            }}
          >
            1 AU = 1,495978707x10<sup>11</sup> m
          </Text>
          <br />
          <br />
        </Box>
        <Box as="section" className={gridItem()} id="icons">
          <H2>Icons</H2>
          <IconSection />
        </Box>
        <Box as="section" className={gridItem()}>
          <H2>Shadows</H2>
          <Grid
            columns={2}
            gap={4}
            css={{
              padding: 'var(--space-5) var(--space-3)',
            }}
          >
            <Card depth={0}>
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 0
                </Text>
              </Card.Body>
            </Card>
            <Card depth={1}>
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 1
                </Text>
              </Card.Body>
            </Card>
            <Card depth={2}>
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 2
                </Text>
              </Card.Body>
            </Card>
            <Card depth={3}>
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 3
                </Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid
            columns={2}
            gap={4}
            css={{
              background: 'var(--maximeheckel-colors-emphasis)',
              padding: 'var(--space-5) var(--space-3)',
            }}
          >
            <Card
              css={{
                '--shadow-color': dark ? '222deg 39% 5%' : '222deg 39% 80%',
              }}
              depth={0}
            >
              <Card.Body>
                <Text size="2" variant="secondary">
                  Custom Shadow 0
                </Text>
              </Card.Body>
            </Card>
            <Card
              css={{
                '--shadow-color': dark ? '222deg 39% 5%' : '222deg 39% 80%',
              }}
              depth={1}
            >
              <Card.Body>
                <Text size="2" variant="secondary">
                  Custom Shadow 1
                </Text>
              </Card.Body>
            </Card>
            <Card
              css={{
                '--shadow-color': dark ? '222deg 39% 5%' : '222deg 39% 80%',
              }}
              depth={2}
            >
              <Card.Body>
                <Text size="2" variant="secondary">
                  Custom Shadow 2
                </Text>
              </Card.Body>
            </Card>
            <Card
              css={{
                '--shadow-color': dark ? '222deg 39% 5%' : '222deg 39% 80%',
              }}
              depth={3}
            >
              <Card.Body>
                <Text size="2" variant="secondary">
                  Custom Shadow 3
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="lists">
          <H2>Lists</H2>
          <Grid columns={2}>
            <List variant="unordered">
              <List.Item>First</List.Item>
              <List.Item>Second</List.Item>
              <List.Item>Third</List.Item>
            </List>
            <List variant="ordered">
              <List.Item>First</List.Item>
              <List.Item>Second</List.Item>
              <List.Item>Third</List.Item>
            </List>
            <List variant="unordered">
              <List.Item>
                <List variant="ordered">
                  <List.Item>First</List.Item>
                  <List.Item>Second</List.Item>
                  <List.Item>Third</List.Item>
                </List>
              </List.Item>
            </List>
            <List variant="unordered">
              <List.Item>
                <List variant="unordered">
                  <List.Item>First</List.Item>
                  <List.Item>Second</List.Item>
                  <List.Item>Third</List.Item>
                </List>
              </List.Item>
            </List>
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="button">
          <H2>Buttons</H2>
          <Grid gap={5}>
            <Glow>
              <Button variant="primary">Button</Button>
            </Glow>
            <Button variant="primary">Button</Button>
            <Button variant="primary" endIcon={<ExternalIcon />}>
              Portfolio
            </Button>
            <Button variant="primary" startIcon={<TwitterIcon />}>
              Follow me!
            </Button>
            <Button variant="primary" disabled>
              Button
            </Button>
            <Button variant="secondary">Button</Button>
            <Button variant="secondary" endIcon={<ExternalIcon />}>
              Portfolio
            </Button>
            <Button variant="secondary" startIcon={<TwitterIcon />}>
              Follow me!
            </Button>
            <Button variant="secondary" disabled>
              Button
            </Button>
            <Button
              aria-label="Follow me on Twitter!"
              variant="icon"
              icon={<TwitterIcon />}
            />
            <Button
              aria-label="Follow me on Twitter!"
              disabled
              variant="icon"
              icon={<TwitterIcon />}
            />
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="anchor">
          <H2>Anchor</H2>
          <Grid gap={1}>
            <h3>
              <Anchor href="https://twitter.com/MaximeHeckel" favicon>
                @MaximeHeckel
              </Anchor>
            </h3>
            <p>
              <Anchor href="https://twitter.com/MaximeHeckel" discreet favicon>
                @MaximeHeckel
              </Anchor>
            </p>
            <h3>
              <Anchor href="https://github.com/MaximeHeckel" favicon>
                Github
              </Anchor>
            </h3>
            <p>
              <Anchor href="https://github.com/MaximeHeckel" discreet favicon>
                Github
              </Anchor>
            </p>
            <h3>
              <Anchor href="/" arrow="left">
                Back
              </Anchor>
            </h3>
            <h3>
              <Anchor href="https://twitter.com/MaximeHeckel" arrow="right">
                Twitter
              </Anchor>
            </h3>
            <p>
              <Anchor
                href="https://github.com/MaximeHeckel/blog.maximeheckel.com"
                arrow="right"
                discreet
              >
                Check out this repo
              </Anchor>
            </p>
            <h3>
              <Anchor href="/design" underline>
                Design System
              </Anchor>
            </h3>
            <p>
              <Anchor discreet href="/design" underline>
                Design System
              </Anchor>{' '}
            </p>
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="form-components">
          <H2>Form Components</H2>
          <Flex gap={2}>
            <TextInput
              aria-label="Email"
              id="email-input"
              type="email"
              placeholder="hello@maximeheckel.com"
              onChange={(event) => setEmail(event.currentTarget.value)}
              value={email}
            />
            <Button variant="primary">Subscribe</Button>
          </Flex>
          <br />
          <Grid
            gap={5}
            css={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            <TextInput
              label="Name"
              aria-label="Name"
              id="name-input"
              placeholder="Name"
              onChange={() => {}}
            />

            <TextInput
              label="Name"
              aria-label="Name"
              id="name-input-disabled"
              placeholder="Name"
              disabled
              onChange={() => {}}
              value="Maxime Heckel"
            />

            <TextInput
              aria-label="Email"
              id="email-input"
              type="email"
              placeholder="hello@maximeheckel.com"
              onChange={(event) => setEmail(event.currentTarget.value)}
              value={email}
              autoComplete="off"
            />

            <TextInput
              aria-label="Email"
              id="email-input-disabled"
              type="email"
              disabled
              placeholder="hello@maximeheckel.com"
              onChange={() => {}}
              value="hello@maximeheckel.com"
            />

            <TextInput
              aria-label="Password"
              id="password-input"
              type="password"
              placeholder="Password"
              onChange={() => {}}
            />

            <TextInput
              aria-label="Password"
              id="password-input-disabled"
              type="password"
              disabled
              onChange={() => {}}
              value="supersecretpassword"
            />

            <TextArea
              aria-label="Example Text"
              id="example-text-1"
              label="Example Text"
              onChange={() => {}}
              placeholder="Type some text here"
              resize="none"
            />
            <TextArea
              aria-label="Example Text"
              disabled
              id="example-text-2"
              label="Example Text"
              onChange={() => {}}
              placeholder="Type some text here"
              resize="none"
              value={`Here's to the crazy ones.
The misfits.
The rebels.
The troublemakers.
The round pegs in the square holes.

The ones who see things differently.

They're not fond of rules.
And they have no respect for the status quo.

You can quote them, disagree with them,
glorify or vilify them.
About the only thing you can't do is ignore them.

Because they change things.

They push the human race forward.

While some may see them as the crazy ones,
we see genius.

Because the people who are crazy enough to think
they can change the world, are the ones who do.`}
            />
          </Grid>
          <br />
          <Grid
            gap={3}
            css={{ gridTemplateColumns: 'repeat(2, minmax(2rem, 1fr))' }}
          >
            <Checkbox aria-label="Checkbox" id="checkbox1" label="Checkbox" />
            <Checkbox
              aria-label="Checkbox"
              id="checkbox3"
              label="Checkbox"
              disabled
            />
            <Checkbox
              aria-label="Checkbox"
              id="checkbox2"
              label="Checkbox"
              onChange={() => {}}
              checked
            />
            <Checkbox
              aria-label="Checkbox"
              id="checkbox4"
              label="Checkbox"
              onChange={() => {}}
              checked
              disabled
            />
          </Grid>
          <br />
          <Grid
            gap={3}
            css={{ gridTemplateColumns: 'repeat(2, minmax(2rem, 1fr))' }}
          >
            <Switch id="switch1" aria-label="Switch" label="Switch" />
            <Switch id="switch2" aria-label="Switch" label="Switch" disabled />
            <Switch
              id="switch3"
              aria-label="Switch"
              label="Switch"
              onChange={() => {}}
              toggled
            />
            <Switch
              id="switch4"
              aria-label="Switch"
              label="Switch"
              disabled
              onChange={() => {}}
              toggled
            />
          </Grid>
          <br />
          <Grid
            gap={3}
            css={{ gridTemplateColumns: 'repeat(2, minmax(2rem, 1fr))' }}
          >
            <Radio.Group
              name="options"
              direction="vertical"
              onChange={() => {}}
            >
              <Radio.Item
                id="option-1"
                value="option1"
                aria-label="Option 1"
                label="Option 1"
              />
              <Radio.Item
                id="option-2"
                value="option2"
                aria-label="Option 2"
                label="Option 2"
                checked
              />
            </Radio.Group>
            <Radio.Group
              name="options-disabled"
              direction="vertical"
              onChange={() => {}}
            >
              <Radio.Item
                id="radio-3"
                value="option3"
                aria-label="Option 3"
                label="Option 3"
                disabled
              />
              <Radio.Item
                id="radio-4"
                value="option4"
                aria-label="Option 4"
                label="Option 4"
                disabled
                checked
              />
            </Radio.Group>
            <Radio.Group
              name="options-horizontal"
              direction="horizontal"
              onChange={() => {}}
            >
              <Radio.Item
                id="option-5"
                value="option5"
                aria-label="Option 5"
                label="Option 5"
              />
              <Radio.Item
                id="option-6"
                value="option6"
                aria-label="Option 6"
                label="Option 6"
                checked
              />
            </Radio.Group>
          </Grid>
          <br />
          <Grid
            gap={3}
            css={{ gridTemplateColumns: 'repeat(2, minmax(2rem, 1fr))' }}
          >
            <Range
              id="range-1"
              aria-label="Range"
              label="Range"
              value={rangeValue}
              min={0}
              max={500}
              onChange={(value) => setRangeValue(value)}
            />
            <Range
              id="range-2"
              aria-label="Range"
              label="Range"
              value={250}
              min={0}
              max={500}
              onChange={() => {}}
              disabled
            />
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="cards">
          <H2>Card</H2>
          <Grid gapY={6} css={{ width: '100%' }}>
            <Card>
              <Card.Body>Base Card</Card.Body>
            </Card>
            <Card title="Title for the card">
              <Card.Body>
                Card with <InlineCode>title</InlineCode> prop
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Some Custom Header</Card.Header>
              <Card.Body>Card With Custom Header</Card.Body>
            </Card>
            <Card>
              <Flex
                alignItems="center"
                justifyContent="center"
                css={{
                  padding: 'var(--space-7)',
                }}
              >
                Card With custom Body
              </Flex>
            </Card>
            <Card depth={0}>
              <Card.Body>
                Card <InlineCode>depth={0}</InlineCode>
              </Card.Body>
            </Card>
            <Card depth={1}>
              <Card.Body>
                Card <InlineCode>depth={1}</InlineCode>
              </Card.Body>
            </Card>
            <Card depth={2}>
              <Card.Body>
                Card <InlineCode>depth={2}</InlineCode>
              </Card.Body>
            </Card>
            <Card depth={3}>
              <Card.Body>
                Card <InlineCode>depth={3}</InlineCode>
              </Card.Body>
            </Card>
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="tooltip">
          <H2>Tooltip</H2>
          <Tooltip
            id="exampletooltip"
            tooltipText="@MaximeHeckel"
            tooltipVisuallyHiddenText="Follow Me on Twitter"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              css={{
                height: '50px',
                width: '150px',
                padding: 'var(--space-2)',
              }}
              aria-describedby="exampletooltip"
            >
              <TwitterIcon stroke="var(--maximeheckel-colors-typeface-tertiary)" />{' '}
              Hover Me!
            </Flex>
          </Tooltip>
        </Box>
        <Box as="section" className={gridItem()} id="pill">
          <H2>Pill</H2>
          <Grid gapY={5}>
            <Box>
              <Pill variant="info">Info Pill</Pill>
            </Box>
            <Box>
              <Pill variant="success">Success Pill</Pill>
            </Box>
            <Box>
              <Pill variant="warning">Warning Pill</Pill>
            </Box>
            <Box>
              <Pill variant="danger">Danger Pill</Pill>
            </Box>
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="callout">
          <H2>Callout</H2>
          <Grid gapY={5}>
            <Callout variant="info">Info Callout</Callout>
            <Callout label="Learn more" variant="info">
              Info Callout
            </Callout>
            <Callout variant="danger">Danger Callout</Callout>
            <Callout label="Be careful!" variant="danger">
              Danger Callout
            </Callout>
          </Grid>
        </Box>
        <Box as="section" className={gridItem()} id="blockquote">
          <Blockquote>
            <Text as="p">
              Almost before we knew it, we had left the ground.
            </Text>
          </Blockquote>
        </Box>
        <Box as="section" className={gridItem()} id="inline-code">
          <H2>Inline Code</H2>
          <InlineCode>{"const foo = () => 'bar'"}</InlineCode>
        </Box>
        <Box as="section" className={gridItem()} id="code-block">
          <H2>Code Block</H2>
          <Label>Basic</Label>
          <CodeBlock
            metastring=""
            language="javascript"
            codeString={`console.log("hello world")

/**
 * Some comments
 */
function sayHi(name) {
    var message = \`hi \${name}\`
    return message;
}`}
          />
          <Label>With title and highlighting</Label>
          <CodeBlock
            metastring="{6-8} title=Code snippet title"
            language="javascript"
            codeString={`console.log("hello world")

/**
 * Some comments
 */
function sayHi(name) {
    var message = \`hi \${name}\`
    return message;
}`}
          />
          <Label>Sandpack Code Block</Label>
          <Sandpack
            template="react"
            dependencies={{
              'framer-motion': '5.2.1',
            }}
            files={{
              '/App.js': {
                code: AppCode,
              },
              '/WavingHand.js': {
                code: WavingHandCode,
              },
              '/styles.css': {
                code: `
                  body: {
                    color: var(--maximeheckel-colors-brand);
                  }
                `,
              },
            }}
          />
        </Box>
        <Box as="section" className={gridItem()} id="command-center">
          <H2>Command Center / Search </H2>
          <Button variant="primary" onClick={() => setShowSearch(true)}>
            Show Command Center
          </Button>
          <AnimatePresence>
            {showSearch ? (
              <Search onClose={() => setShowSearch(false)} />
            ) : null}
          </AnimatePresence>
        </Box>
        <Box as="section" className={gridItem()} id="tweet">
          <H2>Tweet</H2>
          <Tweet tweet={props.tweets['1386013361809281024']} />
        </Box>
      </Grid>
    </Layout>
  );
}

const IconSection = () => (
  <Flex direction="column" gap={8} alignItems="stretch" css={{ width: '100%' }}>
    <Grid flow="column" gap={4}>
      <TwitterIcon variant="info" size={5} />
      <TwitterIcon variant="danger" size={5} />
      <TwitterIcon variant="success" size={5} />
      <TwitterIcon variant="warning" size={5} />
      <TwitterIcon variant="primary" size={5} />
      <TwitterIcon variant="secondary" size={5} />
      <TwitterIcon variant="tertiary" size={5} />
    </Grid>
    <Box
      css={{
        color: 'hsl(var(--palette-pink-50))',
        svg: {
          strokeWidth: '1',
          fill: 'hsla(var(--palette-pink-50), 50%) !important',
        },
      }}
    >
      <TwitterIcon />
    </Box>
    <Grid gapY={4} columns={5} flow="row" align="center">
      <TwitterIcon variant="default" size={7} />
      <TwitterIcon variant="default" size={6} />
      <TwitterIcon variant="default" size={5} />
      <TwitterIcon variant="default" size={4} />
      <TwitterIcon variant="default" size={3} />
      <GithubIcon variant="default" size={7} />
      <GithubIcon variant="default" size={6} />
      <GithubIcon variant="default" size={5} />
      <GithubIcon variant="default" size={4} />
      <GithubIcon variant="default" size={3} />
      <ContactIcon variant="default" size={7} />
      <ContactIcon variant="default" size={6} />
      <ContactIcon variant="default" size={5} />
      <ContactIcon variant="default" size={4} />
      <ContactIcon variant="default" size={3} />
      <MapIcon variant="default" size={7} />
      <MapIcon variant="default" size={6} />
      <MapIcon variant="default" size={5} />
      <MapIcon variant="default" size={4} />
      <MapIcon variant="default" size={3} />
      <ExternalIcon variant="default" size={7} />
      <ExternalIcon variant="default" size={6} />
      <ExternalIcon variant="default" size={5} />
      <ExternalIcon variant="default" size={4} />
      <ExternalIcon variant="default" size={3} />
      <RSSIcon variant="default" size={7} />
      <RSSIcon variant="default" size={6} />
      <RSSIcon variant="default" size={5} />
      <RSSIcon variant="default" size={4} />
      <RSSIcon variant="default" size={3} />
      <EnterIcon variant="default" size={7} />
      <EnterIcon variant="default" size={6} />
      <EnterIcon variant="default" size={5} />
      <EnterIcon variant="default" size={4} />
      <EnterIcon variant="default" size={3} />
      <ArrowIcon variant="default" size={7} />
      <ArrowIcon variant="default" size={6} />
      <ArrowIcon variant="default" size={5} />
      <ArrowIcon variant="default" size={4} />
      <ArrowIcon variant="default" size={3} />
      <PortfolioIcon variant="default" size={7} />
      <PortfolioIcon variant="default" size={6} />
      <PortfolioIcon variant="default" size={5} />
      <PortfolioIcon variant="default" size={4} />
      <PortfolioIcon variant="default" size={3} />
      <PlayIcon variant="default" size={7} />
      <PlayIcon variant="default" size={6} />
      <PlayIcon variant="default" size={5} />
      <PlayIcon variant="default" size={4} />
      <PlayIcon variant="default" size={3} />
      <PauseIcon variant="default" size={7} />
      <PauseIcon variant="default" size={6} />
      <PauseIcon variant="default" size={5} />
      <PauseIcon variant="default" size={4} />
      <PauseIcon variant="default" size={3} />
      <RepeatIcon variant="default" size={7} />
      <RepeatIcon variant="default" size={6} />
      <RepeatIcon variant="default" size={5} />
      <RepeatIcon variant="default" size={4} />
      <RepeatIcon variant="default" size={3} />
      <InfoIcon variant="default" size={7} />
      <InfoIcon variant="default" size={6} />
      <InfoIcon variant="default" size={5} />
      <InfoIcon variant="default" size={4} />
      <InfoIcon variant="default" size={3} />
      <AlertIcon variant="default" size={7} />
      <AlertIcon variant="default" size={6} />
      <AlertIcon variant="default" size={5} />
      <AlertIcon variant="default" size={4} />
      <AlertIcon variant="default" size={3} />
      <StackIcon variant="default" size={7} />
      <StackIcon variant="default" size={6} />
      <StackIcon variant="default" size={5} />
      <StackIcon variant="default" size={4} />
      <StackIcon variant="default" size={3} />
    </Grid>
  </Flex>
);

export async function getStaticProps() {
  const tweets = await getTweets(['1386013361809281024']);

  return { props: { tweets } };
}
