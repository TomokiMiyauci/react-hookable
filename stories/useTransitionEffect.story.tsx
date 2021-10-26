import { StarIcon } from '@chakra-ui/icons'
import { Box, Image, Badge } from '@chakra-ui/react'
import { useRef } from 'preact/hooks'

import { useTransitionEffect } from '@/useTransitionEffect'

import type { Meta } from '@storybook/preact'

const property = {
  imageUrl: 'https://bit.ly/2Z4KKcF',
  imageAlt: 'Rear view of modern home with pool',
  beds: 3,
  baths: 2,
  title: 'Modern home in city center in the heart of historic Los Angeles',
  formattedPrice: '$1,900.00',
  reviewCount: 34,
  rating: 4
}

import Docs from '@doc/useTransitionEffect.mdx'
export const Demo = (): JSX.Element => {
  const target = useRef<HTMLDivElement>(null)
  useTransitionEffect({
    target,
    enterFrom:
      'opacity-0 bg-teal-900 transform scale-0 translate-x-full translate-y-full rotate-180',
    enter: 'transition duration-500 delay-300',
    enterTo: 'transform -translate-y-20 -translate-x-20 -rotate-45 scale-150'
  })

  return (
    <>
      <Box
        ref={target}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        className="transition shadow hover:shadow-xl duration-300"
      >
        <Image loading="lazy" src={property.imageUrl} alt={property.imageAlt} />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {property.title}
          </Box>

          <Box>
            {property.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default {
  title: 'effect/useTransitionEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
