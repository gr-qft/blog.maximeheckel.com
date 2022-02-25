import Box from '@theme/components/Box';
import Card from '@theme/components/Card';
import Flex from '@theme/components/Flex';
import { ArrowIcon } from '@theme/components/Icons';
import Range from '@theme/components/Range';
import { motion } from 'framer-motion';
import React from 'react';
import { HighlightedValue } from '../Components';

const ITEMS = [1, 2, 3];
const COLORS = [
  'hsl(var(--palette-blue-50))',
  'hsl(var(--palette-pink-50))',
  'hsl(var(--palette-orange-50))',
];

const SharedLayoutAnimationDetails = () => {
  const [selected, setSelected] = React.useState(1);
  const [duration, setDuration] = React.useState(0.3);

  return (
    <Card
      title="Little shared layout animation debugger"
      css={{
        marginBottom: '2.25rem',
      }}
    >
      <Card.Body>
        <Flex direction="column" gap="5">
          <Flex gap="3">
            {ITEMS.map((item, index) => (
              <Flex
                key={item}
                alignItems="center"
                direction="column"
                justifyContent="space-between"
                css={{ width: '96px', cursor: 'pointer' }}
                onClick={() => setSelected(item)}
                onKeyDown={(event) =>
                  event.key === 'Enter' && setSelected(item)
                }
                tabIndex={0}
              >
                {item === selected ? (
                  <Box
                    as={motion.div}
                    css={{ height: '24px' }}
                    layoutId="arrow"
                    transition={{
                      layout: {
                        duration,
                      },
                    }}
                  >
                    <ArrowIcon
                      style={{
                        color: COLORS[index],
                        transform: 'rotate(90deg)',
                      }}
                    />
                  </Box>
                ) : (
                  <Box css={{ height: '24px' }} />
                )}
                <Box css={{ height: '24px' }}> Item {item}</Box>
              </Flex>
            ))}
          </Flex>
          <Flex justifyContent="center">
            <Box css={{ width: '300px' }}>
              <Range
                id="mass1"
                aria-label="Mass"
                label={
                  <span>
                    Transition duration:{' '}
                    <HighlightedValue>{duration}</HighlightedValue> seconds
                  </span>
                }
                min={0.2}
                step={0.1}
                max={2}
                value={duration}
                onChange={(value) => setDuration(value)}
              />
            </Box>
          </Flex>
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default SharedLayoutAnimationDetails;
